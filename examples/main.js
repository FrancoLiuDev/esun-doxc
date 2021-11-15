const {
  File,
  HeadingLevel,
  Packer,
  Paragraph,
  StyleLevel,
  TableOfContents,
  LevelFormat,
  UnderlineType,
  AlignmentType,
  TextRun,
  TableRow,
  TableCell,
  WidthType,
  Table,
  ImageRun,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
  convertInchesToTwip,
} = require("docx");
const fs = require("fs");
const { downloadImage } = require("../utils/download");
const table = new Table({
  columnWidths: [3505, 5505],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              children: [new TextRun({
                text: 'REVERSE_DIAGONAL_STRIPE',
                shading: {
                  // type: ShadingType.REVERSE_DIAGONAL_STRIPE,
  
                  color: "ffff00",
                  
                },
              })],
              indent: {
                left: '1 cm',
                right: '1 cm',

                // firstLine: convertInchesToTwip(0),
              },
            }),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("World")],
        }),
      ],
    }),
  ],
});
const img = download("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/150px-NewTux.svg.png");
const image = new ImageRun({
  data: img.buffer,
  // data: fs.readFileSync("./sample.png"),
  transformation: {
      width: 200,
      height: 200,
  },
  // floating: {
  //     horizontalPosition: {
  //         relative: HorizontalPositionRelativeFrom.RIGHT_MARGIN,
  //         offset: 1014400,
  //     },
  //     verticalPosition: {
  //         relative: VerticalPositionRelativeFrom.BOTTOM_MARGIN,
  //         offset: 1014400,
  //     },
  // },
});

const doc = new File({
  features: {
    updateFields: true,
  },
  numbering: {
    config: [
      {
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: convertInchesToTwip(0.1),
                  // right: convertInchesToTwip(0.18),
                  hanging: convertInchesToTwip(0.18),
                  // firstLine: convertInchesToTwip(0),
                },
              },
            },
          },
          {
            level: 1,
            format: LevelFormat.DECIMAL,
            text: "%2",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: convertInchesToTwip(0.1),
                  // right: convertInchesToTwip(0.18),
                  hanging: convertInchesToTwip(0.18),
                  // firstLine: convertInchesToTwip(0),
                },
              },
            },
          },
        ],
        reference: "my-crazy-numbering",
      },
      {
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: convertInchesToTwip(0.5),
                  hanging: convertInchesToTwip(0.18),
                },
              },
            },
          },
        ],
        reference: "my-number-numbering-reference",
      },
      {
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL_ZERO,
            text: "[%1]",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: convertInchesToTwip(0.5),
                  hanging: convertInchesToTwip(0.18),
                },
              },
            },
          },
        ],
        reference: "padded-numbering-reference",
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
          color: "FF0000",
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
      {
        id: "Normaltext",
        name: "Normaltext",
        basedOn: "Normal",
        // next: "Heading1",
        quickFormat: true,
        paragraph: {
          indent: { left: convertInchesToTwip(3) },
        },

        run: {
          italics: true,
          color: "9900ff",
        },
      },
      {
        id: "DetailBlock",
        name: "DetailBlock",
        basedOn: "Normal",
        quickFormat: true,

        paragraph: {
          spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
          indent: { left: 1440, hanging: 980 },
        },
      },
    ],
  },
  sections: [
    {
      children: [
        new TableOfContents("Summary", {
          hyperlink: true,
          headingStyleRange: "1-5",
          stylesWithLevels: [new StyleLevel("MySpectacularStyle", 1)],
        }),
         
        new Paragraph({
          text: "Hey you",

          numbering: {
            reference: "my-crazy-numbering",
            level: 1,
          },
        }),
        
        new Paragraph({
          text: "Hey you",
            
          numbering: {
            reference: "my-crazy-numbering",
            level: 1,
          },
        }),
        new Paragraph({
          text: "shading",
          shading: {
              
              color: "00ff00",
              fill: "ffffff",
          }
           
        }),
        new Paragraph({
           
          children: [
            image,
            new TextRun({
              text: "Name:",
              bold: true,
              font: "Calibri",
              allCaps: true,
            }),
            new TextRun({
              text: "Name:",
              bold: true,
              font: "Calibri",
              allCaps: true,
              break: 1,
            }),
            new TextRun({
              text: "Name:",
              bold: true,
              font: "Calibri",
              allCaps: true,
              break: 1,
            }),
          ],
        }),
        new Paragraph({
          text: "Hello World 2",
          numbering: {
            reference: "my-crazy-numbering",
            level: 3,
          },
        }),
        new Paragraph({
          text: "Yeah boi",
          numbering: {
            reference: "my-crazy-numbering",
            level: 1,
          },
        }),
        new Paragraph({
          text: "Hey you",
          numbering: {
            reference: "my-crazy-numbering",
            level: 0,
          },
        }),
        new Paragraph({
          text: "What's up fam",
          numbering: {
            reference: "my-crazy-numbering",
            level: 1,
          },
        }),
        new Paragraph({
          text: "Hello World 2",
          numbering: {
            reference: "my-crazy-numbering",
            level: 0,
          },
        }),
        new Paragraph({
          text: "Yeah boi",
          numbering: {
            reference: "my-crazy-numbering",
            level: 1,
          },
        }),
        new Paragraph({
          text: "101 MSXFM",
          numbering: {
            reference: "my-crazy-numbering",
            level: 0,
          },
        }),
        new Paragraph({
          text: "back to level 1",
          numbering: {
            reference: "my-crazy-numbering",
            level: 1,
          },
        }),
        new Paragraph({
          text: "back to level 0",
          numbering: {
            reference: "my-crazy-numbering",
            level: 0,
          },
        }),
      ],
    },
  ],
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("My Document.docx", buffer);
});
