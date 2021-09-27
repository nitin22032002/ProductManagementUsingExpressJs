var multer=require('multer');
const generateUniqueId = require('generate-unique-id');
var des=multer.diskStorage({
    destination:(req,file,path)=>{
        path(null,"public/images");
    },
    filename:(req,file,path)=>{
        var id=generateUniqueId({
            length:10,
            includeSymbols:['@','$','!','^','&']
        })
        path(null,(id+"."+file.originalname.split('.')[1]));
    }
})
var upload=multer({storage:des});
module.exports=upload;