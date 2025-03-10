const mongoose = require('mongoose')

mongoose
.connect('mongodb://127.0.0.1:27017/carryme')
.then(()=>{
    console.log("Connected")
})
.catch((err)=>{
    console.log("Error Occured" , err)
})

module.exports = mongoose.connection