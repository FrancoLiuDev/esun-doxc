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
  parse: (body) => {
    return body.map((b) => {
      return new Paragraph({
        text: b.title,
        numbering: {
          reference: "reference-block",
          level: 0,
        },
        heading: HeadingLevel.HEADING_1,
        stylesWithLevels: [new StyleLevel("MySpectacularStyle", 0)],
      });
    });
  },
};
