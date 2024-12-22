const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "public")))


io.on("connection", (socket)=> {
    console.log("Connected");

    socket.on("send-location", (data)=> {
        io.emit("receive-location", {id: socket.id, ...data})
    })

    socket.on("disconnect", ()=> {
        socket.emit("user-disconnected", socket.id)
    })
    
})




app.get("/", function (req, res){
    res.render("index")
});

server.listen(4000, ()=> {
    console.log(`server started on port ${4000}`);
    
})