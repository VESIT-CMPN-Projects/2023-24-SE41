const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userName: String,
    userComment: String,
    replies: [{
        userName: String,
        replyText: String
    }]
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;







/*
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/Comment'); // Assuming your model file is named Comment.js and located in the models folder

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/reviewApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/comments', async (req, res) => {
    try {
        const { userName, userComment } = req.body;
        const comment = new Comment({ userName, userComment });
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
*/