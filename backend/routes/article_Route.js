import express from 'express'
const article = express.Router();

import authMiddleWare from '../middleware/authMiddleware.js'

import { getAllArticle, getArticle, getArticleByUserId, createArticle, updateArticle, deleteArticle } from '../controller/article_Controller.js';


//Article
article.get('/getAllArticle',authMiddleWare, getAllArticle);
article.get('/getArticle/:id',authMiddleWare, getArticle);
// article.get('/myArticle', getArticleByUserId);
article.post('/createArticle',authMiddleWare, createArticle);
article.put('/updateArticle/:id',authMiddleWare, updateArticle);
article.delete('/deleteArticle/:id',authMiddleWare, deleteArticle);

export default article
