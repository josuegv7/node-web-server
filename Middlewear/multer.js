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
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'files'
                };
                resolve(fileInfo);
            });
        });
    }
});


const upload = multer({ storage });

const singleUpload = upload.single('file');

module.exports = { singleUpload };
