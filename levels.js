const {
  LevelFormat,
  AlignmentType,

  convertInchesToTwip,
} = require("docx");

module.exports = {
  DECIMAL_START: [
    {
      level: 0,
      format: LevelFormat.DECIMAL,
      text: "%1",
      alignment: AlignmentType.START,
      style: {
        paragraph: {
          indent: {
            left: convertInchesToTwip(0),
            hanging: convertInchesToTwip(0),
          },
        },
      },
    },
  ],
};
