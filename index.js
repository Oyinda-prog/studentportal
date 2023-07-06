const express= require('express')
const app =express() 
const dotenv= require('dotenv')
dotenv.config()
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine","ejs")
let port =process.env.PORT
 require('./connection/mongoose.connection')
let studentsmodel= require('./model/student.model')
 
app.get("/",(req,res)=>{
    res.render("signup",{message:""})
})
app.get("/signinPage",(req,res)=>{
    res.render("signin",{message:""})
})
app.get("/dash",(req,res)=>{
    studentsmodel.find()
    .then((result)=>{
        console.log(result);
        res.render("dashboard",{result})
    })
})
app.post("/signup",(req,res)=>{
   studentform= new studentsmodel(req.body) ,
   console.log(studentform);
  studentform.save()
  .then((result)=>{
    if(result){
        res.redirect("/signinPage")
    }
  })
  .catch((err)=>{
    console.log(err);
    if(err.code==11000){
        res.render("signup",{message:"Duplicate users found"})
    }
    else{
        res.render("signup",{message:"Enter Details correctly"}) 
    }
  })
})
app.post("/signin",(req,res)=>{
    studentsmodel.findOne({
        email:req.body.email,
        password:req.body.password
    })
    .then((result)=>{
        if(result){
            res.redirect("/dash")
        }
        else{
            res.render("signin",{message:"User not found"})
        }
    })
})

app.post("/delete",(req,res)=>{
    studentsmodel.deleteOne({email:req.body.email})
    .then((result)=>{
       if(result){
        res.redirect("dash")
       }
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.post("/edit",(req,res)=>{
    studentsmodel.findOne({email:req.body.email})
     .then((result)=>{
        console.log(result);
        res.render("editboard",{info:result})
     })
})
app.post("/update",(req,res)=>{
    console.log(req.body);
    studentsmodel.updateOne({email:req.body.email},req.body)
    .then((result)=>{
       if(result){
        res.redirect("dash")
       }

    })
})
app.listen(port,()=>{
    console.log(`I am working on port ${port}`);
})