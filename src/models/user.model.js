import mongoose ,{Schema} from "mongoose"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"



const userSchema = new Schema(
    {
        username:{
            type:String,
            required :true,
            unique : true ,
            lowercase:true,
            trim:true,
            index:true      //for making searching more accessible
        },
        email:{
            type:String,
            required :true,
            unique : true ,
            lowercase:true,
            trim:true,
        }, 
        fullame:{
            type:String,
            required :true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,        //cloudinary url just like aws services
            required :true, 
        },
        coverImage:{
            type:String         //cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        refreshtoken:{
            type:String,

        }
    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function(next){              //we use pre hook from mongoose
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password,10)
    next()  
})
userSchema.methods.isPasswordCorrect =async function (password) {
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName          //payloadName:databaseName
    })
}
userSchema.methods.generateRefreshToken = function(){

}


export const User = mongoose.model("User", userSchema)