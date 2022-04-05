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
    if (subject.trim() === '' && text.trim() === '') {
        res.render('add', { error: true })
    } else {
        fs.readFile('./data/notes.json', (err, data) => { 
            if (err) throw err

            const notes = JSON.parse(data)

            notes.push({
                id: id (),
                subject: subject,
                text: text,
            })
        fs.writeFile('./data/notes.json', JSON.stringify(notes), err => {
            if (err) throw err

            res.render('add', { success: true })
        })
        })
    }
})
const notes = ['this is cringe subject', 'this is cringe subject 2']

app.get('/notes', (req, res) => {
    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err

        const notes = JSON.parse(data)

        res.render ('notes', { notes : notes })
    })
    
})

app.get('/notes/:id', (req, res) => {
    const id = req.params.id
    res.render ('detail')
})
app.listen(8000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 8000')
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }