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

async function parseRun({ payload, level, meta = {} }) {
  const collections = await payload.reduce(async (a, p) => {
    let content = null;

    content = new Paragraph({
      text: 'fefefe',
      // indent: {
      //   left: "4cm",
      //   right:100,
      //   hanging:'2cm',
      //   firstLine:'3cm'
      // },
      // spacing: {
      //   before: 200,
      // },
      numbering: meta.number
        ? {
            reference: meta.number.name,
            level: level,
          }
        : {},
      style: meta.style,
    });
    a.push(content)
   
    // a = [...a, content];
    return a;
  }, []);
  console.log("collections", collections);
  // collections.push(
  //   new Paragraph({
  //     text: payload,
  //    　
  //     numbering: meta.number
  //       ? {
  //           reference: meta.number.name,
  //           level: level,
  //         }
  //       : {},
  //     style: meta.style,

  //     //   heading: HeadingLevel.HEADING_1,
  //     //   stylesWithLevels: [new StyleLevel("MySpectacularStyle", 0)],
  //   })
  // );
  console.log("parseRun", payload, level);

  return collections;
}

async function parseTable({ payload, level, meta = {} }) {
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
