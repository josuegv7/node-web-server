const { File } = require("../Models/File");
const { ObjectId } = require("mongodb");


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

// ***********************************************************
module.exports = {
    uploadFile(req, res) {
        // res.json({file: req.file});
        var file = new File({
            Original_filename: req.file.originalname,
            filename: req.file.filename,
            upload_Date: req.file.uploadDate,
            file_type: req.file.mimetype,
            _creator: req.user._id
        });
        file.save().then(
            (file) => {
                res.send(req.file);
            },
            (e) => {
                res.status(400).send(e);
            }
        );
    },
    getFiles(req,res){
        gfs.files.find().toArray((err, files)=>{
            // Check if there are files:
            if(!files){
                return res.status(404).json({
                    err: "No Files Found"
                });
            }else if(files.length === 0){
                return res.status(204).json({
                    files: "Processed request but not returning any content."
                });
            }
            else{
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
    },
    deleteSingleFIle(req,res){
        let fileID = req.params.filename;
        gfs.remove({_id: fileID, root:'files'}, (err, gridStore) =>{
            if(err){
                return res.status(404).json({err: err});
            }
            if(!err){
                return res.json({status: "File delted"});
            }
        });

    }
};





