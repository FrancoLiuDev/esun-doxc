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
  
  return childs.content.reduce((a, c) => {
    if (parser[c.type]) {
      a = [
        ...a,
        ...parser[c.type]({
          payload: c.payload,
          level,
          meta: c.meta ? c.meta : childs.meta,
        }),
      ];
    }

    if (c.childs) {
      a = [...a, ...parseParagraph(c.childs, level + 1)];
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
  parse1: async (body) => {
    let collect = [];
    const delayPromise = (data) =>
      new Promise((resolve, reject) => {
        let c = [];
        const head = new Paragraph({
          text: data.title,
          numbering: {
            reference: "reference-block",
            level: 0,
          },
          heading: HeadingLevel.HEADING_1,
        });
        c.push(head);
        if (data.childs) {
          // await parseParagraph(data.childs, 1)
        }
        resolve(data.childs ? data.childs : []);
      }).then((value) => {
        return parseParagraph(value, 1);
      });

    const asyncWay = async (dataArray) => {
      for (const i in dataArray) {
        collect = [...collect, ...(await delayPromise(dataArray[i]))];
      }
    };
    await asyncWay(body);
    return collect;
  },
};
