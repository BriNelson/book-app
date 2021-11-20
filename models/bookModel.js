import pkg from 'mongoose';
const { model, Schema } = pkg;



const bookSchema = new Schema({
    
    title: String,
    author: String,
    key: String,
    haveRead: Boolean,
    wantRead: Boolean,



})


export default model("bookSchema", bookSchema);