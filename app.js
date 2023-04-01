const express = require("express");
const ejs = require("ejs");
require("./api/db/connection");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.locals.baseURL = "";

// app use
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public")); // public klasörüne erişim
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views"));

//routers 
const ogrenciRouter = require("./src/routers/ogrenciRouter");
const ogretmenRouter = require("./src/routers/ogretmenRouter");
const loginRouter = require("./src/routers/loginRouter");
const sohbetRouter = require("./src/routers/sohbetRouter");
const sorularRouter = require("./src/routers/sorularRouter");

// routers use
app.use("/", loginRouter);
app.use("/login", loginRouter);
app.use("/ogrenci", ogrenciRouter);
app.use("/ogretmen", ogretmenRouter);
app.use("/sohbet", sohbetRouter);
app.use("/sorular", sorularRouter);

//api routers

// const registerApiRouter = require("./api/routers/registerApiRouter");
// const ogrenciApiRouter = require("./api/routers/ogrenciApiRouter");
// const ogretmenApiRouter = require("./api/routers/ogretmenApiRouter");
const userApiRouter = require("./api/routers/userApiRouter");
const siniflarApiRouter = require("./api/routers/siniflarApiRouter");

//api routers use 
// app.use("/api/register",registerApiRouter);
// app.use("/api/ogrenci",ogrenciApiRouter);
// app.use("/api/ogretmen",ogretmenApiRouter);
app.use("/api/user",userApiRouter);
app.use("/api/siniflar",siniflarApiRouter);
// port = 3000
app.listen(process.env.PORT, () => {
    console.log("Server "+process.env.PORT+" portundan çalışıyor");
})