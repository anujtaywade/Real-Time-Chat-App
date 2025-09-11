const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        name : {String,
        require : true,
        trim : true} ,
    
    
        email : {
        type :String,
        require : true,
        unique : true,
        lowercase : true,
        trim : true},
    
        password : {
            type : String,
            require : true,
            minlength : 6
        },
    },
    {timestamps : true}
)

userSchema.pre("save",async function name(next) {
    if(this.isModified("password")) return next()
        this.password= await bcrypt.hash(this.password,10)
    next();
})

userSchema.method.matchpassword =async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword,this.password)
}

module.exports = mongoose.model("user",userSchema)