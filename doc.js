const block = require("./pages/sample/index.js");

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
const { download } = require("./images/image");

async function gen() {
  try {
    const bodys = parser.parse(block.body, { parser: parser });
    const doc = new File({
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
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(1),
                right:convertInchesToTwip(0.5),
                bottom: convertInchesToTwip(1),
                left: convertInchesToTwip(0.5),
              },
              size: {
                orientation: PageOrientation.PORTRAIT,
                height: convertInchesToTwip(11.69),
                 width: convertInchesToTwip(8.27),
              },
            },
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
      fs.writeFileSync("My Document.docx", buffer);
    });
  } catch (error) {
    console.error("ERROR:", error);
  }
}
gen();

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
