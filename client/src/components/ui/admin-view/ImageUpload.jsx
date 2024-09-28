import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  setFormData,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const dragFile = e.dataTransfer.files?.[0];
    if (dragFile) setImageFile(dragFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dragFile = e.dataTransfer.files?.[0];
    if (dragFile) setImageFile(dragFile);
  };

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response?.data?.success) {
      const imageUrl = response.data?.uploadResult?.url;
      setUploadedImageUrl(imageUrl);
      setFormData((prevFormData) => ({ ...prevFormData, image: imageUrl }));
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div>
      <div className="w-full max-w-md mx-auto ">
        <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-lg p-4 mt-4 "
        >
          <Input
            id="image-upload"
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleImageFileChange}
          />
          {!imageFile ? (
            <>
              <Label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center h-32 mb-2 gap-2 cursor-pointer"
              >
                <UploadCloudIcon className="w-10 h-10 text-muted-foreground" />
                <span className="  text-muted-foreground">
                  Drag & drop or click to upload image
                </span>
              </Label>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Product preview"
                className="w-full h-auto max-h-64 object-cover rounded-lg"
              />
              <Button
                onClick={() => setImageFile(null)}
                className="mt-4"
                variant="outline"
              >
                Remove Image
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImageUpload;
