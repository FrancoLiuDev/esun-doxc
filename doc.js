const block = require("./block.js");
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
  convertInchesToTwip,
} = require("docx");
const fs = require("fs");
const levels = require("./levels");
const { download } = require("./images/image");
 

const bodys = block.body.map((b) => {
  return new Paragraph({
    text: b.title,
    numbering: {
      reference: "reference-block",
      level: 0,
    },
    heading: HeadingLevel.HEADING_1,
    stylesWithLevels: [new StyleLevel("MySpectacularStyle", 0)],
  });
});

// data: fs.readFileSync(
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/150px-NewTux.svg.png"
// ),
async function gen() {
  try {
    // const img = await download();
    // console.log("img", img);
    const image = new ImageRun({
      data: await download(),
      transformation: {
        width: 200,
        height: 200,
      },
      break: 1,
    });

    const doc = new File({
      features: {
        updateFields: true,
      },
      numbering: {
        config: [
          {
            levels: levels.DECIMAL_START,
            reference: "reference-block",
          },
        ],
      },
      styles: {
        default: {
          heading1: {
            run: {
              size: 28,
              bold: true,
              italics: true,
              color: "000000",
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
          heading2: {
            run: {
              size: 26,
              bold: true,
              underline: {
                type: UnderlineType.DOUBLE,
                color: "FF0000",
              },
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120,
              },
            },
          },
          listParagraph: {
            run: {
              color: "#FF0000",
            },
          },
        },
        paragraphStyles: [
          {
            id: "MySpectacularStyle",
            name: "My Spectacular Style",
            basedOn: "Heading1",
            next: "Heading1",
            quickFormat: true,
            run: {
              italics: true,
              color: "990000",
            },
          },
        ],
      },
      sections: [
        {
          children: [
            new TableOfContents("文件目錄", {
              hyperlink: true,
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
// Used to export the file into a .docx file

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