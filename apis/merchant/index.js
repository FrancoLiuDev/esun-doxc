var root = require("app-root-path");
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
const { API_BLOCK_ITEMS_3 } = require(root + "/style/api-content-number-style");
const {
  STYLE_TABLE_API,
  STYLE_TABLE_UI_DESCRIPTION,
  STYLE_TABLE_UI_FIELD_DESCRIPTION,
  STYLE_TABLE_UI_BUTTON_DESCRIPTION,
} = require(root + "/style/table-styleing");
const xl = require("xlsx");
const workbook_api = xl.readFile(root + "/downloads/api.xlsx");
const { getSheetTables, getSheetFixedTable } = require(root + "/utils/excel");

module.exports = {
  get_merchant_info: ({ whenCall }) => {
    return API_BLOCK_ITEMS_3({
      useName: "取得特店名稱",
      serviceUrl: "/merchant/get_merchant_info",
      whenCall: whenCall,
      inputTableRow: getSheetFixedTable({
        sheet: workbook_api.Sheets["api_example"],
      }),
    });
  },
};
