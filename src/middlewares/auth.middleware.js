import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async(req, _,next)=>{
try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")            
        //Req.cookies() have access to all cookie because of the cookie parser package we used in app.js
        //Authorization is header use to access JWT tokens and Bearer<space><token> is a value to header to access it 
    
        if(!token){
            (401,"Unauthorized request")
        }
    
       const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
       const user = await User.findById(decodedToken?._id).select("-password -refreshToken")   //name of this (_id_ was set in user.model 
    
       if(!user){
        throw new ApiError(401,"Invalid Access Token")
       }
    
       req.user= user;
       next();      //this is important in middlware as it use to pass the function to next value or function after middlware
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token ")
}
})