const express = require('express');
const Investment = require('../models/investment');
const router = express.Router();

// Get all investments
router.get('/', async (req, res) => {
    try {
        const investments = await Investment.find();
        res.json(investments);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get a single investment by ID
router.get('/:id', async (req, res) => {
    try {
        const investment = await Investment.findById(req.params.id);
        if (!investment) {
            return res.status(404).send('Investment not found');
        }
        res.json(investment);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create a new investment
router.post('/', async (req, res) => {
    try {
        const newInvestment = new Investment(req.body);
        await newInvestment.save();
        res.status(201).json(newInvestment);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update an investment by ID
router.put('/:id', async (req, res) => {
    try {
        const investment = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!investment) {
            return res.status(404).send('Investment not found');
        }
        res.json(investment);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete an investment by ID
router.delete('/:id', async (req, res) => {
    try {
        const investment = await Investment.findByIdAndDelete(req.params.id);
        if (!investment) {
            return res.status(404).send('Investment not found');
        }
        res.send('Investment deleted');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
