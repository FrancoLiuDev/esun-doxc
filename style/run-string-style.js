

module.exports = {
  STRING_RUN_BLOCK_ARRAY_LIST: (str, options = {}) => {
    const strList = str.split("\n");
    const image = options.image ? options.image : {};
    const paragraphs = strList.reduce((a, s) => {
      if (!a.length | (s.trim().length === 0) | s.trim().startsWith("image:")) {
        a.push({
          type: "run",
          payload: [],
        });
      }
      const last = a[a.length - 1];
      if (s.trim().length) {
        if (s.trim().startsWith("image:")) {
          (last.meta = image.meta),
            last.payload.push({
              type: "image",
              content: `http://localhost:3000/getfile?file=${s.trim().slice(6)}`,
              width: image.width,
            });
          a.push({
            type: "run",
            payload: [],
          });
        } else {
          last.payload.push({
            type: "string",
            content: s.trim(),
            break: last.payload.length === 0 ? 0 : 1,
          });
        }
      }
      return a;
    }, []);
    
    return paragraphs;
  },
};
