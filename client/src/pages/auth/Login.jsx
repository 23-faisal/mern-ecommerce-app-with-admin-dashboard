import CommonForm from "@/components/common/Form";
import { loginFormControl } from "@/config/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
    });
  };
  return (
    <div className="w-full mx-auto max-w-md space-y-6">
      <div className="text-center ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground ">
          Login to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControl={loginFormControl}
        buttonText={"Log in"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
