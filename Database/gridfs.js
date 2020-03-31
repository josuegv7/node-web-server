// Connection to DB
const mongoose = require('mongoose');


// File Upload:
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

// Init the stream for girdFS:
var conn = mongoose.createConnection('mongodb://admin:adminpassword123@ds335668.mlab.com:35668/node-web-server', { useNewUrlParser: true });
conn.once('open', function () {
    var gfs = Grid(conn.db, mongoose.mongo);

    // all set!
})