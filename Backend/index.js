const express = require('express')
const { route } = require('./src/routes/authRouth')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{
   useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
  console.log("connected to mongoDB")
})
.catch((error)=>{
  console.log("mongoDN connection Error",error)
})

app.use("/auth",require("./src/routes/authRouth"))

app.get('/', (req, res) => {
  res.send(`Backend is  running for ${__dirname}` )
})

const port = 7000
app.listen(port, () => {
  console.log(`running on http://localhost:${port}`)
})
