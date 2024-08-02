"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-400 to-purple-600 mt-5">
      <div className="flex flex-col md:flex-row p-5 justify-around">
        <div className="text-center flex flex-col justify-center mb-5 md:mb-0">
          <h1 className="text-2xl md:text-3xl">Welcome to work manager</h1>
          <p className="text-sm md:text-base">
            Welcome to Work Manger. Have a nice time
          </p>
        </div>
        <div className="text-center">
          <h1 className="text-xl md:text-2xl mb-2">Important Links</h1>
          <ul className="space-y-2 md:space-y-3">
            <li>
              <a href="#!" className="text-sm md:text-base">Facebook</a>
            </li>
            <li>
              <a href="#!" className="text-sm md:text-base">YouTube</a>
            </li>
            <li>
              <a href="#!" className="text-sm md:text-base">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
