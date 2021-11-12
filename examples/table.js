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
  WidthType,
  ShadingType,
  convertInchesToTwip,
} = require("docx");
const fs = require("fs");

const headers = [
  { label: "text", key: "row1" },
  { label: "row2", key: "row2" },
  { label: "row3", key: "row3" },
];
const rows = [
  { row1: "grgrg" },
  { row1: "grgrg" },
  { row1: "grgrg" },
  { row1: "grgrg" },
  { row1: "grgrg" },
  { row1: "grgrg" },
];

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
        children: [new Paragraph(r[h.key]?r[h.key]:'N/A')],
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

const doc = new File({
  features: {
    updateFields: true,
  },
  numbering: {
    config: [],
  },

  sections: [
    {
      children: [table],
    },
  ],
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("My Document.docx", buffer);
});
