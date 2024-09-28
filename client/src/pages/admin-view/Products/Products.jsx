import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { useState } from "react";
import { addProductFormElement } from "@/config/config";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ProductImageUpload from "@/components/ui/admin-view/ImageUpload";

const initialForm = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit form data to backend here
  };

  // Render form inputs based on configuration
  const renderFormElement = (element) => {
    switch (element.componentType) {
      case "text":
      case "input":
        return (
          <Input
            type={element.type || "text"}
            name={element.name}
            placeholder={element.placeholder}
            onChange={handleChange}
            value={formData[element.name] || ""}
          />
        );
      case "textarea":
        return (
          <Textarea
            name={element.name}
            placeholder={element.placeholder}
            onChange={handleChange}
            value={formData[element.name] || ""}
          />
        );
      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [element.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={element.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {element.options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  console.log(formData);
  return (
    <>
      <div className="mb-5 flex justify-end w-full ">
        <Button onClick={() => setOpen(true)}>Add new product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader className="font-bold text-2xl mt-6 mb-4">
              Add a product
            </SheetHeader>
            <SheetDescription></SheetDescription>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              setFormData={setFormData}
            />
            <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
              {addProductFormElement.map((element) => (
                <div key={element.name} className="flex flex-col">
                  <Label htmlFor={element.name} className="mb-1 font-semibold">
                    {element.label}
                  </Label>
                  {renderFormElement(element)}
                </div>
              ))}
              <Button className="" type="submit">
                Submit
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdminProducts;
