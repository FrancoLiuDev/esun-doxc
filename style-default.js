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
              after: 120,
            },
          },
        },
        heading2: {
          run: {
            size: 26,
            bold: true,
            underline: {
              type: UnderlineType.DOUBLE,
              color: "FF0000",
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
  