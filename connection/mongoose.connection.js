const mongoose= require('mongoose')
let port =process.env.PORT
let uri=process.env.URI
mongoose.connect(uri)
.then(()=>{
    console.log(`I have connected successfully on port ${port }`);
})