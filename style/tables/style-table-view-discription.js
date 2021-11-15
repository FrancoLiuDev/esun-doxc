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
  STYLE_TABLE_UI_DESCRIPTION: ({ data }) => {
    
    return {
      meta: {
        ...META_CHAPTER_TABLE(),
        ...{
          width: 13000,
          columnWidths: [1500, 6000],
        },
      },
      type: "tableh",
      payload: {
        headers: [
          { label: "text", key: "row1" },
          { label: "row2", key: "row2" },
        ],
        rows: [
          {
            row1: `Route URI`,
            row2: data.find((d) => {
              return d[0] === "url";
            })
              ? data.find((d) => {
                  return d[0] === "url";
                })[1]
              : "N/A",
          },
          {
            row1: "Component檔案路徑",
            row2: data.find((d) => {
              return d[0] === "url";
            })
              ? data.find((d) => {
                  return d[0] === "path";
                })[1]
              : "N/A",
          },
          {
            row1: "Component說明",
            row2: data.find((d) => {
              return d[0] === "url";
            })
              ? data.find((d) => {
                  return d[0] === "description";
                })[1]
              : "N/A",
          },
        ],
      },
    };
  },
};
