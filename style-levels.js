const {
  LevelFormat,
  AlignmentType,

  convertInchesToTwip,
} = require("docx");

let styles = new Array(7).fill({
  format: LevelFormat.DECIMAL,
  text: "%1",
  alignment: AlignmentType.START,
  style: {
    paragraph: {
      indent: {
        left: convertInchesToTwip(0.1),
        // right: convertInchesToTwip(0.18),
        hanging: convertInchesToTwip(0.18),
        // firstLine: convertInchesToTwip(0),
      },
    },
  },
});
styles = styles.map((s, i) => {
  return { ...s, level: i, text: `%${i + 1}` };
});
module.exports = {
  // DECIMAL_START: styles,
  DECIMAL_START: [
    {
      level: 0,
      format: LevelFormat.DECIMAL,
      text: "%1",
      alignment: AlignmentType.START,
      style: {
        paragraph: {
          indent: {
            left: convertInchesToTwip(0.18),
            // right: convertInchesToTwip(0.18),
            hanging: convertInchesToTwip(0.18),
            // firstLine: convertInchesToTwip(0),
          },
        },
      },
    },
    {
      level: 1,
      format: "decimal",
      text: "%2.",
      alignment: AlignmentType.START,
      style: {
        paragraph: {
          indent: {
            left: convertInchesToTwip(0.4),
            // right: convertInchesToTwip(0.18),
            hanging: convertInchesToTwip(0.18),
            // firstLine: convertInchesToTwip(0),
          },
        },
      },
    },
    {
      level: 2,
      format: "decimal",
      text: "%3.",
      alignment: AlignmentType.START,
      style: {
        paragraph: {
          indent: {
            left: convertInchesToTwip(1),
            // right: convertInchesToTwip(0.18),
            hanging: convertInchesToTwip(0.18),
            // firstLine: convertInchesToTwip(0),
          },
        },
      },
    },
  ],
};
