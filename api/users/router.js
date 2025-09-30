const express = require('express')
const User = require('./model')
const router = express.Router()

// [POST] /api/users
router.post('/', async (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
        return res.status(400).json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" })
    }
    try {
        const newUser = await User.insert({ name, bio })
        res.status(201).json(newUser)
    } catch {
        res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" })
    }
})

// [GET] /api/users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch {
        res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" })
    }
})

// [GET] /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
        }
        res.json(user)
    } catch {
        res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" })
    }
})

// [DELETE] /api/users/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await User.remove(req.params.id)
        if (!deleted) {
            return res.status(404).json({ message: "Belirtilen ID li kullanıcı bulunamadı" })
        }
        res.json(deleted)
    } catch {
        res.status(500).json({ message: "Kullanıcı silinemedi" })
    }
})

// [PUT] /api/users/:id
router.put('/:id', async (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
        return res.status(400).json({ message: "Lütfen kullanıcı için name ve bio sağlayın" })
    }
    try {
        const updated = await User.update(req.params.id, { name, bio })
        if (!updated) {
            return res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
        }
        res.json(updated)
    } catch {
        res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" })
    }
})

module.exports = router
