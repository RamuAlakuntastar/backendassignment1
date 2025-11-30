
const UserModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const promisify = require("util").promisify;
const JWT_SECRET = "mysecretkey"
const promisifyJwtSign = promisify(jwt.sign);







const signController = async function(req, res) {
    try{
        const user = req.body 
        const newUser = await UserModel.create(user)
    
        res.status(200).json({
            status:"success",
            message:"User signed up successfully",
            newUser
        })
    }catch(err) {
        res.staus(500).json({
            status:"failure",
            message:err.message
        })
    }
}

const loginController = async function(req, res) {
    try {
        const {email, password} = req.body 
        const user = await UserModel.findOne({email})

        if(user) {
            let   areEqual = password === user.password       
            if(areEqual) {
                const token = await promisifyJwtSign({id:user["id"]}, JWT_SECRET)
                res.cookie("jwt", token, {maxAge: 20*60*10000 , httpOnly:true, path:"/"})
                res.status(200).json({
                    status:"success",
                    message:"User logged in successfully"
                })
            }
        }
    }catch(err) {
          res.status(500).json({
            status:"failure",
            message:err.message
        })
}}


module.exports = {
    signController,
    loginController
}