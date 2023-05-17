const express = require("express");
const socketio = require("socket.io");
const axios = require("axios");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
require("./api/db/connection");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.locals.baseURL = "";

// app use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // public klasörüne erişim
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views"));

//backend

//api routers

const userApiRouter = require("./api/routers/userApiRouter");
const siniflarApiRouter = require("./api/routers/siniflarApiRouter");
const derslerApiRouter = require("./api/routers/derslerApiRouter");
const sohbetApiRouter = require("./api/routers/sohbetApiRouter");
const todoApiRouter = require("./api/routers/todoApiRouter");
const sorularApiRouter = require("./api/routers/sorularApiRouter");
const hataMiddleware = require("./api/middlewares/hataMiddleware");

//api routers use 
app.use("/api/user", userApiRouter);
app.use("/api/siniflar", siniflarApiRouter);
app.use("/api/dersler", derslerApiRouter);
app.use("/api/sohbet", sohbetApiRouter);
app.use("/api/todo", todoApiRouter);
app.use("/api/sorular", sorularApiRouter);

//frontend ****************

//routers 
const anasayfaRouter = require("./src/routers/anasayfaRouter");
const ogrenciRouter = require("./src/routers/ogrenciRouter");
const ogretmenRouter = require("./src/routers/ogretmenRouter");
const loginRouter = require("./src/routers/loginRouter");
const sohbetRouter = require("./src/routers/sohbetRouter");
const sorularRouter = require("./src/routers/sorularRouter");
const profilRouter = require("./src/routers/profilRouter");
const todolistRouter = require("./src/routers/todolistRouter");
const security = require("./src/middlewares/security");


// routers use
app.use(security);
app.use("/giris", loginRouter);
app.use("/cikis", loginRouter);
app.use("/", anasayfaRouter);
app.use("/ogrenci", ogrenciRouter);
app.use("/ogretmen", ogretmenRouter);
app.use("/sohbet", sohbetRouter);
app.use("/sorular", sorularRouter);
app.use("/profil", profilRouter);
app.use("/todolist", todolistRouter);

app.use(hataMiddleware);

// port = 3000
const server = app.listen(process.env.PORT, () => {
    console.log("Server " + process.env.PORT + " portundan çalışıyor");
});

const io = socketio(server);

io.on("connection", (connectedSocket) => {
    // console.log(connectedSocket);
    connectedSocket.on("chat", (mesaj) => {
        console.log("chat listening...");
        // console.log(mesaj);
        io.emit("chat", mesaj);
    });

    connectedSocket.on("seen", async (mesaj) => {
        console.log("seen listening...");
        io.emit("seen", mesaj);
        const config = {
            params: mesaj
        };
        const result = await axios.get(process.env.BASE_URL+"/api/sohbet/seen",config);
    });

    connectedSocket.on("typing", (data) => {
        console.log("typing listening...");

        connectedSocket.broadcast.emit("typing", data);
    });
})


