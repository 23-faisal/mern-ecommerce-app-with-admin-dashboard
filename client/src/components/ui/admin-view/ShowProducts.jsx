import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

const ShowProducts = ({ setFormData, setOpen, setEditData }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/products/all-products`
      );
      return response.data.data;
    },
  });

  // Handling loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <Card key={product._id} className="">
            <CardHeader>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-cover rounded"
              />
              <CardTitle className=" text-xl font-bolder">
                {product.title}
              </CardTitle>
              <CardContent>
                <div className="flex items-center justify-between text-lg  font-semibold ">
                  <p className={`${product.salePrice && "line-through"}`}>
                    {product?.price}
                  </p>
                  <p className="">{product.salePrice}</p>
                </div>
                <div className="mt-4">
                  {product.totalStock > 0 ? (
                    <p
                      className={
                        product.totalStock <= 50
                          ? "text-red-500 font-semibold text-lg "
                          : ""
                      }
                    >
                      {`${product.totalStock} items left`}
                    </p>
                  ) : (
                    <p className="text-red-500 font-semibold">Unavailable</p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2 text-lg font-semibold uppercase">
                  <p>{product.category}</p>
                  <p>{product.brand}</p>
                </div>
              </CardContent>
            </CardHeader>
            <CardFooter className="flex justify-between ">
              <Button
                onClick={() => {
                  setEditData(true);
                  setFormData(product);
                  setOpen(true);
                }}
              >
                Edit
              </Button>
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
