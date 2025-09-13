const jwt = require('jsonwebtoken')
const bcrypt = require ("bcrypt")
const user = require ('../models/user')


exports.signup = async (req,res) => {
    try {
        const {name, email, password} = req.body

    if(!name, !email, !password){
        return res.status(400).json({message:"All the feilds are mandatory"})
    }

    const existingUser = await user.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"Email Already in use"})
    }

    const hashedPass = await bcrypt.hash(password,10)

    const newUser = await user.create({name, email ,password:hashedPass})
    res.status(201).json({
        messge:"user created successfully",
        user :{
            id : newUser._id,
            name : newUser.name,
            email : newUser.email
        },
    })
    } catch (error) {
        console.log(error)
        res.status(201).json({message : "server error"})
    } 
}