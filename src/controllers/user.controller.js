import {asyncHandler} from "../utils/asyncHandler.js"


const registerUser = asyncHandler( async(req,res)=>{
    // get user details from frontend
    // validation -- not empty and others
    // check if user already exists : username, email 
    // check for images, check for avatar(compulsory)
    // upload them to cloudinary, avatar if succe ssful  
    // create user object - create entry in db 
    // remove password and refresh token field from response 
    // check for user creation 
    // return response if user created : false


   const {fullName, username, email, password} =req.body
   console.log("email: ",email)
})

export {registerUser}