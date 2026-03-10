const express = require('express')
const router = express.Router()

const Expense = require('../Models/expenses')
const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/expenses', authMiddleware, async (req, res) => {
    try {
        const { title, amount, category, date } = req.body

        if (!title || !amount || !category || !date) {
            return res.status(400).json({ message: 'All fields are required'})
    }

    const expense = await Expense.create({
        title,amount,category,date, user:req.user.id
    })

    res.status(201).json(expense)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

router.get('/expenses', authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id}).sort({ createdAt: -1})

        res.json(expenses)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})



router.delete('/expenses/:id', authMiddleware, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id)

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' })
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' })
        }

        await expense.deleteOne()

        res.status(200).json({ message: 'Expense deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'failed to delete expense' })
    }
})

router.put('/expenses/:id', authMiddleware, async (req, res) => {
    try {
        const { title, amount, category, date} = req.body

        const expense = await Expense.findById(req.params.id)

        if (!expense) {
            return res.status(404).json({ message: 'Expense not fpund'})
        }
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        expense.title = title ?? expense.title
        expense.amount = amount ?? expense.amount
        expense.category = category ?? expense.category
        expense.date = date ?? expense.date

        const updatedExpense = await expense.save()
        res.status(200).json(updatedExpense)
    } catch (error) {
        res.status(500).json({ message: 'Failed to update expense' })
    }
})

module.exports = router