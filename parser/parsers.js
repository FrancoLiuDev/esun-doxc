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
function parseRun({ payload, level, meta = {} }) {
  // const image = new ImageRun({
  //   data: download(
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/150px-NewTux.svg.png"
  //   ),
  //   transformation: {
  //     width: 200,
  //     height: 200,
  //   },
  //   break: 1,
  // });

  let collections = [];
  // collections.push(
  //   new Paragraph({
  //     children: [image],
  //   })
  // );
  if (typeof payload === "string") {
    collections = [
      new Paragraph({
        text: payload,
        numbering: meta.number
          ? {
              reference: meta.number.name,
              level: level,
            }
          : {},
        style: meta.style,
      }),
    ];
  } else {
    const list = payload.reduce((a, c) => {
      if (typeof c === "string") {
        a.push(
          new Paragraph({
            text: c.content,
            numbering: meta.number
              ? {
                  reference: meta.number.name,
                  level: level,
                }
              : {},
            style: meta.style,
          })
        );
      } else {
        console.log("switch type", c.type);
        switch (c.type) {
          case "image":
            a.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: download(c.content),
                    transformation: {
                      width: 200,
                      height: 200,
                    },
                    break: 1,
                  }),
                ],
              })
            );
            break;
        }
      }
      return a;
    }, []);

    collections = [...collections, ...list];
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
