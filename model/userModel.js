import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        dateOfBirth:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        },
        security:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        zipcode:{
            type:Number,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        


    },
    {timestamps:true}
)
const userModel = mongoose.model("users",userSchema);
export default userModel;