"use client";
import UserContext from "@/context/userContext";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginFormSubmitted = async (event) => {
    event.preventDefault();
    console.log(loginData);
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      toast.info("Invalid Data !!", {
        position: "top-center",
      });
      return;
    }

    //valid data
    //login

    try {
      const result = await login(loginData);
      console.log(result);
      toast.success("Logged In");
      //redirect
      context.setUser(result.user);
      router.push("/profile/user");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Login Here</h1>
        <form action="#!" onSubmit={loginFormSubmitted}>
          <div className="mb-4">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg text-black bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              id="user_email"
              name="user_email"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  email: event.target.value,
                });
              }}
              value={loginData.email}
            />
          </div>
          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg text-black bg-gray-200 border border-black-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              id="user_password"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                });
              }}
              value={loginData.password}
            />
          </div>

          <div className="flex flex-col gap-3 items-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              Login
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
