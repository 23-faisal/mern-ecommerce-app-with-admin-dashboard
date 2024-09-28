import { v2 as cloudinary } from "cloudinary";
import multer from "multer"; 
import "dotenv/config";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to handle file upload to Cloudinary
const handleUpload = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error); // Reject the promise if an error occurs
        } else {
          resolve(result); // Resolve with the result on success
        }
      }
    );
    // Write the file buffer to the stream
    stream.end(file.buffer);
  });
};

export { upload, handleUpload };
