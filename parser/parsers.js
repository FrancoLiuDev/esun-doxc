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
const { download } = require("../images/image");

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
        numbering: meta.number
          ? {
              reference: meta.number.name,
              level: level,
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
            const img = download(c.content);
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
              bold: c.bold,
              font: c.font,
              allCaps: c.allCaps,
              break: c.break,
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
        numbering: meta.number
          ? {
              reference: meta.number.name,
              level: level,
            }
          : undefined,
        children: list,
      }),
    ];
  }

  return collections;
}

function parseTable({ payload, level, meta = {} }) {
  const headers = payload.headers;
  const rows = payload.rows;

  const tableCellHeaders = headers.map((h) => {
    return new TableCell({
      shading: {
        fill: "eeeeee",
        type: ShadingType.REVERSE_DIAGONAL_STRIPE,
        color: "000000",
      },
      children: [new Paragraph(h.label)],
    });
  });

  const tableRows = rows.map((r) => {
    return new TableRow({
      children: headers.map((h) => {
        return new TableCell({
          children: [new Paragraph(r[h.key] ? r[h.key] : "N/A")],
        });
      }),
    });
  });

  const table = new Table({
    rows: [
      new TableRow({
        children: tableCellHeaders,
      }),
      ...tableRows,
    ],
  });
  return [table];
}

function parseTableH({ payload, level, meta = {} }) {
  const headers = payload.headers;
  const rows = payload.rows;

  const tableRows = rows.map((r) => {
    return new TableRow({
      children: headers.map((h, i) => {
        return new TableCell({
          // width: { size: 20, type: WidthType.PERCENTAGE },
          shading: {
            fill: i === 0 ? "efefef" : "ffffff",
            color: "000000",
          },
          children: [new Paragraph(r[h.key] ? r[h.key] : "N/A")],
        });
      }),
    });
  });

  const table = new Table({
    width: {
      size: 9000,
      type: WidthType.DXA,
    },
    
    columnWidths: [
      3000,
      3000,
      3000,
    ],

    rows: [...tableRows],
  });
  return [table];
}

module.exports = {
  run: parseRun,
  table: parseTable,
  tableh: parseTableH,
};
