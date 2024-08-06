const express=require("express");
var cors = require('cors');
const { connection } = require("./db");
const {prodrouter}=require("./Routes/Prodroute");
const app=express();

app.use(express.json());
app.use(cors());

app.use("/prod",prodrouter);

app.get("/",(req,res)=>{
    res.send("Home page");
});

app.listen(8080,async(req,res)=>{
    try {
        console.log("connecting...");
        await connection;
        console.log("connected");
    } catch (error) {
        console.log(error.message);
        res.send({"msg":error.message});
    }
});