const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const CommentModel = require('./models/Comment'); // Change the import path to match your file structure

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/reviewApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/comments', async (req, res) => {
    try {
        const { userName, userComment } = req.body;
        const comment = new CommentModel({ userName, userComment });
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/comments/:id/reply', async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, replyText } = req.body;
        const comment = await CommentModel.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        comment.replies.push({ userName, replyText });
        const savedComment = await comment.save();
        res.status(200).json(savedComment.replies[savedComment.replies.length - 1]);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/comments', async (req, res) => {
    try {
        const comments = await CommentModel.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const Comment = require('./models/Comment');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost:27017/reviewApp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// const commentSchema = new mongoose.Schema({
//     userName: String,
//     userComment: String,
//     replies: [{
//         userName: String,
//         replyText: String
//     }]
// });

// const CommentModel = mongoose.model('Comment', commentSchema);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// app.post('/comment', async (req, res) => {
//     try {
//         const { userName, userComment } = req.body;
//         const comment = new CommentModel({ userName, userComment });
//         const savedComment = await comment.save();
//         res.status(201).json(savedComment);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// app.post('/comment/:id/reply', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { userName, replyText } = req.body;
//         const comment = await CommentModel.findById(id);
//         if (!comment) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }
//         comment.replies.push({ userName, replyText });
//         const savedComment = await comment.save();
//         res.status(200).json(savedComment.replies[savedComment.replies.length - 1]);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// app.get('/comments', async (req, res) => {
//     try {
//         const comments = await CommentModel.find();
//         res.status(200).json(comments);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
