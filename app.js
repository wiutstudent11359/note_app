const express = require('express')
const app = express()

const fs = require('fs')
const { title } = require('process')

app.set('view engine', 'pug')

app.use('/static', express.static('public')) //assets
app.use(express.urlencoded({ extended: false }))

//localhost:8000
app.get('/', (req, res) => {
    res.render ('home')
})

app.get('/add', (req, res) => {
    res.render ('add')
})

app.post('/add', (req, res) => {
    const subject = req.body.subject
    const text = req.body.text
    if (title.trim() === '' && text.trim() === '') {
        res.render('add', { error: true })
    }
})
const notes = ['there was cringe subject', 'there was cringe subject 2']

app.get('/notes', (req, res) => {
    res.render ('notes', { notes : notes })
})

app.get('/notes/detail', (req, res) => {
    res.render ('detail')
})
app.listen(8000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 8000')
})