const path = require('path');
// Connection to DB
const mongoose = require('mongoose');
// File Upload:
const multer = require("multer");
const Grid = require("gridfs-stream");
// Storage Store:
const crypto = require('crypto');
const GridFsStorage = require("multer-gridfs-storage");

// MongoURI:
let mongoURI = "mongodb://admin:adminpassword123@ds335668.mlab.com:35668/node-web-server";

// Init the stream for girdFS:
let gfs;
let conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('files');
});

let storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        console.log("Storage Req: ", req);
        return new Promise((resolve, reject) => {
            const filename = path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'files'
            };
            resolve(fileInfo);
            
            // crypto.randomBytes(4, (err, buf) => {
            //     if (err) {
            //         return reject(err);
            //     }
            //     // const filename = buf.toString('hex') + path.extname(file.originalname);
            //     // const filename = path.extname(file.originalname) + buf.toString('hex');
            //     const filename = path.extname(file.originalname);
            //     const fileInfo = {
            //         filename: filename,
            //         bucketName: 'files'
            //     };
            //     resolve(fileInfo);
            // });
        });
    }
});
const upload = multer({ storage });
const singleUpload = upload.single('file');
module.exports = { singleUpload };

// ***********************************************************
module.exports = {
    uploadFile(req, res) {
        res.json({file: req.file});
    },
    getFiles(req,res){
        gfs.files.find().toArray((err, files)=>{
            // Check if there are files:
            if(!files || files.length === 0){
                return res.status(404).json({
                    err: "No Files Found"
                });
            }else{
                return res.json(files);
            }
        }); 
    },
    getSingleFile(req,res){
        gfs.files.findOne({filename: req.params.filename}, (err,file)=>{
            if(!file || file.length === 0){
                return res.status(404).json({
                    err: 'File Not Found'
                });
            }
            else{
                const readstream = gfs.createReadStream(file.filename);
                return readstream.pipe(res);
                // return res.json(file);
            }
        });
    }




};






