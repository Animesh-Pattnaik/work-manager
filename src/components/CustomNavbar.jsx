"use client";

import UserContext from "@/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const CustomNavbar = () => {
  const context = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  async function doLogout() {
    try {
      const result = await logout();
      console.log(result);
      context.setUser(undefined);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout Error");
    }
  }

  return (
    <nav className="bg-gradient-to-r from-blue-400 to-purple-600 h-16 py-2 px-6 md:px-36 flex justify-between items-center relative">
      <div className="brand">
        <h1 className="text-2xl font-semibold text-white">
          <a href="#!">Work Manager</a>
        </h1>
      </div>
      <div className="hidden md:flex">
        <ul className="flex space-x-5">
          {context.user && (
            <>
              <li>
                <Link href="/" className="text-white hover:text-blue-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/add-task" className="text-white hover:text-blue-200">
                  Add Task
                </Link>
              </li>
              <li>
                <Link href="/show-tasks" className="text-white hover:text-blue-200">
                  Show Tasks
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-3">
          {context.user ? (
            <>
              <li>
                <Link href="/profile/user" className="text-white hover:text-blue-200">
                  {context.user.name}
                </Link>
              </li>
              <li>
                <button onClick={doLogout} className="text-white hover:text-blue-200">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="text-white hover:text-blue-200">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-white hover:text-blue-200">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="md:hidden relative">
        <button className="text-white hover:text-blue-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 bg-gradient-to-r from-blue-400 to-purple-600 w-64 p-4 rounded-lg shadow-lg transition-transform transform translate-y-2 opacity-90">
            <ul className="flex flex-col space-y-3">
              {context.user && (
                <>
                  <li>
                    <Link href="/" className="text-white text-center hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/add-task" className="text-white text-center hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>
                      Add Task
                    </Link>
                  </li>
                  <li>
                    <Link href="/show-tasks" className="text-white text-center hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>
                      Show Tasks
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile/user" className="text-white text-center hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>
                      {context.user.name}
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => { doLogout(); setIsMenuOpen(false); }} className="text-white text-center hover:text-blue-200">
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!context.user && (
                <>
                  <li>
                    <Link href="/login" className="text-white text-center hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="text-white text-center hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;
