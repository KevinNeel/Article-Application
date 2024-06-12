//Model
import Article from '../model/Article.js';

export const getAllArticle = async (req, res) => {
    try {

        const allArticle = await Article.find();

        res.status(200).json(allArticle);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}

export const getArticleByUserId = async (req, res) => {
    try {

        const userId = req.userId

        const userArticle = await Article.find({ userId: userId }).lean();

        res.status(200).json(userArticle);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}

export const getArticle = async (req, res) => {
    try {
        const articleId = req.params.id
        const article = await Article.findById(articleId);

        res.status(200).json(article);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}

export const createArticle = async (req, res) => {
    try {
        const userId = req.userId
        const data = req.body

        if (data.title == "" || data.description == "" || data.category == "" || data.slug == "") return res.status(409).json({ message: "Fill all the fields" })

        const newArticle = await Article.create({
            ...data, userId: userId
        })

        await newArticle.save();

        res.status(201).json({ message: "Article Created" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const updateArticle = async (req, res) => {
    try {

        let userId = req.userId;
        let id = req.params.id
        let data = req.body

        const updatedArticle = await Article.findOneAndUpdate({ _id: id, userId: userId }, data);

        if (!updatedArticle) return res.status(409).json({ message: "You don't have access to update the article" })

        res.status(202).json({ message: "Article Updated" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}

export const deleteArticle = async (req, res) => {
    try {

        const id = req.params.id;
        console.log(id);
        const artilce = await Article.findByIdAndDelete(id);
        return res.status(200).json({ message: "Article deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}


