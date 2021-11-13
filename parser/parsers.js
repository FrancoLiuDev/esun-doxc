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
         
        numbering: meta.number
          ? {
              reference: meta.number.name,
              level: level,
            }
          : {},
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
            const width = c.width ? c.width : img.dimensions.width
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
        }
      }
      return a;
    }, []);

    collections = [
      new Paragraph({
        style: meta.style,
        numbering: meta.number
          ? {
              reference: meta.number.name,
              level: level,
            }
          : {},
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
    columnWidths: [3505, 5505],
    rows: [
      new TableRow({
        children: tableCellHeaders,
      }),
      ...tableRows,
    ],
  });
  return [table];
}

module.exports = {
  run: parseRun,
  table: parseTable,
};
