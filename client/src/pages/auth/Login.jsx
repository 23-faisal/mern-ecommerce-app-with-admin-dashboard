import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "@/store/authStore/userAuthStore"; // Adjust the path based on your folder structure

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        toast.success(data.message);
        navigate("/auth/register"); // Redirect to home page
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData); // Trigger the mutation
  };

  return (
    <div className="w-full mx-auto max-w-md space-y-6">
      <div className="text-center ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground ">
          Login to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <form className="flex flex-col items-start gap-2" onSubmit={handleSubmit}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          placeholder="Enter your email"
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          placeholder="Enter your password"
          required
        />
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={mutation.isLoading} // Disable button during loading
        >
          {mutation.isLoading ? "Logging In..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
