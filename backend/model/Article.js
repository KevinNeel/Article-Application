import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Article = mongoose.model('Article', articleSchema);

export default Article;
