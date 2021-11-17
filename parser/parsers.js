const {
  File,
  HeadingLevel,
  Packer,
  Paragraph,
  StyleLevel,
  TableOfContents,
  LevelFormat,
  AlignmentType,
  TextRun,
  UnderlineType,
  WidthType,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  ShadingType,
  convertInchesToTwip,
} = require("docx");
const { downloadImage } = require("../utils/download");

// run
function parseRun({ payload, level, meta = {} }) {
  //final result
  let collections = [];

  if (typeof payload === "string") {
    //for Paragraph type string only
    collections = [
      new Paragraph({
        style: meta.style,
        heading: meta.heading ? meta.heading : "",
        alignment: meta.alignment,
        numbering: meta.number
          ? {
              reference: meta.number.name,
              level: meta.number.level ? meta.number.level : level,
            }
          : undefined,
        children: [new TextRun(payload)],
      }),
    ];
  } else {
    const list = payload.reduce((a, c) => {
      if (typeof c === "string") {
        a.push(new TextRun(c));
      } else {
        switch (c.type) {
          case "image":
            const img = downloadImage(c.content);
            const width = c.width ? c.width : img.dimensions.width;
            const rate = width / img.dimensions.width;
            const height = c.content.height
              ? c.content.height
              : img.dimensions.height * rate;
            a.push(
              new ImageRun({
                data: img.buffer,
                transformation: {
                  width: width,
                  height: height,
                },
                break: 1,
              })
            );
            break;
          case "string":
            const str = new TextRun({
              text: c.content,
              size: c.size,
              bold: c.bold,
              font: c.font,
              allCaps: c.allCaps,
              break: c.break,
              color: c.color,
            });
            a.push(str);
            break;
        }
      }
      return a;
    }, []);

    collections = [
      new Paragraph({
        heading: meta.heading ? meta.heading : "",
        style: meta.style,
        alignment: meta.alignment,
        numbering: meta.number
          ? {
              reference: meta.number.name,
              level: meta.number.level ? meta.number.level : level,
            }
          : undefined,
        children: list,
      }),
    ];
  }

  return collections;
}

function parseTable({ payload, level, meta = {}, param }) {
  const headers = payload.headers;
  const rows = payload.rows;

  const tableCellHeaders = headers.map((h) => {
    const cell =
      typeof h.label === "string"
        ? [new Paragraph(h.label)]
        : param.parser.parse(
            {
              content: [...h.label.content],
            },
            { parser: param.parser }
          );

    return new TableCell({
      shading: {
        fill: "eeeeee",
        color: "ffffff",
      },
      children: [...cell],
    });
  });

  const tableRows = rows.map((r) => {
    return new TableRow({
      children: headers.map((h) => {
        let field = r[h.key];

        if (!field || (typeof field === "string" && !field)) {
          field = "N/A";
        }

        const cell =
          typeof field === "string"
            ? [new Paragraph(field)]
            : param.parser.parse(
                {
                  content: [...field.content],
                },
                { parser: param.parser }
              );
        return new TableCell({
          children: [...cell],
        });
      }),
    });
  });
  
  let  width =  {
    size: 100,
    type: WidthType.PERCENTAGE,
  }

  if (meta.width && typeof meta.width !== 'object'){
    width = {
      size: meta.width,
      type: WidthType.DXA,
    }
  }
  if (meta.width && typeof meta.width === 'object'){
    width = meta.width
  }

  const table = new Table({
    width:  width,
    indent: {
      size: meta.indent.size,
      type: WidthType.DXA,
    },
    columnWidths: meta.columnWidths,
    rows: [
      new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: tableCellHeaders,
      }),
      ...tableRows,
    ],
  });
  return [table];
}

function parseTableH({ payload, level, meta = {}, param }) {
  const headers = payload.headers;
  const rows = payload.rows;

  const tableRows = rows.map((r) => {
    return new TableRow({
      children: headers.map((h, i) => {
        let field = r[h.key];
        if (typeof field === "string" && !field) {
          field = "N/A";
        }
        const cell =
          typeof field === "string"
            ? [new Paragraph(field)]
            : param.parser.parse(
                {
                  content: [...field.content],
                },
                { parser: param.parser }
              );
        return new TableCell({
          width: {
            size: h.width,
            type: WidthType.DXA,
          },
          shading: {
            fill: i === 0 ? "efefef" : "ffffff",
            color: "000000",
          },
          children: [...cell],
        });
      }),
    });
  });

  const table = new Table({
    // width: {

    //   size: meta.width,
    //   type: WidthType.DXA,
    // },
    indent: {
      size: meta.indent ? meta.indent.size : null,
      type: WidthType.DXA,
    },
    // width: {
    //   size: 7000,
    //   type: WidthType.DXA,
    // },
    columnWidths: meta.columnWidths,

    // columnWidths: meta.columnWidths,

    rows: [...tableRows],
  });
  return [table];
}
function parseTableFree({ payload, level, meta = {}, param }) {
  const rows = payload.rows;
  const tableRows = rows.map((row) => {
    return new TableRow({
      tableHeader: true,
      children: row.map((item, i) => {
        const cell = param.parser.parse(
          {
            content: [...item.content],
          },
          { parser: param.parser }
        );

        return new TableCell({
          shading: {
            fill: item.cell.fill ? item.cell.fill : "ffffff",
            color: "000000",
          },
          columnSpan: item.cell.columnSpan,
          width: item.cell.width
            ? {
                type: WidthType.DXA,
                size: item.cell.width,
              }
            : undefined,
          children: [...cell],
        });
      }),
    });
  });

  const table = new Table({
    width: {
      size: meta.width,
      type: WidthType.DXA,
    },
    indent: {
      size: meta.indent.size,
      type: WidthType.DXA,
    },
    columnWidths: meta.columnWidths,
    rows: [...tableRows],
  });
  return [table];
}
module.exports = {
  run: parseRun,
  table: parseTable,
  tableh: parseTableH,
  tablefree: parseTableFree,
};
