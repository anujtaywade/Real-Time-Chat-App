const jwt = require('jsonwebtoken')
const bcrypt = require ("bcrypt")
const user = require ('../models/user')
const {nanoid} = require('nanoid')


exports.signup = async (req,res) => {
    
    try {
        
        const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({message:"All the feilds are mandatory"})
    }

    const existingUser = await user.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"Email Already in use"})
    }

    const hashedPass = await bcrypt.hash(password,10)

    const uniqueID = nanoid(8) ;

    const newUser = await user.create({name, email ,password:hashedPass,uniqueID})
    res.status(201).json({
        messge:"user created successfully",
        user :{
            id : newUser._id,
            name : newUser.name,
            email : newUser.email,
            createdAt : newUser.createdAt,
            uniqueID : newUser.uniqueID
          
        },
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "server error"})
    } 
}

exports.login = async (req,res) => {
    try {
        const {email,password} = req.body;
       
    if (!email || !password){
        return res.status(404).json({message : "above fields are required"})
    }

    const existingUser = await user.findOne({email})
    if(!existingUser ){
        return res.status(404).json({message : "user not found"})
    }
    const isMatch =await bcrypt.compare(password,existingUser.password)
    if(!isMatch){
        return res.status(401).json({message : "password does not match"})
    } 

    if(isMatch){
        const token = jwt.sign(
            {id:existingUser._id, email: existingUser.email, name:existingUser.name , createdAt:existingUser.createdAt ,uniqueID:existingUser.uniqueID},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES}
        )
        res.status(200).json({message : "login successful",
            token,
             user:{
                id:existingUser._id,
                email:existingUser.email,
                name:existingUser.name,
                createdAt : existingUser.createdAt,
                uniqueID :existingUser.uniqueID
            }
        })
    

    }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"unable to login"})
    }
} 

exports.logout=async (req,res) => {
    try {
        res.status(401).json({message:"logout successful"})

    } catch (error) {
        console.log(error)
        res.status(201).json({message:"server error"})
    }
}

exports.profile= async (req,res) => {
    try {
        res.json({
            message:"you are authorised",
            user:req.user,
        })

    } catch (error) {
        console.log(error,"cannot access profile")
        res.status(500).json({message:"server error"})
    }
}
