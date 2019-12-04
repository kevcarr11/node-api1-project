// implement your API here
const express = require("express")
const db = require("./data/db")

const server = express()

server.use(express.json())

server.get("/users", (req, res) => {
  if (db) {
    res.json(db)
  } else {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
})