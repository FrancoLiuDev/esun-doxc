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
      meta: META_CHAPTER_INDEX(),
      content: [
        ...STRING_RUN_BLOCK_ARRAY_LIST(
          `特店代號為必填欄位，輸入完成後當離開輸入欄位時，自動取得特店名稱`
        ),
        ...STRING_RUN_BLOCK_ARRAY_LIST(`手續費週期為月時需顯示日期欄位`),
        ...STRING_RUN_BLOCK_ARRAY_LIST(`國外卡手續費最低限額幣別選擇後需顯示金額`),
        ...STRING_RUN_BLOCK_ARRAY_LIST(`費率計算方式點選區分卡別，顯示卡別計費輸入畫面`),
        ...STRING_RUN_BLOCK_ARRAY_LIST(`費率計算方式點選級距式費率，顯示級距式費率計費輸入畫面`),
        ...STRING_RUN_BLOCK_ARRAY_LIST(`點選新增級距式費率,則顯示級距式費率輸入畫面`),
      ],
    },
  },
};
