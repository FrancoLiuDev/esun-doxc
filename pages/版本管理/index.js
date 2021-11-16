
var root = require('app-root-path');
const { IMAGE_UI_FORM } = require(root + "/style/image-styleing");
const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root + "/style/run-string-style");
const {UIDESIGN}  = require('./display');
const {FIELD_DEFINE}  = require('./fields');
const {LOGIC_DEFINE}  = require('./logic');
const {SERVICE_DEFINE}  = require('./service');
const {
  STYLE_TABLE_API,
  STYLE_TABLE_UI_DESCRIPTION,
  STYLE_TABLE_UI_FIELD_DESCRIPTION,
  STYLE_TABLE_UI_BUTTON_DESCRIPTION,
  STYLE_TABLE_DOC_VERSIONS
} = require(root + "/style/table-styleing");
const xl = require("xlsx");
const workbook = xl.readFile("./downloads/手續費.xlsx");
const { getSheetTables,getSheetFixedTable } = require(root + "/utils/excel");
module.exports = {
  body: {
    content: [
      STYLE_TABLE_DOC_VERSIONS({
        tableRow: getSheetFixedTable({ sheet: workbook.Sheets["欄位查詢主畫面BUTTON"]}),
      }),
      　
    ],
  },
   
};
