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
  const {
    STYLE_TABLE_API,
    STYLE_TABLE_UI_DESCRIPTION,
    STYLE_TABLE_UI_FIELD_DESCRIPTION,
    STYLE_TABLE_UI_BUTTON_DESCRIPTION,
  } = require(root + "/style/table-styleing");
const xl = require("xlsx");
const workbook_api = xl.readFile(root +"/downloads/api.xlsx");
　
const { getSheetTables, getSheetFixedTable } = require(root + "/utils/excel");


module.exports = {
  API_BLOCK_ITEMS_3: ({useName, serviceUrl, whenCall, inputTableRow}) => {
    return {
        type: "run",
        payload: useName ,
        meta: META_CHAPTER_INDEX(),
        childs: {
          // meta: META_CHAPTER_BODY(),
          meta: META_CHAPTER_INDEX(),
          content: [
            ...STRING_RUN_BLOCK_ARRAY_LIST(
              `Service名稱： ${serviceUrl}`
            ),
            {
              type: "run",
              payload: `呼叫時機：${whenCall}`,
              meta: META_CHAPTER_INDEX(),
              childs: {
                meta: META_CHAPTER_INDEX(),
                content: [
                  ...STRING_RUN_BLOCK_ARRAY_LIST(`傳入參數：`),
                  STYLE_TABLE_API({
                    tableRow:inputTableRow  
                  }),
                   
                ],
              },
            },
          ],
        },
      }
  }
};

// return {
//   type: "run",
//   payload: "取得特店名稱",
//   meta: META_CHAPTER_INDEX(),
//   childs: {
//     // meta: META_CHAPTER_BODY(),
//     meta: META_CHAPTER_INDEX(),
//     content: [
//       ...STRING_RUN_BLOCK_ARRAY_LIST(
//         `Service名稱：/merchant/get_merchant_info`
//       ),
//       {
//         type: "run",
//         payload: "呼叫時機：特店代輸入後離開輸入欄位時",
//         meta: META_CHAPTER_INDEX(),
//         childs: {
//           meta: META_CHAPTER_INDEX(),
//           content: [
//             ...STRING_RUN_BLOCK_ARRAY_LIST(`傳入參數：`),
//             STYLE_TABLE_API({
//               tableRow: getSheetFixedTable({
//                 sheet: workbook_api.Sheets["api_example"],
//               }),
//             }),
//             // ...STRING_RUN_BLOCK_ARRAY_LIST(`回傳值：請參考CBP11-SD-030101-00001_Service說明文件-QueryVendorList`),
//           ],
//         },
//       },
//     ],
//   },
// }