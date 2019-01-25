const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
   user_id: String,
   message_content: String,
   message_date: Number,
})

module.exports = mongoose.model('Message', messageSchema)