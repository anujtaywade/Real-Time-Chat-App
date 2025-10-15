const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./src/models/message');

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);


  socket.on("joinRoom", (roomId) => {
    
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

socket.on("sendMessage", (data) => {
  try {
    console.log("Message received:", data);
    
   
    socket.to(data.conversationId).emit("receiveMessage", data);
    
  } catch (error) {
    console.log("Error broadcasting message:", error);
  }
});


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));


app.use("/auth", require("./src/routes/authRouth"));
app.use("/", require("./src/routes/conversationRouth"));
app.use("/", require("./src/routes/messageRouth"));
app.use("/",require("./src/routes/addFriendsRouth"))

app.get('/', (req, res) => {
  res.send("Backend is running");
});


const PORT = process.env.PORT || 7000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
