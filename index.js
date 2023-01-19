const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://disappearing-chatroom.netlify.app",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.roomID).emit("receive_message", data);
    })

    socket.on("disconnect", () => {
        console.log(`USER DISCONNECTED: ${socket.id}`);
    })
})

server.listen(4000, () => {
    console.log("Listening on port 4000")
})