const express = require('express')
const Achievement = require('../models/achievement')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const router = new express.Router()
const multer = require('multer')

// Achievement Create
router.post('/api/achievement', auth, async (req, res) => {
    const achievement = new Achievement({
        ...req.body,
        owner: req.user._id
    })

    try {
        await achievement.save()
        res.status(201).send({ 'success': true, achievement })
    } catch (error) {
        res.status(400).send({ 'success': false, 'message': error.message })
    }
})

// // upload file
// const upload = multer({
//     // dest: 'avatars',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload an Image!'))
//         }

//         cb(undefined, true)
//     }
// })

// // upload project thumbnail
// router.post('/api/project/:id/thumbnail', auth, upload.single('thumbnail'), async (req, res) => {
//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
//     const project = await Project.findById(req.params.id)
//     project.thumbnail = buffer
//     // req.user.avatar = req.file.buffer
//     await project.save()
//     res.send({ 'success': true, 'message': 'Thumbnail uploaded successfully!' })
// }, (error, req, res, next) => {
//     res.status(400).send({ 'success': false, 'message': error.message })
// })

// // Delete thumbnail
// router.delete('/api/project/:id/thumbnail', auth, async (req, res) => {
//     const project = await Project.findById(req.params.id)
//     project.thumbnail = undefined
//     await project.save()
//     res.send({ 'success': true, 'message': 'Thumbnail deleted!' })
// })

// // Get Project thumbnail
// router.get('/api/project/:id/thumbnail', async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id)

//         if (!project | !project.thumbnail) {
//             throw new Error({ 'success': false })
//         }
//         res.set('Content-Type', 'image/png')
//         res.send(project.thumbnail)
//     } catch (error) {
//         res.status(404).send({ 'success': false, 'message': error })
//     }
// })

// Get Single achievement
router.get('/api/achievement/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const achievement = await Achievement.findOne({ _id })

        if (!achievement) {
            return res.status(404).send({ 'success': false, 'message': 'Not found!' })
        }

        res.send({ 'success': true, achievement })
    } catch (error) {
        res.status(500).send({ 'success': false, 'message': error })
    }
})


// Get All achievement
router.get('/api/achievement', async (req, res) => {

    try {
        const achievement = await Achievement.find({})
        res.send({ 'success': true, achievement })
    } catch (error) {
        res.status(500).send({ 'success': false, 'message': error })
    }
})

// update achievement
router.patch('/api/achievement/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["title", "description", "hostedby", "certificatelink"]

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ 'success': false, 'message': 'Error: Invalid updates' })
    }

    try {
        const achievement = await Achievement.findOne({ _id: req.params.id, owner: req.user._id })

        if (!achievement) {
            return res.status(404).send({ 'success': false })
        }

        updates.forEach((update) => achievement[update] = req.body[update])

        await achievement.save()

        res.status(200).send({ 'success': true, achievement })
    } catch (error) {
        res.status(400).send({ 'success': false, 'message': error })
    }
})

// Delete achievement 
router.delete('/api/achievement/:id', auth, async (req, res) => {
    try {
        const achievement = await Achievement.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!achievement) {
            return res.status(404).send({ 'success': false, 'message': 'Achievement not found!' })
        }
        res.send({ 'success': true, achievement })
    } catch (error) {
        res.status(500).send({ 'success': false, 'message': error })
    }
})

module.exports = router