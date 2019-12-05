// implement your API here
const express = require("express")
const db = require("./data/db")

const server = express()

server.use(express.json())

server.get("/api/users", (req, res) => {
  db.find()
  .then((response) => {
    res.json(response)
  })
  .catch((err) =>  {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  })
  
})

server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
  .then((response) => {
        res.json(response)
  })
  .catch(() => {
      res.status(404).json({ message: "The user with the specified ID does not exist." })    
  })

})

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }

  const newUser = {
    id: String(db.length + 1),
    name: req.body.name,
    bio: req.body.bio,
  }

  db.insert(newUser)
  res.status(201).json(newUser)
})

server.delete("/api/users/:id", (req, res) => {
  const user = db.findById(req.params.id)
  
  if (user) {
    db.remove(req.params.id)
    res.json(user)
  } if (!user) {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed" })
  }
})

server.put("/api/users/:id", (req, res) => {
  const user = db.findById(req.params.id)

  const updatedUser = {
    name: req.body.name,
    bio: req.body.bio,
  }

  if (!user) {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  } if (!req.body.name || !req.body.bio) {
     res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } if (user && req.body.name && req.body.bio) {
    db.update(req.body.id, updatedUser)
    res.status(200).json(updatedUser)
  } else {
    res.status(500).json({ errorMessage: "The user information could not be modified." })
  }
})

const port = 3000
const host = "127.0.0.1"

server.listen(port, host, () => {
  console.log(`Sever running at http://${host}:${port}`)
})