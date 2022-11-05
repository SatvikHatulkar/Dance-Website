const express = require("express");
const path= require("path");
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
main().catch(err => console.log(err));
async function main() {
mongoose.connect('mongodb://localhost:27017/contactDance');}
const app=express();
const port= 8000;


// mongoose
const infoSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    consern: String
});

const Information = mongoose.model('Information', infoSchema);

app.use("/static", express.static("static"))
app.use(express.urlencoded())
app.set("views engine", "pug")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req,res)=>{
    const params={}
    res.status(200).render("home.pug",params);
});
app.get("/contactus", (req,res)=>{
    const params={}
    res.status(200).render("contactus.pug",params);
});
app.post("/contactus", (req,res)=>{
    const myData = new Information(req.body);
    myData.save().then(()=>{
        res.send("Your data has been saved in contactDance database in 'Information' named collection ")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    });
});

app.listen(port, ()=>{
 console.log(`The applicatimon started successfully on the port ${port}`)});