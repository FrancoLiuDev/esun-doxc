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


function parseParagraph(childs,level = 0){
  return []
}

module.exports = {
  parse: (body) => {
    const collection = [];
    return body.reduce((a, c) => {
      const head = new Paragraph({
        text: c.title,
        numbering: {
          reference: "reference-block",
          level: 0,
        },
        heading: HeadingLevel.HEADING_1,
        stylesWithLevels: [new StyleLevel("MySpectacularStyle", 0)],
      });
      a.push(head)
      if (a.childs){
        a = [...a,...parseParagraph(a.childs)]
      }
      return a
    },[]);
  },
};
