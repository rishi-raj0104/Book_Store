import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { VscSearch } from "react-icons/vsc";
import { HiOutlineUser } from "react-icons/hi";
import { FaShoppingBag } from "react-icons/fa";
import avatarImg from '../../assets/avatar.png';
import { useSelector } from "react-redux";
import 'sweetalert2/dist/sweetalert2.js';
//import { useAuth } from "../context/AuthContext";
//import book_logo from '../assets/book-store.jpg';
import book_store_new from '../../assets/book_store_new.jpg';
// import navigation from '../utils/navigation';
//import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';
const navigation = [
    { name: "Dashboard", href: "dashboard" },
    // { name: "Orders", href: "/orders" },
    // { name: "Cart Page", href: "/cart" },
    // { name: "Check Out", href: "/checkout" },
    // {name: "Products", href: "/products"}
];
const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setCurrentUser({ username: "Admin" });
        }
        else {
            setCurrentUser(null); 
        }
      },[localStorage.getItem('token')]);
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate("/admin")
      }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    return (
        <header className="max-w-screen-2xl mx-auto px-6 py-2">
            <nav className="flex justify-between items-center">
                <div className="flex items-center md:gap-12 gap-4">
                    <Link to='/admin'><img src={book_store_new} alt="Logo" className="w-44" /></Link>
                </div>
                <div className="relative flex items-center md:mr-3 mr-2 gap-2">
                    <div>
                        {
                            currentUser ? (
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img
                                        src={avatarImg}
                                        alt=''
                                        className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}
                                    />
                                </button>
                            ) : (
                                <Link to='/admin'><HiOutlineUser className="size-6" /></Link>
                            )
                        }
                    </div>

                    <button className="block group">
                        <HiOutlineHeart className="size-6 group-hover:hidden" />
                        <HiHeart className="size-6 hidden group-hover:block text-red-500" />
                    </button>

                    {
                        isDropdownOpen && (
                            <div ref={dropdownRef} className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-md z-40">
                                <ul className="py-2">
                                    {navigation.map((item) => (
                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                            <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
