const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var fileSchema = new Schema(
    {
        Original_filename: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        filename: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        upload_Date: {
            type: Date,
            default: null
        },
        file_type: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        _creator: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        }
    }
);



// Export Tool Object Model:

var File = mongoose.model("File", fileSchema);
module.exports = { File };
