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
    .catch((err) => {
      res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })

})

server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then((response) => {
      if (response) {
        res.json(response)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The user information could not be retrieved" })
    })
})

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body
  if (!name || !bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }

  db.insert({ name, bio })
    .then(response => {
      res.status(201).json(response)
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    })
})

server.delete("/api/users/:id", async (req, res) => {
  // db.findById(req.params.id)
  //   .then(response => {
  //     db.remove(response.id)
  //       .then((response) => {
  //         res.json(response)
  //       })
  //       .catch(() => {
  //         res.status(500).json({ errorMessage: "The user could not be removed" })
  //       })
  //   })
  //   .catch(() => {
  //     res.status(404).json({ message: "The user with the specified ID does not exist." })
  //   })
  try {
    const user = await db.find(req.params.id)
    if (!user) {
      return res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    } else {
      await db.remove(req.params.id)
      res.json(user)
    }
  } catch (err)  {
    res.status(500).json({ errorMessage: "The user could not be removed" })
  }
})

server.put("/api/users/:id", async (req, res) => {
  const { name, bio } = req.body
  if (!name || !bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }

  // db.findById(req.params.id)
  //   .then(user => {
  //     if (user) {
  //       return db.update(req.params.id, { name, bio })
  //     } else {
  //       res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
  //     }
  //   })
  //   .then(() => db.findById(req.params.id))
  //   .then(response => res.json(response))
  //   .catch(() => {
  //     res.status(500).json({ message: "The user information could not be modified." })
  //   })
    
  try {
    const user = await db.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    } else {
      await db.update(req.params.id, { name, bio })
      res.json(await db.findById(req.params.id))
    }
  } catch (err) {
    res.status(500).json({ message: "The user information could not be modified." })
  }

})

const port = 3000
const host = "127.0.0.1"

server.listen(port, host, () => {
  console.log(`Sever running at http://${host}:${port}`)
})