const express = require('express');
const Messages = require('../../models/message');
const create_message = express.Router();

const WebSocket = require('ws');

const socket = new WebSocket.Server({port: 4000})

// Create a new Message

create_message.post("/messages", async (req, res) => {
    const request = req.body;
    console.log(request)
    socket.clients.forEach((ws) => {
        ws.send(JSON.stringify(request))
    })
    const newMessage = new Messages(request);
    await newMessage.save();
    
})


module.exports = create_message