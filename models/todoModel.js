import pkg from 'mongoose';
const { model, Schema } = pkg;



const todoSchema = new Schema({
    title: String,
    author: String,
    key: String,
    haveRead: Boolean,
    wantRead: Boolean,



})


export default model("todoSchema", todoSchema);