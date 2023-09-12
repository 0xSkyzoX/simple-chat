const express = require('express');
const Messages = require('../../models/message');
const get_message = express.Router();

// Get all Messages in the chat
get_message.get("/messages", async (req, res) => {
    const messages = await Messages.find();
    res.json({messages: messages})
})

module.exports = get_message