var root = require("app-root-path");

const { AlignmentType, convertInchesToTwip } = require("docx");

const {
  META_CONTACT_ONEPAGE,
  META_CONTACT_ONE_CHAPTER,
  META_CHAPTER_INDEX,
  META_CHAPTER_BODY,
  META_CHAPTER_BODY_IMG,
  META_CHAPTER_TABLE,
  META_CHAPTER_TABLE_BODY_SECOND,
} = require(root + "/style/sd-content-meta");

module.exports = {
  STYLE_TABLE_API: ({ tableRow }) => {
    console.log("STYLE_TABLE_API", tableRow);
    const elHeaders = tableRow.slice(0, 1)[0];
    const findRow = function (row, name) {
      return elHeaders.findIndex((eh) => {
        return name === eh;
      }) >= 0
        ? row[
            elHeaders.findIndex((eh) => {
              return name === eh;
            })
          ]
        : "N/A";
    };
    return {
      type: "tablefree",
      meta: {
        ...META_CHAPTER_TABLE_BODY_SECOND(),
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
          // [
          //   {
          //     cell: {
          //       columnSpan: 4,
          //       fill: "bfbfbf",
          //     },
          //     content: [
          //       {
          //         meta: {
          //           alignment: AlignmentType.CENTER,
          //         },
          //         type: "run",
          //         payload: [
          //           {
          //             type: "string",
          //             content: "MarshallableList<Currency>物件",
          //             size: "12 pt",
          //             bold: true,
          //             color: "000000",
          //             font: "Bitstream Vera Sans",
          //           },
          //         ],
          //       },
          //     ],
          //   },
          // ],
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
                      size: "11 pt",
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
                      size: "11 pt",
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
                      content: "邏輯",
                      size: "11 pt",
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
                      size: "11 pt",
                      bold: true,
                      color: "000000",
                      font: "Bitstream Vera Sans",
                    },
                  ],
                },
              ],
            },
          ],

         //suppliesFlag	String	固定值：Y	N/A

          [
            ...[
              {
                cell: {
                  columnSpan: 1,
                },
                content: [
                  {
                    type: "run",
                    payload: [
                      {
                        type: "string",
                        content: "suppliesFlag",
                        size: "12 pt",
                      },
                    ],
                  },
                ],
              },
              {
                cell: {
                  columnSpan: 1,
                },
                content: [
                  {
                    type: "run",
                    payload: [
                      {
                        type: "string",
                        content: "String",
                        size: "12 pt",
                      },
                    ],
                  },
                ],
              },
              {
                cell: {
                  columnSpan: 1,
                },
                content: [
                  {
                    type: "run",
                    payload: [
                      {
                        type: "string",
                        content: "固定值：Y",
                        size: "12 pt",
                      },
                    ],
                  },
                ],
              },
              {
                cell: {
                  columnSpan: 1,
                },
                content: [
                  {
                    type: "run",
                    payload: [
                      {
                        type: "string",
                        content: "N/A",
                        size: "12 pt",
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        ],
      },
    };
  },
};
