import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { useState } from "react";
import {
  Eye,
  EyeIcon,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";

export const signupAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    return redirect("/login");
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <section className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-8 ">
          <div className="text-center mb-8">
            {showMessage && (
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare classNames="size-6 text-primary" />
              </div>
            )}
            <h1 className="text-2xl font-bold mt-2 capitalize">
              create account
            </h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
          <Form method="post" className="space-y-6 " bg-lime-500>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium capitalize">
                  first name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  name="firstName"
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium capitalize">
                  last name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  name="lastName"
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium capitalize">email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  name="email"
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium capitalize">
                  password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  name="password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 f;ex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <SubmitBtn />
          </Form>
          <div className="text-center">
            <p className="text-base-content/60">Already have an account?</p>
            <Link to="/login" className="link link-primary capitalize">
              sign in
            </Link>
          </div>
        </div>
      </section>

      <AuthImagePattern
        title="chat app bitch"
        subtitle="case you haven't heard"
      />
    </div>
  );
};
export default Register;
