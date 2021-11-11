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
const {run} = require("./parser/parsers");

function parseParagraph(childs, level = 0) {
  return childs.reduce((a, c) => {
    switch(c.type){
      case 'run':
        a.push(...run(c.payload)) 
    }
    if (a.childs) {
      a = [...a, ...parseParagraph(a.childs)];
    }
    return a;
  }, []);
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
      a.push(head);
      if (c.childs) {
        a = [...a, ...parseParagraph(c.childs)];
      }
      return a;
    }, []);
  },
};
