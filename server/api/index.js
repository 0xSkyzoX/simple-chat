const create_message = require("./messages/create");
const get_message = require("./messages/get");
const api = require("express").Router();

api.get("/", (req, res) => {
    res.send("Hello World!")
})

api.use('/', create_message)
api.use('/', get_message)


module.exports = api