const express = require('express')
const About = require('../models/about')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const router = new express.Router()

// About Create
router.post('/api/about', auth, async (req, res) => {
    const about = new About({
        ...req.body,
        owner: req.user._id
    })

    try {
        const data = await About.find()
        if (data?.length >= 1) {
            return res.status(404).send({ 'success': false, 'message': 'About not be added more than 1' })
        }
        await about.save()
        res.status(201).send({ 'success': true, about })
    } catch (error) {
        res.status(400).send({ 'success': false, 'message': error.message })
    }
})

// Get Single About
router.get('/api/about/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const about = await About.findOne({ _id })

        if (!about) {
            return res.status(404).send({ 'success': false, 'message': 'Not found!' })
        }

        res.send({ 'success': true, about })
    } catch (error) {
        res.status(500).send({ 'success': false, 'message': error })
    }
})


// Get All About
router.get('/api/about', async (req, res) => {
    const limit = parseInt(req.query.limit) || 1;
    try {
        const about = await About.find({}).limit(limit);
        res.send({ 'success': true, about })
    } catch (error) {
        res.status(500).send({ 'success': false, 'message': error })
    }
})

// update About
router.patch('/api/about/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "resumelink"]

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ 'success': false, 'message': 'Error: Invalid updates' })
    }

    try {
        const about = await About.findOne({ _id: req.params.id, owner: req.user._id })

        if (!about) {
            return res.status(404).send({ 'success': false })
        }

        updates.forEach((update) => about[update] = req.body[update])

        await about.save()

        res.status(200).send({ 'success': true, about })
    } catch (error) {
        res.status(400).send({ 'success': false, 'message': error })
    }
})

// Delete About 
router.delete('/api/about/:id', auth, async (req, res) => {
    try {
        const about = await About.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!about) {
            return res.status(404).send({ 'success': false, 'message': 'About not found!' })
        }
        res.send({ 'success': true, about })
    } catch (error) {
        res.status(500).send({ 'success': false, 'message': error })
    }
})

module.exports = router