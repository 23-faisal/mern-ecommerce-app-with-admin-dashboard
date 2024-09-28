import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ShowProducts = () => {
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
      <div>
        <ul>
          {data.map((product) => (
            <li key={product._id}>
              <img src={product.image} alt={product.description} srcset="" />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowProducts;
