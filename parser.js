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
const parser = require("./parser/parsers");

function parseParagraph(childs, level = 0) {
  console.log('parseParagraph',level)
  return childs.content.reduce((a, c) => {

    if (parser[c.type]){
      console.log('parser function ', c.type)
      a = [...a, ...parser[c.type]({payload: c.payload, level, meta:c.meta ? c.meta : childs.meta})];
    }
   
    // switch (c.type) {
    //   case "run":
    //     a = [...a, ...parser[c.type]({payload: c.payload, level, meta:c.meta ? c.meta : childs.meta})];
    // }
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
        
      });
      a.push(head);
      if (c.childs) {
        a = [...a, ...parseParagraph(c.childs, 1)];
      }
      return a;
    }, []);
  },
};
