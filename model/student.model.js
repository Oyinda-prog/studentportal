const mongoose= require('mongoose')
let studentsSchema= new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
   email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
})
 let studentsmodel= mongoose.model("studentDetails",studentsSchema)
 module.exports=studentsmodel