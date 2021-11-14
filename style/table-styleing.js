var root = require("app-root-path");
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
          columnWidths: [1000, 3000, 3000],
        },
        style: {
          background: "ffffff",
          color: "000000",
        },
      },
      payload: {
        rows: [
          //one row
          [
            //one col
            {
              cell: {
                columnSpan: 1,
              },
              content: [
                {
                  // meta:{
                  //   style:'DetailBlockGreen'
                  // },
                  type: "run",
                  payload: [
                    {
                      type: "string",
                      content: "grgrgg",
                    },
                  ],
                },
              ],
            },
            {
              cell: {
                columnSpan: 2,
                fill: "ff0000",
              },
              content: [
                {
                  type: "run",
                  payload: [
                    {
                      type: "string",
                      content: "Franco",
                      size: 26,
                      color: "ff0000",
                    },
                    {
                      type: "string",
                      content: "Franco",
                      size: 26,
                      color: "ff0000",
                    },
                  ],
                  // type:'string',
                  // size: 26,
                  // bold: true,
                  // type: "run",
                  // payload: "grgrgr",
                  // color: "ff0000",
                },
              ],
            },
          ],
          [
            //one col
            {
              cell: {
                columnSpan: 1,
              },
              content: [
                {
                  type: "run",
                  payload: "grgrgr",
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
                  payload: "grgrgr",
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
                  payload: "grgrgr",
                },
              ],
            },
          ],
        ],
      },
    };
  },
};
