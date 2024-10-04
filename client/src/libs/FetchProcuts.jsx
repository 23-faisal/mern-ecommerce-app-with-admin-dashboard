import axios from "axios";

// Fetch products function with filtering and sorting
const FetchProducts = async ({ queryKey }) => {
  const [_, { categories, brands, sort }] = queryKey;

  const params = {};
  if (categories) params.categories = categories;
  if (brands) params.brands = brands;
  if (sort) params.sort = sort;

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/shop/products`,
    { params }
  );

  return response.data.data; // Assuming the backend returns products in the 'data' field
};

export default FetchProducts;
