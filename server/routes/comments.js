const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.post("/", async (req, res) => {
    try {
        const { investmentId, content } = req.body; // Usunięcie userEmail z destrukturyzacji

        const userEmail = req.body.userEmail; // Pobranie adresu e-mail z żądania

        if (!userEmail) {
            return res.status(400).json({ message: "User email is required" });
        }

        if (!investmentId || !content) {
            return res.status(400).json({ message: "Investment ID and content are required" });
        }

        const comment = new Comment({
            investmentId,
            userEmail,
            content,
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Pobieranie wszystkich komentarzy dla danej inwestycji
router.get('/:investmentId', async (req, res) => {
    try {
        const comments = await Comment.find({ investmentId: req.params.investmentId });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all comments for a specific user
router.get('/user/:email', async (req, res) => {
    try {
        const comments = await Comment.find({ userEmail: req.params.email });
        res.json(comments);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update a comment by ID
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.json(comment);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.send('Comment deleted');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;


module.exports = router;
