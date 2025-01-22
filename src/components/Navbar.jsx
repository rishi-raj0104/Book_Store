import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { VscSearch } from "react-icons/vsc";
import { HiOutlineUser } from "react-icons/hi";
import { FaShoppingBag } from "react-icons/fa";
import avatarImg from '../assets/avatar.png';
import { useSelector } from "react-redux";
import 'sweetalert2/dist/sweetalert2.js';
import { useAuth } from "../context/AuthContext";
import book_logo from '../assets/book-store.jpg';
import book_store_new from '../assets/book_store_new.jpg';
import navigation from '../utils/navigation';
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';
const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpenSeach, setIsDropdownOpenSearch] = useState(false);
    const dropdownSearchRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const dropdownRef = useRef(null);
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, logout } = useAuth();
    const { data: books = [], isLoading, isError, error } =useFetchAllBooksQuery();
    
    // Filter search results dynamically
    useEffect(() => {
        const fetchResults = () => {
            if (searchQuery.trim() === "") {
                setSearchResults([]);
                return;
            }
            try {
                // Filter books by search query
                const filteredResults = books.filter((book) =>
                    book.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSearchResults(filteredResults);
            } catch (error) {
                console.error("Error filtering search results:", error);
            }
        };
        const debounce = setTimeout(fetchResults, 300); // Debounce API calls
        return () => clearTimeout(debounce);
    }, [searchQuery, books]);
    
    const handleLogOut = () => {
        setIsDropdownOpen(false);
        logout();
    };
    // Close dropdown when clicking outside
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

    useEffect(() => {
        const handleClickOutsideSearch = (event) => {
            if (dropdownSearchRef.current && !dropdownSearchRef.current.contains(event.target)) {
                setIsDropdownOpenSearch(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutsideSearch);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideSearch);
        };
    }, []);
    
    return (
        <header className="max-w-screen-2xl mx-auto md:px-6 py-2">
            <nav className="flex justify-between items-center">
                <div className="flex items-center md:gap-12 gap-4">
                    <Link to='/'><img src={book_store_new} alt="Logo" className="w-44" /></Link>
                    <div className="relative sm:w-72 w-40 md:space-x-2">
                        <VscSearch className="absolute inline-block left-3 inset-y-2" />
                        <input
                            type="text"
                            placeholder="Search here"
                            className="bg-[#EAEAEA] text-black w-24 md:w-44 py-1 md:px-8 px-6 rounded-md focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsDropdownOpenSearch(true)} 
                        />
                        {isDropdownOpenSeach && searchQuery && (
                            <div ref={dropdownSearchRef} className="absolute left-0 top-10 w-full bg-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map((result, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => {
                                                    setSearchQuery("");
                                                    navigate(`books/${result._id}`);
                                                }}
                                            >
                                                {result.title}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="px-4 py-2 text-center">No products found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="relative flex items-center md:space-x-3 space-x-2 sm:gap-2">
                    <div>
                        {
                            currentUser ? (
                                <button 
                                className='size-7'
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img
                                        src={avatarImg}
                                        alt=''
                                        className={` rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}
                                    />
                                </button>
                            ) : (
                                <Link to='/login'><HiOutlineUser className="size-6" /></Link>
                            )
                        }
                    </div>

                    <button className="hidden sm:block group">
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
                    <Link to="/cart" className="bg-black text-white p-1 sm:px-6 px-2 flex items-center rounded-lg hover:bg-slate-800">
                        <FaShoppingBag className='size-6' />
                        {
                            cartItems.length > 0 ?
                                <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> :
                                <span className="text-sm font-semibold sm:ml-1">0</span>
                        }
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
