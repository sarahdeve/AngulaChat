const express = require("express");
const path = require('path');
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const URI =  "mongodb+srv://Sarah:1Wemimoruth@cluster0.heizo.mongodb.net/node2_db?retryWrites=true&w=majority";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

mongoose.connect(URI, (err) => {
    if(err){
        console.log(err)
        console.log(`Mongoose no gree onnectc`)
    } else {
        console.log(`Mongoose has connected us successfully`)
    }
})

let userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String
})

let userModel = mongoose.model("users_table", userSchema)

app.get('/', (req, res) => {
    userModel.find((err, result) => {
        if(err) {
            console.log(`We could not get data`)
        } else {
            console.log(result)
            res.render("index", {allStudents:result, message:''})
        }
    })
})
   

app.post('/register', (req, res) => {
    const userDetails = req.body
    console.log(userDetails)
    userModel.find({email:req.body.email}, (err, result) =>{
        if(err) {
            console.log(`error dey`)
        } else {
            if(result.length > 0) {
                console.log(result)
                let msg = "email already exists"
                res.render("index", {message:msg})
                // setTimeout(message, 2000)
            } else {
                let form = new userModel(userDetails)
                form.save((err) => {
                    if(err) {
                        console.log(`Data no gree save`)
                    } else {
                        res.redirect("/")
                    }
                })
            }
        }
    })
})

// const message = () => {
//     document.getElementById("")
// }

app.post("/reg", (req, res) => {
    const userDetail = req.body
    userModel.find({emial:req.body.email, password:req.body.password}, (err, result) => {
        if (err) {
            console.log(`error dey`)
        } else {
            if (result.length > 0) {
                console.log(result)
                res.redirect('/real')
            }else {
            res.redirect("/")
        }
        } 
    })
    // const userDetail = req.body
    // userModel.find({emial:req.body.email}, (err, result) => {
    //     if (err) {
    //         console.log(`error dey`)
    //     } else {
    //         if (!email) {
    //             console.log(result)
    //             res.redirect('index')
    //         } else { 
    //             if (err) {
    //                 console.log(`error dey`)
    //             } else {
    //                 if (email) {
    //                     console.log(result)
    //                     res.redirect('/real')
    //                 }
    //             }
    //         }
    //     }
        
    // })
})

app.post('/logout', (req, res) => {
    try{
        console.log(req.user)
        // req.user.token = []
        // res.clearCookie('')
        // res.render('index')
        res.redirect('/')
    } catch(error) {
        res.status(500).send(error)
    }
})

app.listen('5000', ()=> {
    console.log(`Hello world`);
})

app.get('/', (req, res) => {
    res.render("index")
    // res.sendFile(path.join(__dirname + '/real.ejs'))
})

app.get('/real', (req, res) => {
    res.render("real")
    // res.sendFile(path.join(__dirname + '/real.ejs'))
})