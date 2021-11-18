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
  HorizontalPositionAlign,
  VerticalPositionAlign,
  FrameAnchorType,
  PageNumber,
  convertMillimetersToTwip,
  convertInchesToTwip,
} = require("docx");

const fs = require("fs");
const levels = require("./style-levels");
const styleDefault = require("./style-default");
const styleParagraph = require("./style-paragraph");
const parser = require("./parser");
const feeQuery = require(root + "/pages/手續費/查詢");
const feeＣreate = require(root + "/pages/手續費/新增修改");
const docVersion = require(root + "/pages/版本管理");
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
const { STYLE_TABLE_DOC_VERSIONS } = require(root + "/style/table-styleing");

async function gen(block, fileName) {
  try {
    const bodys = parser.parse(block.body, { parser: parser });
    const versions = parser.parse(docVersion.body, { parser: parser });
    const image = new ImageRun({
      data: fs.readFileSync("./img/esun.png"),
      transformation: {
        width: 220,
        height: 44,
      },
      // floating: {
      //   horizontalPosition: {
      //     offset: 1014400, // relative: HorizontalPositionRelativeFrom.PAGE by default
      //   },
      //   verticalPosition: {
      //     offset: 1014400 / 3, // relative: VerticalPositionRelativeFrom.PAGE by default
      //   },
      // },
    });

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
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [image],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [new TextRun("機密文件")],
                }),
              ],
            }),
          },

          footers: {
            default: new Footer({
              children: [
                new Paragraph("SD文件範本"),
                new Paragraph({
                  children: [
                    new TextRun({
                      children: ["第", PageNumber.CURRENT,"頁","/",PageNumber.TOTAL_PAGES],
                    }),
                  ],
                }),
              ],
            }),
          },
          children: [
            new TableOfContents("文件目錄", {
              hyperlink: true,
              headingStyleRange: "1-5",
              stylesWithLevels: [new StyleLevel("MySpectacularStyle", 1)],
            }),
             ...versions,
            ...bodys,
          ],
        },
      ],
    });

    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(`outputs/${fileName}.docx`, buffer);
    });
  } catch (error) {
    console.error("ERROR:", error);
  }
}

gen(feeQuery, "手續費查詢");
gen(feeＣreate, "手續費新增");
