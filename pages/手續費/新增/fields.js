var root = require("app-root-path");
//excel
const { getSheetTables, getSheetFixedTable } = require(root + "/utils/excel");
const xl = require("xlsx");
const workbook = xl.readFile("./downloads/手續費.xlsx");

const {
  STYLE_TABLE_API,
  STYLE_TABLE_UI_DESCRIPTION,
  STYLE_TABLE_UI_FIELD_DESCRIPTION,
  STYLE_TABLE_UI_BUTTON_DESCRIPTION,
} = require(root + "/style/table-styleing");
const {
  META_CONTACT_ONEPAGE,
  META_CONTACT_ONE_CHAPTER,
  META_CHAPTER_INDEX,
  META_CHAPTER_BODY,
} = require(root + "/style/sd-content-meta");
const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root +
  "/style/run-string-style");

module.exports = {
  FIELD_DEFINE: {
    type: "run",
    payload: "欄位定義",
    meta: META_CONTACT_ONEPAGE(),
    childs: {
      meta: META_CONTACT_ONE_CHAPTER(),
      content: [
        {
          type: "run",
          payload: "新增表單",
          meta: META_CHAPTER_INDEX(),
          childs: {
            // meta: META_CHAPTER_BODY(),
            content: [
              STYLE_TABLE_UI_FIELD_DESCRIPTION({
                tableRow: getSheetFixedTable({
                  sheet: workbook.Sheets["手續費新增_欄位1"],
                }),
              }),
              ...STRING_RUN_BLOCK_ARRAY_LIST(``),
            ],
          },
        },
        {
          type: "run",
          payload: "新增級距式費率",
          meta: META_CHAPTER_INDEX(),
          childs: {
            content: [
              STYLE_TABLE_UI_FIELD_DESCRIPTION({
                tableRow: getSheetFixedTable({
                  sheet: workbook.Sheets["手續費新增_級距計費"],
                }),
              }),
              ...STRING_RUN_BLOCK_ARRAY_LIST(``),
            ],
          },
        },
      ],
    },
  },
};
