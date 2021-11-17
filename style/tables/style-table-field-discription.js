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
            size: "10 pt",
            bold: true,
            color: "000000",
            font: "Bitstream Vera Sans",
          },
        ],
      },
    ],
  };
};
const unit = 1800;

const headers = [
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
];
const headers_buttons = [
  {
    label: getHeader({ columnSpan: 1, label: "編號" }),
    key: "編號",
  },
  {
    label: getHeader({ columnSpan: 1, label: "按建名稱" }),
    key: "按建名稱",
  },
  //
  {
    label: getHeader({ columnSpan: 1, label: "功能反應" }),
    key: "功能反應",
  },
  {
    label: getHeader({ columnSpan: 1, label: "欄位種類" }),
    key: "欄位種類",
  },
  {
    label: getHeader({ columnSpan: 1, label: "備註" }),
    key: "備註",
  },
];
module.exports = {
  STYLE_TABLE_UI_FIELD_DESCRIPTION: ({ tableRow }) => {
    const elHeaders = tableRow.slice(0, 1)[0];
    const findRow = function (row, name) {
      return elHeaders.findIndex((eh) => {
        return name === eh;
      }) >= 0
        ? row[
            elHeaders.findIndex((eh) => {
              return name === eh;
            })
          ]
        : "N/A";
    };
    return {
      meta: {
        ...META_CHAPTER_TABLE(),
        ...{
          width: 13000,
          columnWidths: [
            unit,
            unit * 2,
            unit,
            unit,
            unit *1,
            unit,
            unit * 2,
            unit * 1,
            unit,
          ],
        },
      },
      type: "table",
      payload: {
        headers: headers,
        rows: tableRow.slice(1).map((row) => {
          return {
            編號: findRow(row, "編號"),
            欄位名稱: findRow(row, "欄位名稱"),
            型態: findRow(row, "型態"),
            長度: findRow(row, "長度"),
            JSON: findRow(row, "JSON"),
            預設值: findRow(row, "預設值"),
            欄位種類: findRow(row, "欄位種類"),
            備註: findRow(row, "備註"),
            必填: findRow(row, "必填"),
          };
        }),
      },
    };
  },
  STYLE_TABLE_UI_BUTTON_DESCRIPTION: ({ tableRow }) => {
    // return {
    //   type:'run',
    //   payload:'STYLE_TABLE_UI_BUTTON_DESCRIPTION'
    // }
    const elHeaders = tableRow.slice(0, 1)[0];
    const findRow = function (row, name) {
      return elHeaders.findIndex((eh) => {
        return name === eh;
      }) >= 0
        ? row[
            elHeaders.findIndex((eh) => {
              return name === eh;
            })
          ]
        : "N/A";
    };
    return {
      meta: {
        ...META_CHAPTER_TABLE(),
        ...{
          width: 13000,
          columnWidths: [unit, unit * 2, unit * 4, unit * 2, unit * 5],
        },
      },
      type: "table",
      payload: {
        headers: headers_buttons,
        rows: tableRow.slice(1).map((row) => {
          return {
            編號: findRow(row, "編號"),
            按建名稱: findRow(row, "按建名稱"),
            功能反應: findRow(row, "功能反應"),
            欄位種類: findRow(row, "欄位種類"),
            備註: findRow(row, "備註"),
          };
        }),
      },
    };
  },
};
