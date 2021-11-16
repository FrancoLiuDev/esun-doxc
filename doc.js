var root = require("app-root-path");
const {
  File,
  HeadingLevel,
  Packer,
  Paragraph,
  StyleLevel,
  TableOfContents,
  LevelFormat,
  AlignmentType,
  TextRun,
  UnderlineType,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  Numbering,
  Header,
  Footer,
  PageOrientation,
  convertMillimetersToTwip,
  convertInchesToTwip,
} = require("docx");

const fs = require("fs");
const levels = require("./style-levels");
const styleDefault = require("./style-default");
const styleParagraph = require("./style-paragraph");
const parser = require("./parser");
const feeQuery = require(root + "/pages/手續費/查詢");
const feeＣreate = require(root + "/pages/手續費/新增");
const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root +
  "/style/run-string-style");
const {
  META_CONTACT_ONEPAGE,
  META_CONTACT_ONE_CHAPTER,
  META_CHAPTER_INDEX,
  META_CHAPTER_BODY,
  META_CHAPTER_BODY_IMG,
  META_CHAPTER_TABLE,
} = require(root + "/style/sd-content-meta");
// require("./download.js");

async function gen(block, fileName) {
  try {
    const bodys = parser.parse(block.body, { parser: parser });
    const doc = new File({
      background: {
        // color: "C45911",
        default: new Header({
          children: [new Paragraph("background")],
        }),
      },
      features: {
        updateFields: true,
      },
      numbering: {
        config: [
          {
            levels: levels.DECIMAL_START,
            reference: "number-sd-design-index",
          },
        ],
      },
      styles: {
        default: styleDefault.STYLE_DEFAULT,
        paragraphStyles: styleParagraph.STYLE_DEFAULT,
      },
      sections: [
        {
          // ...STRING_RUN_BLOCK_ARRAY_LIST(` image:photo/手續費/手續費查詢.png`, {
          //   image: {
          //     meta: META_CHAPTER_BODY_IMG(),
          //     width: 600,
          //   },
          // }),

          properties: {
            page: {
              margin: {
                // top: convertInchesToTwip(1),
                // right: convertInchesToTwip(0.5),
                // bottom: convertInchesToTwip(1),
                // left: convertInchesToTwip(0.5),
              },
              size: {
                orientation: PageOrientation.LANDSCAPE,
                height: convertInchesToTwip(11.69),
                width: convertInchesToTwip(8.27),
              },
            },
          },
          background: {
            default: new Header({
              children: [new Paragraph("background")],
            }),
          },
          headers: {
            default: new Header({
              children: [new Paragraph("Header text")],
            }),
          },
          footers: {
            default: new Footer({
              children: [new Paragraph("Footer text")],
            }),
          },
          children: [
            new TableOfContents("文件目錄", {
              hyperlink: true,

              headingStyleRange: "1-5",
              stylesWithLevels: [new StyleLevel("MySpectacularStyle", 1)],
            }),
            ...bodys,
          ],
        },
      ],
    });

    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(`${fileName}.docx`, buffer);
    });
  } catch (error) {
    console.error("ERROR:", error);
  }
}

// gen(feeQuery, "手續費查詢");
gen(feeＣreate, "手續費新增");

// new Paragraph({
//   children: [
//     new TextRun({
//       text: "break",

//     }),
//     new TextRun({
//       text: "break",
//       break: 1,
//     }),
//     new TextRun({

//       break: 1,
//     }),
//     image,
//   ],
// }),
