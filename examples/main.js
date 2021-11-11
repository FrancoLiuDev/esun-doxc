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
  convertInchesToTwip,
} = require("docx");
const fs = require("fs");

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
                  left: convertInchesToTwip(0.5),
                  hanging: convertInchesToTwip(0.18),
                },
              },
            },
          },
        ],
        reference: "my-crazy-reference",
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
        new TableOfContents("Summary", {
          hyperlink: true,
          headingStyleRange: "1-5",
          stylesWithLevels: [new StyleLevel("MySpectacularStyle", 1)],
        }),
        new Paragraph({
          text: "Header #1",
          numbering: {
            reference: "my-crazy-reference",
            level: 0,
          },
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: false,
        }),
        new Paragraph("I'm a little text very nicely written.'"),
        new Paragraph({
          text: "Header #2",
          numbering: {
            reference: "my-number-numbering-reference",
            level: 0,
          },
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: false,
        }),
        new Paragraph("I'm a other text very nicely written.'"),
        new Paragraph({
          text: "Header #2.1",
          numbering: {
            reference: "my-crazy-reference",
            level: 0,
          },
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph("I'm a another text very nicely written.'"),
        new Paragraph({
          text: "My Spectacular Style #1",
          style: "MySpectacularStyle",
          pageBreakBefore: false,
        }),
        new Paragraph({
          text: "childrens",
          numbering: {
            reference: "my-crazy-reference",
            level: 3,
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
