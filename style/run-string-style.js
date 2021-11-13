module.exports = {
  STRING_RUN_BLOCK_ARRAY_LIST: (str) => {
    console.log('STRING_RUN_BLOCK_ARRAY_LIST',str)
    return [
      {
        type: "run",
        payload: [{ type: "string", content: "frrsfgeghr" },{ type: "string", content: "frrsfgeghr", break: 0 }],
      },
      
    ];
  },
};
