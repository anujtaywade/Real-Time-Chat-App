const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookiePraser = require("cookie-parser")
const http = require('http')
const {Server} = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
  }
})

io.on("connection",(socket)=>{
  console.log("a user connected",socket.id)

  socket.on("sendMessage",(data)=>{
  console.log("mesage recieved : ",data)


  socket.broadcast.emit ("receiver message : ",data)

  socket.on("disconnect",(socket)=>{
  console.log("a user disconnect",socket.id)

})
})
})





dotenv.config()

app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET","PUT","POST","DELETE"],
  credentials:true
}))

app.use(express.json())
app.use(cookiePraser());

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
app.use("/",require("./src/routes/conversationRouth"))
app.use("/",require("./src/routes/messageRouth"))


app.get('/', (req, res) => {
  res.send(`Backend is  running for ${__dirname}` )
})

const port = 7000
server.listen(port, () => {
  console.log(`running on http://localhost:${port} for ${__dirname}`)
})
