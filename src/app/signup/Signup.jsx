"use client";
import React, { useState } from "react";
import signUpBanner from "../../assets/singup.svg";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { signUp } from "@/services/userService";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL: "",
  });

  const doSignup = async (event) => {
    event.preventDefault();

    if (data.name.trim() === "") {
      toast.warning("Name is required !!", {
        position: "top-center",
      });
      return;
    }
    if (data.email.trim() === "") {
      toast.warning("Email is required !!", {
        position: "top-center",
      });
      return;
    }
    if (data.password.trim() === "") {
      toast.warning("Password is required !!", {
        position: "top-center",
      });
      return;
    }
    if (data.about.trim() === "") {
      toast.warning("About is required !!", {
        position: "top-center",
      });
      return;
    }
    if (data.profileURL.trim() === "") {
      toast.warning("Profile URL is required !!", {
        position: "top-center",
      });
      return;
    }

    try {
      const result = await signUp(data);
      toast.success("User is registered !!", {
        position: "top-center",
      });
      setData({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL: "",
      });
    } catch (error) {
      toast.error("Signup Error !! " + error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
      profileURL: "",
    });
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg ">
        <div className="flex justify-center mb-6">
          <Image
            src={signUpBanner}
            alt="signup banner"
            width={200}
            height={100}
            className=""
          />
        </div>
        <h1 className="text-3xl font-semibold text-center mb-6">Signup Here</h1>
        <form onSubmit={doSignup}>
          <div className="mb-4">
            <label htmlFor="user_name" className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 text-black focus:border-black focus:ring-0"
              placeholder="Enter your name"
              id="user_name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="user_email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 text-black focus:border-black focus:ring-0"
              placeholder="Enter your email"
              id="user_email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="user_password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 text-black focus:border-black focus:ring-0"
              placeholder="Enter your password"
              id="user_password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="user_about" className="block text-sm font-medium mb-2">About</label>
            <textarea
              className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 text-black focus:border-black focus:ring-0"
              placeholder="Tell us about yourself"
              id="user_about"
              rows={4}
              onChange={(e) => setData({ ...data, about: e.target.value })}
              value={data.about}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="user_profileURL" className="block text-sm font-medium mb-2">Profile URL</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 text-black focus:border-black focus:ring-0"
              placeholder="Enter your profile URL"
              id="user_profileURL"
              onChange={(e) => setData({ ...data, profileURL: e.target.value })}
              value={data.profileURL}
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg hover:bg-green-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              Signup
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg hover:bg-orange-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
