var root = require("app-root-path");

//excel
const { getSheetTables } = require(root + "/utils/excel");
const xl = require("xlsx");
const workbook = xl.readFile("./downloads/手續費.xlsx");

const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root +
  "/style/run-string-style");
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
  META_CHAPTER_BODY_IMG,
  META_CHAPTER_TABLE,
} = require(root + "/style/sd-content-meta");
module.exports = {
  UIDESIGN: {
    type: "run",
    payload: "畫面設計",
    meta: META_CONTACT_ONEPAGE(),
    childs: {
      meta: META_CONTACT_ONE_CHAPTER(),
      content: [
        {
          type: "run",
          payload: "查詢主畫面",
          meta: META_CHAPTER_INDEX(),
          childs: {
            meta: META_CHAPTER_BODY(),
            content: [
              ...STRING_RUN_BLOCK_ARRAY_LIST(
                ` image:photo/手續費/手續費查詢.png`,
                {
                  image: {
                    meta: META_CHAPTER_BODY_IMG(),
                    width: 600,
                  },
                }
              ),
              // STYLE_TABLE_API(),
              STYLE_TABLE_UI_DESCRIPTION({
                data: getSheetTables({ sheet: workbook.Sheets["Sheet1"] })[
                  "手續費率查詢畫面"
                ],
              }),
              // STYLE_TABLE_UI_FIELD_DESCRIPTION(),
              // STYLE_TABLE_UI_BUTTON_DESCRIPTION()
            ],
          },
        },
      ],
    },
  },
};
