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


function parseParagraph(childs, level = 0, param = {}) {
   
  return childs.content.reduce((a, c) => {
    
   
    if (c.type === 'image'){
      console.log('meta',JSON.stringify(c) )
    }
    if (parser[c.type]) {
      a = [
        ...a,
        ...parser[c.type]({
          payload: c.payload,
          level,
          meta: c.meta ? { ...childs.meta, ...c.meta } : childs.meta,
          param
          // meta: c.meta ? c.meta: childs.meta,
        }),
      ];
    }

    if (c.childs) {
      a = [...a, ...parseParagraph(c.childs, level + 1,param) ];
    }
    return a;
  }, []);
}

function parseParagraph1(childs, level = 0) {
  return new Promise((resolve, reject) => {
    resolve([]);
  });
}

module.exports = {
  parse1: (body) => {
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
  parse: (body,{parser}) => {
    console.log("body", body,parser);
    return [...parseParagraph(body,0,{parser:parser})];

    // return body.reduce((a, c) => {
    //   const head = new Paragraph({
    //     text: c.title,
    //     numbering: {
    //       reference: "reference-block",
    //       level: 0,
    //     },
    //     heading: HeadingLevel.HEADING_1,
    //   });
    //   a.push(head);
    //   if (c.childs) {
    //     a = [...a, ...parseParagraph(c.childs, 1)];
    //   }
    //   return a;
    // }, []);
  },
};
