import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null; // Check if file path exists
        
        // Upload a file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically detect resource type (image, video, etc.)
        });
        
        // File uploaded successfully
        console.log("File has been uploaded successfully", response.url);
        return response;
        
    } catch (error) {
        console.error("Error during Cloudinary upload:", error); // Log the error
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Remove the local file if it exists
        }
        return null;
    }
};

export { uploadOnCloudinary };
