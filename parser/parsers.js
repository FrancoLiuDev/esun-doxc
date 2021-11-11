
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


function parseRun(payload, level){
   console.log('parseRun',payload, level)
   return []
}

module.exports = {
    run: parseRun
  };