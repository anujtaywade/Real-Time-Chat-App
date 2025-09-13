const express = require('express')
const { route } = require('./src/routes/authRouth')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

app.use("/authRouth",require("./src/routes/authRouth"))

app.get('/', (req, res) => {
  res.send('Backend is  running')
})

const port = 7000
app.listen(port, () => {
  console.log(`running on http://localhost:${port}`)
})
