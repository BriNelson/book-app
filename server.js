import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import bookSchema from "./models/bookModel.js"
import { port, mongoUri } from './config.js'
console.log(`Your port is ${port}`);
const app = express();
// const port = 3000;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
    
})
  .then(() => {
  console.log('Connected Successfully')
})
.catch(console.error)

 app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('C:/Users/ladof/Desktop/3760/book app')); ////enviorment variable needs to go here

// app.get("/booksRead", (req, res) => {
//     res.json(booksRead)
//   res.send(req.params)
    
//   })
    
  
  
  app.post("/bookRead", (req, res) => {
    // const todo = req.body
    const bookSave = new bookSchema({
       
      title: req.body.title,
      author: req.body.author,
      key: req.body.key,
      haveRead: false,
      wantRead: false,
      
  
    })
    bookSave.save().then((result) => { console.log(result) });
  })

  app.post("/wantRead", (req, res) => {
    // const todo = req.body
    const bookSave = new bookSchema({
       
      title: req.body.title,
      author: req.body.author,
      key: req.body.key,
      haveRead: false,
      wantRead: false,
      
  
    })
    bookSave.save().then((result) => { console.log(result) });
  })




app.listen(port, () => console.log(port))