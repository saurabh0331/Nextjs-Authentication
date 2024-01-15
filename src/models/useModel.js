import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : [true , "Please Provide username"],
        unique : true 
    },

    email : {
        type : String ,
        required : [true , "Please Provide email"],
        unique : true
    },

    password : {
        type : String ,
        required : [true , "Please Provide Password"]
    },

    isVerified : {
        type : Boolean,
        default : false
    },

    isAdmin : {
        type : Boolean,
        default : false
    },

    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken  : String,
    verifyTokenExpiry : Date

})



const User = mongoose.models.users || mongoose.model("users" , userSchema)

 export default User;