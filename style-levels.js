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
      format: "ideographLegalTraditional",
      text: "%1,",
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
      format: 'chineseCountingThousand',
      text: "%2,",
      alignment: AlignmentType.START,
      style: {
        paragraph: {
          spacing: { line: 250, before: 420, after: 200 },
          indent: {
            hanging: "0.6 cm",
            left: "1.3 cm",
          },
        },
      },
    },
    {
      level: 2,
      format: LevelFormat.DECIMAL,
      text: "%3.",
      alignment: AlignmentType.START,
      style: {
        paragraph: {
          indent: {
            left: convertInchesToTwip(1),
            // right: convertInchesToTwip(0.18),
            hanging: convertInchesToTwip(0.3),
            // firstLine: convertInchesToTwip(0),
          },
        },
      },
    },
    {
      level: 3,
      format: LevelFormat.BULLET,
      text: "•",
      alignment: AlignmentType.START,
      style: {
        paragraph: {
          indent: {
            left: convertInchesToTwip(1.3),
            // right: convertInchesToTwip(0.18),
            hanging: convertInchesToTwip(0.3),
            // firstLine: convertInchesToTwip(0),
          },
        },
      },
    },
    {
      level: 4,
      format: LevelFormat.UPPER_ROMAN,
      text: "%5",
      alignment: AlignmentType.START,
      style: {
        paragraph: {
          indent: {
            left: convertInchesToTwip(1.5),
            // right: convertInchesToTwip(0.18),
            hanging: convertInchesToTwip(0.3),
            // firstLine: convertInchesToTwip(0),
          },
        },
      },
    },
  ],
};
