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
        fullName:{
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
        refreshToken:{
            type:String,

        }
    },
    {
        timestamps:true
    }
)


//For password encryptio
userSchema.pre("save",async function(next){              //we use pre hook from mongoose to apply something before doing something
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,10)
    next()  
})
userSchema.methods.isPasswordCorrect =async function (password) {
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName,          //payloadName:databaseName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id       //payloadName:databaseName
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY  
        }
    )
}


export const User = mongoose.model("User", userSchema)