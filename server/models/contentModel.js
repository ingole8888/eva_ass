const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    url: { type: String },
    mockFile: [{ type: String }]
},
    { timestamps: true }
);
const contentModel = mongoose.model("content", ContentSchema)

module.exports = contentModel
