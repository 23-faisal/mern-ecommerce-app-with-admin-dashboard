import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const Register = () => {
  const apiUrl = import.meta.env.VITE_API_URL; // Assuming you're fetching this from environment variables
  const navigate = useNavigate();
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${apiUrl}/api/auth/register`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/login");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    <Link to="/auth/login"></Link>;
  };

  return (
    <div className="w-full mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create a new account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <form className="flex flex-col items-start gap-2" onSubmit={handleSubmit}>
        <Label htmlFor="userName">Username</Label>
        <Input
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          placeholder="Enter your username"
          required
        />
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
        <Button type="submit" className="w-full mt-2">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
