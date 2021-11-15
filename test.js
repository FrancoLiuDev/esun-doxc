const { download } = require('./images/image')
var sizeOf = require('buffer-image-size')

const imag = download('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/150px-NewTux.svg.png')

var dimensions = sizeOf(imag)
console.log('imag', dimensions)
rggrgr
ss
ss一一一直
dwdwdwfwfe