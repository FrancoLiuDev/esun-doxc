var root = require("app-root-path");
const { IMAGE_UI_FORM } = require(root + "/style/image-styleing");
const {
  META_CONTACT_ONEPAGE,
  META_CONTACT_ONE_CHAPTER,
  META_CHAPTER_INDEX,
  META_CHAPTER_BODY,
  META_CHAPTER_BODY_IMG,
} = require(root + "/style/sd-content-meta");
const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root +
  "/style/run-string-style");
const { sdUrl } = require(root + "/images/image");
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
              {
                meta: META_CHAPTER_BODY_IMG(),
                type: "run",
                payload: [IMAGE_UI_FORM(sdUrl + "手續費/手續費查詢.png")],
              },

              // ...STRING_RUN_BLOCK_ARRAY_LIST(
              //   `image:手續費/手續費查詢.png
              //   ffefefefefef`
              // ),
              {
                type: "tableh",
                payload: {
                  headers: [
                    { label: "text", key: "row1" },
                    { label: "row2", key: "row2" },
                    { label: "row3", key: "row3" },
                  ],
                  rows: [
                    {
                      row1: "grgrgffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    },
                    { row1: "grgrg" },
                    { row1: "grgrg" },
                    { row1: "grgrg" },
                    { row1: "grgrg" },
                    { row1: "grgrg" },
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
