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

function parseRun({ payload, level, meta = {} }) {
  const collections = [];
  collections.push(
    new Paragraph({
      text: payload,
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
      
      //   heading: HeadingLevel.HEADING_1,
      //   stylesWithLevels: [new StyleLevel("MySpectacularStyle", 0)],
    })
  );
  console.log("parseRun", payload, level);

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
