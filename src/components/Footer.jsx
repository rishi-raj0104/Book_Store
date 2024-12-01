import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import footer_logo from '../assets/book_footer_logo.jpg';
import book_store_new from '../assets/book_store_new.jpg';
import { Link } from 'react-router-dom';
import Swal  from "sweetalert2";
const Footer = () => {
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  function handlesubmit() {
    if (email !== '') {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "You are subscribed now",
        showConfirmButton: false,
        timer: 1500
      });
      setEmail(''); 
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Please enter a valid email address",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  return (
    <footer className="bg-slate-300 text-gray-800 py-12 rounded-t-2xl ">
      {/* Upper Section: Logo, Navigation, Subscribe */}
      {/* <div className="container mx-auto flex items-center justify-between px-10 py-6"> */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10">  
        {/* Left: Logo */}
        <div className="flex items-center md:ml-4">
          <img src={footer_logo} alt="Book Store Logo" className="h-20 md:h-28 w-auto" />
        </div>
        {/* Center: Navigation Links */}
        <div className="flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <Link to="/products" className="hover:text-gray-900">Products</Link>
          <Link to="/user-dashboard" className="hover:text-gray-900">My Account</Link>
          <Link href="#about" className="hover:text-gray-900">About Us</Link>
          <Link href="#contact" className="hover:text-gray-900">Contact</Link>
        </div>
        {/* Right: Subscribe Section */}
        <div className=" p-6">
          <div className="flex flex-col items-center container mx-auto">
            {/* Heading */}
            <h2 className="text-xl font-bold mb-4">
              Want to Subscribe
            </h2>
            {/* Input and Button */}
            <div className="flex items-center bg-[#EAEAEA] rounded-xl max-w-md">
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleEmailChange}
                className="flex-grow px-4 py-2 bg-[#EAEAEA] text-black placeholder-black border-none outline-none rounded-l-lg"
              />
              <button 
              className="bg-black text-[#EAEAEA] px-4 py-3 text-sm rounded-r-lg border-l border-black hover:bg-slate-800"
              onClick={handlesubmit}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Media Links (Below the Upper Section) */}
      <div className=" text-center">
        <div className="flex justify-center gap-6 text-gray-600 text-xl mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <FaInstagram />
          </a>
        </div>
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-tertiary font-bold text-gray-900 tracking-wide bg-gradient-to-r from-gray-900 via-gray-700 to-transparent bg-clip-text text-transparent">
            Book Store
          </h1>
          <p className="text-sm text-gray-500 mt-4"> It's time to update your reading list with some of the latest and greatest releases in the literary world.</p>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">© {new Date().getFullYear()} Book Store</p>
      </div>
    </footer>
  );
};

export default Footer;
