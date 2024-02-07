const contentModel = require("../models/contentModel");

const postContent = async (req, res) => {
    let { title, description, url } = req.body;

    try {
        const content = new contentModel({
            title, description, url
        });

        if (req.files) {
            if (req.files["mockFile"]) {
                content.mockFile = req.files["mockFile"].map(
                    (file) => file.filename
                );
            }
        }

        await content.save();

        return res.status(201).send({ status: true, message: "content added successfully", data: content });
    } catch (error) {
        res.send(error);
    }
}

const getContent = async (req, res) => {
    try {
        const { page, limit, search } = req.query;

        let query = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: new RegExp(search, "i") } },
                    { description: { $regex: new RegExp(search, "i") } }
                ],
            };
        }

        let query1 = contentModel.find(query);

        if (page && limit) {
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);
            const startIndex = (pageNumber - 1) * limitNumber;
            query1 = query1.skip(startIndex).limit(limitNumber);
        }

        const content = await query1.exec();

        return res.status(200).send({ status: true, message: "content fetched successfully", data: content });
    } catch (error) {
        res.send(error);
    }

}

const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const content = await contentModel.findById(id);
        if (!content) {
            return res.status(404).send({ status: false, message: "Content not found" });
        }
        return res.status(200).send({ status: true, message: "Content fetched successfully", data: content });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: "Internal server error" });
    }
}

module.exports = {
    postContent,
    getContent,
    getById
}