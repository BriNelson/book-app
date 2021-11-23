import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import bookSchema from './models/bookModel.js'
import { port, mongoUri } from './config.js'
console.log(`Your port is ${port}`)
const app = express()
// const port = 3000;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true

})
  .then(() => {
    console.log('Connected Successfully')
  })
  .catch(console.error)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public')) /// /enviorment variable needs to go here

// app.get("/booksRead", (req, res) => {
//     res.json(booksRead)
//   res.send(req.params)

//   })

app.post('/haveRead', (req, res) => {
  // const todo = req.body
  const bookSave = new bookSchema({

    title: req.body.title,
    author: req.body.author,
    key: req.body.key,
    haveRead: req.body.haveRead,
    wantRead: req.body.wantRead

  })
  bookSave.save().then((result) => { console.log(result) })
})
// post want read to mongo DB
app.post('/wantRead', (req, res) => {
  // const todo = req.body
  const bookSave = new bookSchema({
    
    title: req.body.title,
    author: req.body.author,
    key: req.body.key,
    haveRead: req.body.haveRead,
    wantRead: req.body.wantRead

  })
  bookSave.save().then((result) => { console.log(result) })
})

if (port == null || port == '') {
  port = 8000
}

// read from data base
app.get('/wantReadList', (req, res) => {
  console.log('is endpoin working')
  bookSchema.find()
    // .exec()
    .then(docs => {
      // console.log(do)

      res.send(docs)
    })
  
  
})

app.delete('/:deleteRead', (req, res) => {
  const id = req.params.deleteRead
//  console.log(req)
  bookSchema.findByIdAndDelete({_id: id})
  .then(docs => {
    // console.log(do)
    
    
    res.send(docs)
  })

 })


app.listen(port)
