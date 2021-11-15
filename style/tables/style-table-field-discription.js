var root = require("app-root-path");

const { AlignmentType, convertInchesToTwip } = require("docx");

const {
  META_CONTACT_ONEPAGE,
  META_CONTACT_ONE_CHAPTER,
  META_CHAPTER_INDEX,
  META_CHAPTER_BODY,
  META_CHAPTER_BODY_IMG,
  META_CHAPTER_TABLE,
} = require(root + "/style/sd-content-meta");

let getHeader = ({ columnSpan, label }) => {
  return {
    cell: {
      columnSpan: columnSpan,
      fill: "bfbfbf",
    },
    content: [
      {
        meta: {
          alignment: AlignmentType.CENTER,
        },
        type: "run",
        payload: [
          {
            type: "string",
            content: label,
            size: "12 pt",
            bold: true,
            color: "000000",
            font: "Bitstream Vera Sans",
          },
        ],
      },
    ],
  };
};
const unit = 80
module.exports = {
  STYLE_TABLE_UI_FIELD_DESCRIPTION: () => {
    return {
      meta: {
        ...META_CHAPTER_TABLE(),
        ...{
          width: 9000,
          columnWidths: [unit, unit*2,unit,unit,unit*4,unit,unit*2,unit*5,unit],
        },
      },
      type: "table",
      payload: {
        headers: [
          {
            label: getHeader({ columnSpan: 1, label: "編號" }),
            key: "編號",
          },
          {
            label: getHeader({ columnSpan: 1, label: "欄位名稱" }),
            key: "欄位名稱",
          },
          {
            label: getHeader({ columnSpan: 1, label: "型態" }),
            key: "型態",
          },
          {
            label: getHeader({ columnSpan: 1, label: "長度" }),
            key: "長度",
          },
          {
            label: getHeader({ columnSpan: 1, label: "JSON" }),
            key: "JSON",
          },
          {
            label: getHeader({ columnSpan: 1, label: "預設值" }),
            key: "預設值",
          },
          {
            label: getHeader({ columnSpan: 1, label: "欄位種類" }),
            key: "欄位種類",
          },
          {
            label: getHeader({ columnSpan: 1, label: "備註" }),
            key: "備註",
          },
          {
            label: getHeader({ columnSpan: 1, label: "必填" }),
            key: "必填",
          },
        ],
        rows: [
          {
            編號: `1.`,
            按建名稱: "查詢",
          },
        ],
      },
    };
  },
  STYLE_TABLE_UI_BUTTON_DESCRIPTION: () => {
    return {
      meta: {
        ...META_CHAPTER_TABLE(),
        ...{
          width: 9000,
          columnWidths: [300, 600,800,700,2500],
        },
      },
      type: "table",
      payload: {
        headers: [
          {
            label: getHeader({ columnSpan: 1, label: "編號" }),
            key: "編號",
          },
          {
            label: getHeader({ columnSpan: 1, label: "按建名稱" }),
            key: "按建名稱",
          },
          {
            label: getHeader({ columnSpan: 1, label: "功能反應" }),
            key: "功能反應",
          },
          {
            label: getHeader({ columnSpan: 1, label: "欄位種類" }),
            key: "欄位種類",
          },
          {
            label: getHeader({ columnSpan: 1, label: "欄位種類" }),
            key: "備註",
          },
        ],
        rows: [
          {
            編號: `1.`,
            按建名稱: "查詢",
          },
        ],
      },
    };
  },
};
