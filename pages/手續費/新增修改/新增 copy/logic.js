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
  META_CHAPTER_INDEX_LEVEL3,
  META_CHAPTER_BODY_SECOND_BODY,
  META_CHAPTER_BODY,
} = require(root + "/style/sd-content-meta");
const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root +
  "/style/run-string-style");

module.exports = {
  LOGIC_DEFINE: {
    type: "run",
    payload: "邏輯描述",
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
            meta: META_CHAPTER_INDEX(),
            content: [
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                `輸入新增主表單欄位
                輸入新增主表單欄位
                輸入新增主表單欄位
                輸入新增主表單欄位
                grrgrgrgrgrrgrgrg`
              ),
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                `選擇計費方式選擇計費方式選擇計費方式選擇計費方式選擇計費方式選擇計費方式選擇計費方式選擇計費方式選擇計費方式rgrgrgrgr選擇計費方式選擇計費方式選擇計費方式rggrgggggggggggggggggggggggggggggggggggggggggg`
              ),
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                `選擇計算方式`
              ),
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                `輸入表單後點選傳送`
              ),
            ],
          },
        },
        {
          type: "run",
          payload: "新增級距式費率",
          meta: META_CHAPTER_INDEX(),
          childs: {
            // meta: META_CHAPTER_BODY(),
            meta: META_CHAPTER_INDEX(),
            content: [
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                `輸入必填欄位上級距，下級距，費率欄位後點選確定`
              ),
             　

            ],
          },
        },
       　
      ],
    },
  },
};
