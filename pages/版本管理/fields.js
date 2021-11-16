var root = require("app-root-path");
//excel
const { getSheetTables,getSheetFixedTable } = require(root + "/utils/excel");
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
          payload: "查詢主畫面",
          meta: META_CHAPTER_INDEX(),
          childs: {
            // meta: META_CHAPTER_BODY(),
            content: [
              
              STYLE_TABLE_UI_FIELD_DESCRIPTION({
                tableRow: getSheetFixedTable({ sheet: workbook.Sheets["欄位查詢主畫面"]}),
              }),
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                ``
              ),
              STYLE_TABLE_UI_BUTTON_DESCRIPTION({
                tableRow: getSheetFixedTable({ sheet: workbook.Sheets["欄位查詢主畫面BUTTON"]}),
              }),
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                ``
              ),
            ],
          },
        },
        {
          type: "run",
          payload: "查詢結果",
          meta: META_CHAPTER_INDEX(),
          childs: {
            content: [
              STYLE_TABLE_UI_BUTTON_DESCRIPTION({
                tableRow: getSheetFixedTable({ sheet: workbook.Sheets["欄位查詢結果BUTTON"]}),
              }),
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                ``
              ),
            ],
          },
        },
      ],
    },
  },
};
