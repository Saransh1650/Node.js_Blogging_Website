const fs = require('fs');

const readStream = fs.createReadStream('./data.txt');
const writeStream = fs.createWriteStream('./data1.txt');


// readStream.on('data', (chunk) => {
//     console.log('===========NEW CHUNK============');
//     console.log(chunk.toString());
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
    
// });

//piping

readStream.pipe(writeStream)