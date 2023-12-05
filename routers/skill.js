const express = require('express')
const Skill = require('../models/skill')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const router = new express.Router()

// Skill Create
router.post('/api/skills', auth, async (req, res) => {
    const skill = new Skill({
        ...req.body,
        owner: req.user._id
    })

    try {
        const data = await Skill.find()
        if (data?.length >= 1) {
            return res.status(404).send({ 'success': false, 'message': 'Skill not be added more than 1' })
        }
        await skill.save()
        res.status(201).send({ 'success': true, skill })
    } catch (error) {
        res.status(400).send({ 'success': false, 'message': error.message })
    }
})

// Get Single Skill
router.get('/api/skill/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const skill = await Skill.findOne({ _id })

        if (!skill) {
            return res.status(404).send({ 'success': false, 'message': 'Not found!' })
        }

        res.send({ 'success': true, skill })
    } catch (error) {
        res.status(500).send({ 'success': false, 'message': error })
    }
})


// Get All Skill
router.get('/api/skills', async (req, res) => {
    const limit = parseInt(req.query.limit) || 1;
    try {
        const skill = await Skill.find().limit(limit);
        // const skill = await Skill.find({})
        res.send({ 'success': true, skill })
    } catch (error) {
        res.status(500).send({ 'success': false, 'message': error })
    }
})

// update skill
router.patch('/api/skills/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["title1", "title2", "description1", "description2", "skill1", "skill2", "tools1", "tools2"]

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ 'success': false, 'message': 'Error: Invalid updates' })
    }

    try {
        const skill = await Skill.findOne({ _id: req.params.id, owner: req.user._id })

        if (!skill) {
            return res.status(404).send({ 'success': false })
        }

        updates.forEach((update) => skill[update] = req.body[update])

        await skill.save()

        res.status(200).send({ 'success': true, skill })
    } catch (error) {
        res.status(400).send({ 'success': false, 'message': error })
    }
})

// Delete Skill 
router.delete('/api/skills/:id', auth, async (req, res) => {
    try {
        const skill = await Skill.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!skill) {
            return res.status(404).send({ 'success': false, 'message': 'Skill not found!' })
        }
        res.send({ 'success': true, skill })
    } catch (error) {
        res.status(500).send({ 'success': false, 'message': error })
    }
})

module.exports = router