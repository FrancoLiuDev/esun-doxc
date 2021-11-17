var root = require("app-root-path");
const { IMAGE_UI_FORM } = require(root + "/style/image-styleing");
const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root +
  "/style/run-string-style");
const {
  META_CONTACT_ONE_DOCCUMENT,
  META_CONTACT_ONEPAGE,
  META_CONTACT_ONE_CHAPTER,
  META_CHAPTER_INDEX,
  META_CHAPTER_BODY,
  META_CHAPTER_BODY_IMG,
  META_CHAPTER_TABLE,
} = require(root + "/style/sd-content-meta");

const CREATE = require("./新增");
const MOTIFY = require("./修改");
const DETAIL = require("./明細");
const INPUT_RANGE = require("./新增級距");

module.exports = {
  body: {
    content: [
      {
        type: "run",
        payload: "手續費新增",
        meta: META_CONTACT_ONE_DOCCUMENT(),
        childs: {
          content: CREATE.body.content,
        },
      },
      {
        type: "run",
        payload: "手續費修改",
        meta: META_CONTACT_ONE_DOCCUMENT(),
        childs: {
          content: MOTIFY.body.content,
        },
      },
      {
        type: "run",
        payload: "手續費明細",
        meta: META_CONTACT_ONE_DOCCUMENT(),
        childs: {
          content: DETAIL.body.content,
        },
      },
      {
        type: "run",
        payload: "手續費新增級距",
        meta: META_CONTACT_ONE_DOCCUMENT(),
        childs: {
          content: INPUT_RANGE.body.content,
        },
      },
      ,
    ],
  },
};
