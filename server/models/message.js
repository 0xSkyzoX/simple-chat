const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({content: String, date: String})

const Messages = mongoose.model("messages", messageSchema);

module.exports = Messages