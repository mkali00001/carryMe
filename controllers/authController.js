const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let generateToken = require('../utils/generateToken')
module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;
        let existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
           res.send("Email already exists!")
        }else{
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.send(err.message)
                } else {

                    let user = await userModel.create({
                        email,
                        password : hash,
                        fullname
                    })

                    let token =  generateToken(user)
                    res.cookie("token", token)
                    res.send("user created successfully!")
                }
            })
        })}


    }
    catch (err) {
        console.log("catch", err.message)
    }
}


module.exports.loginUser = async(req,res)=>{
    let {email, password} = req.body;
    let user = await userModel.findOne({email:email})
    if(!user) return res.status(501).send("Email or passwprd is incorrect")
    bcrypt.compare(password, user.password, function (err, result){
        if(result){
            let token = generateToken(user)
            res.cookie("token", token)
            res.send("You can login")
        }
        else{
            res.send("Email or password is incorrect")
        }
    })
}