var root = require("app-root-path");
//excel
const { getSheetTables, getSheetFixedTable } = require(root + "/utils/excel");
const xl = require("xlsx");
const workbook = xl.readFile("./downloads/api.xlsx");
const workbook2 = xl.readFile("./downloads/手續費.xlsx");
 
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
  SERVICE_DEFINE: {
    type: "run",
    payload: "Service整理",
    meta: META_CONTACT_ONEPAGE(),
    childs: {
      meta: META_CONTACT_ONE_CHAPTER(),
      content: [
        {
          type: "run",
          payload: "取得一筆特店手續費",
          meta: META_CHAPTER_INDEX(),
          childs: {
            meta: META_CHAPTER_INDEX(),
            content: [
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                `Service名稱：/merchant_fee_base/detail`
              ),
              {
                type: "run",
                payload: "呼叫時機：點選傳送按鍵後",
                meta: META_CHAPTER_INDEX(),
                childs: {
                  meta: META_CHAPTER_INDEX(),
                  content: [
                    ...STRING_RUN_BLOCK_ARRAY_LIST(`傳入參數：`),
                    STYLE_TABLE_API({
                      tableRow: getSheetFixedTable({ sheet: workbook.Sheets["api_example"]}),
                    }),
                    ...STRING_RUN_BLOCK_ARRAY_LIST(`回傳值：請參考CBP11-SD-030101-00001_Service說明文件-QueryVendorList`),
                    
 
                   
                  ],
                },
              },
            ],
          },
        },
        　 
      ],
    },
  },
};
