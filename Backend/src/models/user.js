const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {nanoid} = require('nanoid')

const userSchema = new mongoose.Schema(
    {
        name : {
        type : String,
        required : true,
        trim : true} ,
    
    
        email : {
        type :String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true},
    
        password : {
            type : String,
            required : true,
            minlength : 6
        },
        
            uniqueID :{
                type : String,
                unique : true,
                default : ()=>nanoid(8)
            },

         friends : [{
            type : mongoose.Schema.Types.ObjectId, ref:"user"
         }]
        
    },
    {timestamps : true},
   
)

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()
        this.password= await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.matchpassword =async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword,this.password)
}

module.exports = mongoose.model("user",userSchema)