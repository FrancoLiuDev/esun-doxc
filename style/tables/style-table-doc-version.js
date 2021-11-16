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
const unit = 10;

const headers = [
  {
    label: getHeader({ columnSpan: 1, label: "修訂日期" }),
    key: "修訂日期",
  },
  {
    label: getHeader({ columnSpan: 1, label: "版本編號" }),
    key: "版本編號",
  },

  {
    label: getHeader({ columnSpan: 1, label: "主要修訂摘要" }),
    key: "主要修訂摘要",
  },
  {
    label: getHeader({ columnSpan: 1, label: "作者" }),
    key: "作者",
  },
   
];
　
　
 


module.exports = {
  STYLE_TABLE_DOC_VERSIONS: ({ tableRow }) => {
    
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
            unit * 4,
            unit,
            unit * 2,
            unit * 5,
            unit,
          ],
        },
      },
      type: "table",
      payload: {
        headers: headers,
        rows: tableRow.slice(1).map((row) => {
          return {
            // 編號: findRow(row, "編號"),
            // 欄位名稱: findRow(row, "欄位名稱"),
            // 型態: findRow(row, "型態"),
            // 長度: findRow(row, "長度"),
            // JSON: findRow(row, "JSON"),
            // 預設值: findRow(row, "預設值"),
            // 欄位種類: findRow(row, "欄位種類"),
            // 備註: findRow(row, "備註"),
            // 必填: findRow(row, "必填"),
          };
        }),
      },
    };
  },
  　
};
