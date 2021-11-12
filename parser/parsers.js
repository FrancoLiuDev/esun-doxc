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

function parseRun(payload, level) {
  const collections = [];
  collections.push(
    new Paragraph({
      text: payload,
      indent: {
        left: "4cm",
        right:100,
        hanging:'2cm',
        firstLine:'3cm'
      },
      spacing: {
        before: 200,
      },
      numbering: {},
      //   heading: HeadingLevel.HEADING_1,
      //   stylesWithLevels: [new StyleLevel("MySpectacularStyle", 0)],
    })
  );
  console.log("parseRun", payload, level);

  return collections;
}

module.exports = {
  run: parseRun,
};
