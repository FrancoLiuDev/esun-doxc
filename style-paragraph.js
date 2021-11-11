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
    STYLE_DEFAULT: [
        {
          id: "MySpectacularStyle",
          name: "My Spectacular Style",
          basedOn: "Heading1",
          next: "Heading1",
          quickFormat: true,
          run: {
            italics: true,
            color: "990000",
          },
        },
      ],
  };
  