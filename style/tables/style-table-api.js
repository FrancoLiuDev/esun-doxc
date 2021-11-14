var root = require("app-root-path");

const { AlignmentType, convertInchesToTwip } = require("docx");

const {
  META_CONTACT_ONEPAGE,
  META_CONTACT_ONE_CHAPTER,
  META_CHAPTER_INDEX,
  META_CHAPTER_BODY,
  META_CHAPTER_BODY_IMG,
  META_CHAPTER_TABLE,
} = require(root + "/style/sd-content-meta");

module.exports = {
  STYLE_TTABLE_API: () => {
    return {
      type: "tablefree",
      meta: {
        ...META_CHAPTER_TABLE(),
        ...{
          width: 9000,
          columnWidths: [1500, 3000, 4000],
        },
        style: {
          background: "ffffff",
          color: "000000",
        },
      },
      payload: {
        rows: [
          [
            {
              cell: {
                columnSpan: 3,
                fill: "bfbfbf",
              },
              content: [
                {
                  meta: {
                    alignment: AlignmentType.CENTER,
                  },
                  type: "run",
                  payload: [
                    {
                      type: "string",
                      content: "MarshallableList<Currency>物件",
                      size: '12 pt',
                      bold: true,
                      color: "000000",
                      font: "Bitstream Vera Sans",
                    },
                  ],
                },
              ],
            },
          ],
          [
            {
              cell: {
                columnSpan: 1,
                fill: "ddd9c3",
              },
              content: [
                {
                  meta: {
                    alignment: AlignmentType.CENTER,
                  },
                  type: "run",
                  payload: [
                    {
                      type: "string",
                      content: "參數",
                      size: '11 pt',
                      bold: true,
                      color: "000000",
                      font: "Bitstream Vera Sans",
                    },
                  ],
                },
              ],
            },
            {
              cell: {
                columnSpan: 1,
                fill: "ddd9c3",
              },
              content: [
                {
                  meta: {
                    alignment: AlignmentType.CENTER,
                  },
                  type: "run",
                  payload: [
                    {
                      type: "string",
                      content: "資料型態",
                      size: '11 pt',
                      bold: true,
                      color: "000000",
                      font: "Bitstream Vera Sans",
                    },
                  ],
                },
              ],
            },
            {
              cell: {
                columnSpan: 1,
                fill: "ddd9c3",
              },
              content: [
                {
                  meta: {
                    alignment: AlignmentType.CENTER,
                  },
                  type: "run",
                  payload: [
                    {
                      type: "string",
                      content: "備註",
                      size: '11 pt',
                      bold: true,
                      color: "000000",
                      font: "Bitstream Vera Sans",
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
    };
  },
};
