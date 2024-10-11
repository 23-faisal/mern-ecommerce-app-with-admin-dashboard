import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea"; // Assuming you have a Textarea component in your UI library
import useAddressStore from "@/store/addressStore/useAddressStore";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import useAuthStore from "@/store/authStore/userAuthStore";

const AddressForm = () => {
  const { address, addAddress, fetchAddress, updateAddress, deleteAddress } =
    useAddressStore();
  const [edit, setEdit] = useState(false);

  const { user } = useAuthStore();
  const maxAddress = 3;

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      city: "",
      pincode: "",
      phone: "",
      notes: "",
    },
  });

  const onSubmit = (data) => {
    addAddress(user.id, data); // Add new address
    reset();
  };



  return (
    <div className="flex justify-center">
      {/* see if the address available */}

      <Card className=" w-[300px] sm:w-[500px] md:w-[800px] shadow-lg hover:shadow-2xl transition-shadow duration-300 focus:outline-none focus:ring-0 py-4">
        <div>
          {address && (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
              {address.length > 0 &&
                address?.map((item, _i) => (
                  <Card className="" key={item._id}>
                    <CardTitle className="mt-4 font-bold text-xl ">
                      Address {_i + 1}
                    </CardTitle>
                    <CardDescription></CardDescription>
                    <CardContent className="text-left mt-4">
                      <p>
                        <span className="font-semibold ">Address: </span>{" "}
                        {item.address}
                      </p>
                      <p>
                        <span className="font-semibold ">City: </span>
                        {item.city}
                      </p>
                      <p>
                        <span className="font-semibold ">Pincode: </span>{" "}
                        {item.pincode}
                      </p>
                      <p>
                        <span className="font-semibold ">Phone: </span>{" "}
                        {item.phone}
                      </p>
                      <p>
                        <span className="font-semibold ">Notes: </span>
                        {item?.notes}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() => deleteAddress(item.userId, item._id)}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          )}
        </div>

        {/*  */}
        <CardHeader
          className={`${address.length === maxAddress ? "hidden" : ""}`}
        >
          <CardTitle className="text-xl font-bold ">Add New Address</CardTitle>
          <CardDescription>
            Fill in the details to add a new address. You're allowed to add
            maximum 3 address.
          </CardDescription>
        </CardHeader>
        <CardContent
          className={`${address.length === maxAddress ? "hidden" : ""}`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label className="block text-left text-lg font-semibold mb-2 text-gray-700">
                Address
              </Label>
              <Input
                {...register("address", { required: "Address is required!" })}
                placeholder="Enter your address"
                className="w-full"
              />
              {/* errors */}
              {errors.address && (
                <p className="mt-1 text-sm text-red-500 ">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label className="block  text-left text-lg font-semibold mb-2 text-gray-700">
                City
              </Label>
              <Input
                {...register("city", { required: "City is required!" })}
                placeholder="Enter your city"
                className="w-full"
              />
              {/* errors */}
              {errors.city && (
                <p className="mt-1 text-sm text-red-500 ">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label className="block text-left text-lg font-semibold mb-2 text-gray-700">
                Pincode
              </Label>
              <Input
                {...register("pincode", { required: "Pincode is required!" })}
                placeholder="Enter your pincode"
                className="w-full"
              />
              {/* errors */}
              {errors.pincode && (
                <p className="mt-1 text-sm text-red-500 ">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label className="block text-left text-lg font-semibold mb-2 text-gray-700">
                Phone
              </Label>
              <Input
                {...register("phone", { required: "Phone is required" })}
                placeholder="Enter your phone number"
                className="w-full"
              />
              {/* errors */}
              {errors.phone && (
                <p className="mt-2 text-sm text-red-500 ">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label className="block text-left text-lg font-semibold mb-2 text-gray-700">
                Notes(Optional)
              </Label>
              <Textarea
                {...register("notes", { max: 80 })}
                placeholder="Additional notes (optional)"
                className="w-full h-24"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressForm;
