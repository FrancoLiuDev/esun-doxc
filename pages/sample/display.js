var root = require('app-root-path');
const { IMAGE_UI_FORM } = require(root + "/style/image-styleing");
const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root + "/style/run-string-style");

module.exports = {
  UIDESIGN:  {
    type: "run",
    payload: "畫面設計",
    meta: {
      style: "sd-descripion-header",
      number: {
        name: "number-sd-design-index",
      },
    },
    childs: {
      meta: {
        style: "sd-descripion-body",
        number: {
          name: "number-sd-design-index",
        },
      },
      content: [
        {
          type: "run",
          payload: "fefefef",
          meta: {
            style: "sd-descripion-body",
            number: {
              name: "number-sd-design-index",
            },
          },
          childs: {
            meta: {
              style: "sd-descripion-body",
            },
            content: [
              { type: "run", payload: ["grgrgrg"] },
              {
                type: "run",
                payload: [
                  // encodeURI("http://localhost:3000/getfile?file=手續費/手續費查詢.png")
                  IMAGE_UI_FORM(
                    "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
                  ),
                ],
              },
            ],
          },
        },
        ...STRING_RUN_BLOCK_ARRAY_LIST(
          `grgrgrgrg
          grgrgrgrgrgrgrgrgr`
        ),

        { type: "run", payload: "grgrgrg" },
      ],
    },
  }
   
};
