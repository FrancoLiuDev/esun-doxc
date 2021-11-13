const { IMAGE_UI_FORM } = require("./style/image-styleing");
module.exports = {
  body: [
    {
      title: "畫面設計",
      childs: {
        meta: {
          style: "heading-descripion-content",
          number: {
            // name: "number-sd-design-index",
          },
        },
        content: [
          {
            type: "run",
            payload: [
              "grgrgrg",
               
            ],
          },
          {
            type: "run",
            payload: [
              IMAGE_UI_FORM(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/150px-NewTux.svg.png"
              ),
            ],
          },
          { type: "run", payload: "grgrgrg" },
        ],
      },
    },
    {
      title: "欄位定義",
      childs: {
        meta: {
          number: {
            // name: "number-sd-design-index",
          },
        },
        content: [
          { type: "run", payload: ["grgrgrg"] },
          { type: "run", payload: ["grgrgrg"] },
        ],
      },
    },
    { title: "邏輯描述" },
    { title: "Service整理" },
  ],
};
