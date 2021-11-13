module.exports = {
  STRING_RUN_BLOCK_ARRAY_LIST: (str) => {
    
    const strList =str.split("\n").map((s,i) =>{
      return { type: "string", content: s.trim(), break: i === 0 ? 0:1 }
    });
    console.log('STRING_RUN_BLOCK_ARRAY_LIST',strList)

    return [
      {
        type: "run",
        payload: [...strList],
      },
      
    ];
  },
};
