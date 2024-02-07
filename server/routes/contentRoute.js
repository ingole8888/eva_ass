const express = require("express");
const multer = require("multer");
const { postContent, getContent, getById } = require("../controllers/contentController");

const contentController = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
});

contentController.post("/create", upload.fields([ { name: "mockFile", maxCount: 1 }]), postContent);

contentController.get("/content", getContent);
contentController.get("/content/:id", getById);

module.exports = contentController;