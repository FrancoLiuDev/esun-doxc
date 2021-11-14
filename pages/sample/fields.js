var root = require("app-root-path");
const { IMAGE_UI_FORM } = require(root + "/style/image-styleing");
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
            meta: META_CHAPTER_BODY(),
            content: [
              // ...STRING_RUN_BLOCK_ARRAY_LIST(
              //   `image:手續費/手續費查詢.png
              //   ffefefefefef`
              // ),
            ],
          },
        },
        { type: "run", payload: "grgrgrg" },
      ],
    },
  },
};
