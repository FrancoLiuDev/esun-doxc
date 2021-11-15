
var root = require('app-root-path');
const { IMAGE_UI_FORM } = require(root + "/style/image-styleing");
const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root + "/style/run-string-style");
const {UIDESIGN}  = require('./display');
const {FIELD_DEFINE}  = require('./fields');
module.exports = {
  body: {
    content: [
      UIDESIGN,
      FIELD_DEFINE,
      
      { title: "邏輯描述" },
      { title: "Service整理" },
    ],
  },
  // body: [
  //   {
  //     // meta: {

  //     //   number: {
  //     //     name: "number-sd-design-index",
  //     //   },
  //     // },
  //     title: "畫面設計",
  //     childs: {
  //       meta: {
  //         style: "sd-descripion-header",
  //         number: {
  //           // name: "number-sd-design-index",
  //         },
  //       },
  //       content: [
  //         {
  //           type: "run",
  //           payload: [
  //             "grgrgrg",

  //           ],
  //         },
  //         {
  //           type: "run",
  //           payload: [
  //             IMAGE_UI_FORM(
  //               "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/150px-NewTux.svg.png"
  //             ),
  //           ],
  //         },
  //         { type: "run", payload: "grgrgrg" },
  //       ],
  //     },
  //   },
  //   {
  //     title: "欄位定義",
  //     childs: {
  //       meta: {
  //         number: {
  //           // name: "number-sd-design-index",
  //         },
  //       },
  //       content: [
  //         { type: "run", payload: ["grgrgrg"] },
  //         { type: "run", payload: ["grgrgrg"] },
  //       ],
  //     },
  //   },
  //   { title: "邏輯描述" },
  //   { title: "Service整理" },
  // ],
};
