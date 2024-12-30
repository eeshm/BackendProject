import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //from node.js
import { ApiError } from "./ApiError.js";

// Configuration for cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary= async (localFilePath)=>{
    try {
        if(!localFilePath) return null 
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded
        // console.log("File is uploaded on cloudinary",response.url)      //url from cloudinary 
        fs.unlinkSync(localFilePath)
        return response


    } catch (error) {
        fs.unlinkSync(localFilePath)  // Remove the locally saved temporary file as the 
                                      //upload operation got failed!
        return null;
    }
}


const deleteFromCloudinary = async (localFilePath) => {
    try {
      // Extract the public ID from the URL
      const publicId = localFilePath.split('/').pop().split('.')[0]; // Assumes the public ID is the last segment before the file extension
  
      // Delete the image from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId);
  
      return result;
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      throw new ApiError(500, "Failed to delete the previous avatar");
    }
  };
 
export {uploadOnCloudinary,deleteFromCloudinary}