const express = require('express')
const User = require('../models/user')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const multer = require('multer')
const router = new express.Router()
const { sendWelcomeEmail, sendResetEmail } = require('../emails/account')


router.get('/', (req, res) => {
    res.send('<h1>Welcome to my Portflio Server App!</h1>')
})

// User Create
router.post('/api/users', async (req, res) => {
    const user = new User(req.body)

    try {
        const data = await User.find()
        if (data?.length >= 1) {
            return res.status(404).send({ 'success': false, 'message': 'User not be added more than 1' })
        }

        await user.save()
        // sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Reset Password
router.get('/api/password-reset/:email', async (req, res) => {
    const userEmail = req.params.email
    try {
        const user = await User.find({ email: userEmail })
        if (user.length === 0) {
            return res.status(404).send({ 'message': 'Email not exist' })
        }
        sendResetEmail(user[0].email, user[0].name, user[0]._id)

        res.status(200).send({ 'success': true, 'user': user[0] })
    } catch (error) {
        res.status(400).send({ 'success': false, 'message': error })
    }
})

// User Login
router.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ 'success': true, user, token })

    } catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message })
    }
})

// User Logout
router.post('/api/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send('User logout successfully!')
    } catch (error) {
        res.status(500).send(error)
    }
})

// User Logout from all session
router.post('/api/users/v1/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// Get Single User
router.get('/api/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Get Profile
router.get('/api/users/v1/me', auth, async (req, res) => {
    res.send(req.user)
})

// Get All Users
router.get('/api/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Update User/ Profile
router.patch('/api/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Error: Invalid updates')
    }

    try {
        // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // if(!user){
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Change Password
router.patch('/api/change-password/:id', async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)

    const allowedUpdates = ["password"]

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ 'success': false, 'message': 'Invalid updates' })
    }

    try {
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send({ 'success': false, 'message': 'Something went wrong!' })
        }

        res.status(200).send({ 'success': true, user })
    } catch (error) {
        res.status(400).send({ 'success': false, 'message': error })
    }
})

// Delete User 
router.delete('/api/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

// upload file
const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an Image!'))
        }

        cb(undefined, true)
    }
})

// upload profile avatar
router.post('/api/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    // req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Delete avatar
router.delete('/api/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/api/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user | !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router