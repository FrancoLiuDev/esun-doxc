module.exports = {
  STRING_RUN_BLOCK_ARRAY_LIST: (str) => {
    const strList =str.split("\n").map((s,i) =>{
      
      return s.trim().startsWith('image:') ?  {type:'image',content:`http://localhost:3000/getfile?file=${s.trim().slice(6)}`, width:600, break: i === 0 ? 0:1 } :{ type: "string", content: s.trim(), break: i === 0 ? 0:1 }
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
