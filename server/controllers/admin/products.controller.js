import { handleUpload } from "../../config/cloudinary.js";

export const handleImageUploads = async (req, res) => {
  try {
    const uploadResult = await handleUpload(req.file);
    res.status(200).json({
      success: true,
      message: "Upload successful",
      uploadResult,
    });
  } catch (error) {
    res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
};
