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
  convertInchesToTwip,
} = require("docx");

 
const fs = require("fs");
const levels = require("./style-levels");
const styleDefault = require("./style-default");
const styleParagraph = require("./style-paragraph");
const parser= require("./parser");
const { download } = require("./images/image");
  
async function gen() {
  try {
    const bodys  =   parser.parse(block.body)
    // console.log('bodys', bodys)
    // const image = new ImageRun({
    //   data: await download(),
    //   transformation: {
    //     width: 200,
    //     height: 200,
    //   },
    //   break: 1,
    // });

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