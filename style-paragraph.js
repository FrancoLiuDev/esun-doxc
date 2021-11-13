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
  convertInchesToTwip,
} = require("docx");

module.exports = {
  STYLE_DEFAULT: [
    {
      id: "sd-descripion-header",
      name: "sd-descripion-header",
      basedOn: "Heading3",
      quickFormat: true,
      paragraph: {
        spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
        indent: { left: 250, hanging: 0 },
      },
    },
    {
      id: "sd-descripion-body",
      name: "sd-descripion-body",
      basedOn: "Normal",
      quickFormat: true,
      paragraph: {
        spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
        indent: { left: convertInchesToTwip(0.4), hanging: 0 },
      },
    },
    {
      id: "MySpectacularStyle",
      name: "My Spectacular Style",
      basedOn: "Heading1",
      next: "Heading1",
      quickFormat: true,
      run: {
        italics: true,
        color: "990000",
      },
    },
    {
      id: "DetailBlockGreen",
      name: "DetailBlockGreen",
      basedOn: "Heading1",
      quickFormat: true,
      run: {
        italics: true,
        color: "00ff00",
      },
      paragraph: {
        spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
        indent: { left: 1440, hanging: 980 },
      },
    },
    {
      id: "DetailBlockRed",
      name: "DetailBlockRed",
      basedOn: "Normal",
      quickFormat: true,
      run: {
        italics: true,
        color: "990000",
      },
      paragraph: {
        spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
      },
    },
    {
      id: "DetailBlock",
      name: "DetailBlock",
      basedOn: "Normal",
      quickFormat: true,
      run: {
        italics: true,
        color: "990000",
      },
      paragraph: {
        spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
      },
    },
  ],
};
