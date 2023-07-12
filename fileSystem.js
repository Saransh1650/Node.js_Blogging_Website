 const fs = require('fs')
// file system

//reading file
// fs.readFile('./blog.txt', (err, data) => {
//     if (err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// console.log('last line');

//Writing files

// fs.writeFile('./blogCreated.txt', 'hello, world', () => {
//     console.log('file was written');
// });

// Directory
// if(!fs.existsSync('./assets'))
// {fs.mkdir('./assets', (err) => {
//     if(err){
//         console.log(err);
//     }
//     console.log('folder created');
// });}
// else{
//     fs.rmdir('./assets',(err)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log('folder deleted');
//     });
// }


// Deleting files

if(fs.existsSync('./deleteme.txt')){
    fs.unlink('./deleteme.txt', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('deleted');
    });
}