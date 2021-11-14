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
    STYLE_DEFAULT:  {
        heading1: {
          run: {
            size: 28,
            bold: true,
            italics: true,
            color: "000000",
          },
          paragraph: {
            spacing: {
              after: 10,
            },
          },
        },
        heading2: {
          run: {
            size: 24,
            bold: true,
            color: "000000",  
          },
          paragraph: {
            spacing: {
              before: 50,
              after: 80,
            },
           
            indent: {
              left: 100,
              hanging: 100,
              firstLine: 0,
            },
          },
        },
        heading3: {
          run: {
            size: 26,
            bold: true,
            underline: {
              type: UnderlineType.DOUBLE,
              color: "000000",
            },
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120,
            },
          },
        },
        listParagraph: {
          run: {
            color: "#FF0000",
          },
        },
      },
  };
  