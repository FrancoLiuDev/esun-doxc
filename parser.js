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
const { run } = require("./parser/parsers");

function parseParagraph(childs, level = 0) {
  console.log('parseParagraph',level)
  return childs.reduce((a, c) => {
    switch (c.type) {
      case "run":
        a = [...a, ...run(c.payload, level)];
    }
    if (c.childs) {
      a = [...a, ...parseParagraph(c.childs,level+1)];
    }
    return a;
  }, []);
}

module.exports = {
  parse: (body) => {
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
      a.push(head);
      if (c.childs) {
        a = [...a, ...parseParagraph(c.childs, 1)];
      }
     
      return a;
    }, []);
  },
};
