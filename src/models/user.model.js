import mongoose ,{Schema}from "mongoose";
import jwt from "jsonwebtoken"//tokens jwt is a beerer token its like a key
import bcrypt from "bcrypt"//encryption

const userSchema = new Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true//if this feild is searched a lot
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true 
    },
    fullname:{
        type: String,
        required:true,
        unique:true,
        index:true
    },
    avatar:{
        type:String,//cloudinary url
        required:true
    },
    coverImage:{
        type:String,
    },
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type: String,
        required:[true,'Password is must!!']
    },
    refreshToken:{
        type:String
    },
},{timestamps:true})

userSchema.pre("save",async function (next/*middleware must have next*/) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
   return /* it takes time so we have to await same for async*/await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.genrateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

userSchema.methods.genrateRefreshToken = function(){}


export const user = mongoose.model("User",userSchema)