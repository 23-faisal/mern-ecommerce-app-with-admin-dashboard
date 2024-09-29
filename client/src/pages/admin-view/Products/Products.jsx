import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ShowProducts from "@/components/ui/admin-view/ShowProducts";

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
  const [imageFile, setImageFile] = useState(null); // To hold the image file
  const [imageLoadingState, setImageLoadingState] = useState(false); // For image loading state
  const [editData, setEditData] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const queryClient = useQueryClient();

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("my_file", imageFile); // Append the image file to the form data

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data?.uploadResult?.url;
  };

  // Mutation to handle form submission
  const mutation = useMutation({
    mutationFn: async (productData) => {
      if (imageFile) {
        setImageLoadingState(true); // Set loading state for the image upload
        const imageUrl = await uploadImageToCloudinary(); // Get the uploaded image URL
        setImageLoadingState(false); // End image loading state

        productData.image = imageUrl;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/add-product`,
        productData
      );
      return response.data;
    },
    onSuccess: () => {
      setOpen(false); // Close the sheet on success
      setImageFile(null);
      setFormData({});
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // mutation for edit form submission

  const editProductMutation = useMutation({
    mutationFn: async (productData) => {
      if (imageFile) {
        setImageLoadingState(true);
        const imageUrl = await uploadImageToCloudinary();
        setImageLoadingState(false);
        productData.image = imageUrl;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/products/edit-product/${
          productData._id
        }`,
        productData
      );
      return response.data;
    },
    onSuccess: () => {
      setOpen(false);
      setImageFile(null);
      setFormData({});
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // function for delete a product

  const deleteProduct = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete-product/${id}`
    );
    return response.data;
  };

  // mutation for delete product

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      setDeleteDialogOpen(false); // Close the dialog on success
      queryClient.invalidateQueries(["products"]); // Invalidate and refetch the products list
    },
    onError: (error) => {
      alert(error.message);
      setDeleteDialogOpen(false); // Close the dialog on error
    },
  });

  // Function to handle the delete confirmation
  const handleDelete = () => {
    if (productIdToDelete) {
      deleteMutation.mutate(productIdToDelete);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      editProductMutation.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
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
            value={formData[element.name]} // Bind the value to formData
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={element.placeholder}>
                {/* Display the current value in the Select */}
                {formData[element.name]
                  ? element.options.find(
                      (option) => option.id === formData[element.name]
                    )?.label
                  : element.placeholder}
              </SelectValue>
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

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-5 flex justify-end w-full ">
        <Button
          onClick={() => {
            setOpen(true);
            setEditData(false);
            setFormData({});
          }}
        >
          Add new product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader className="font-bold text-2xl mt-6 mb-4">
              {editData ? " Edit Product" : "Add a product"}
            </SheetHeader>
            <SheetDescription></SheetDescription>

            {/* Product Image Upload Component */}
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              setImageLoadingState={setImageLoadingState}
              editData={editData}
              formData={formData}
            />

            {/* Product Form */}
            <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
              {addProductFormElement.map((element) => (
                <div key={element.name} className="flex flex-col">
                  <Label htmlFor={element.name} className="mb-1 font-semibold">
                    {element.label}
                  </Label>
                  {renderFormElement(element)}
                </div>
              ))}

              <Button type="submit" className={`${!editData && "hidden"}`}>
                Update
              </Button>
              <Button
                type="submit"
                className={`${mutation.isLoading && "disabled"} ${
                  editData && "hidden"
                }`}
              >
                {imageLoadingState ? "wait a sec..." : "Submit"}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <h1 className="font-bold text-2xl text-center mb-8">Products</h1>
        <ShowProducts
          setEditData={setEditData}
          setFormData={setFormData}
          setOpen={setOpen}
          setRemoveProduct={setRemoveProduct}
          setDeleteDialogOpen={setDeleteDialogOpen}
          setProductIdToDelete={setProductIdToDelete}
        />
      </div>
      {/* Confirmation Dialog for Deleting a Product */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Do you want to delete this product?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={() => setDeleteDialogOpen(false)} type="submit">
              Cancel
            </Button>
            <Button onClick={handleDelete} type="submit">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
