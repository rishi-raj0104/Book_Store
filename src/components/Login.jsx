import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getImgUrl } from '../utils/getImgUrl';
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';
import { useLocation } from "react-router-dom";
const Login = () => {
    const location = useLocation();
    const email = location.state?.email || "";
    const [message, setMessage] = useState("");
    const { loginUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [randomImage, setRandomImage] = useState('');
    const [randomBookId, setRandomBookId] = useState(null);
    const { data: books = [], isLoading, isError, error } = useFetchAllBooksQuery();
    useEffect(() => {
        const fetchRandomImage = () => {
            if (books.length > 0) {
                const randomIndex = Math.floor(Math.random() * books.length);
                const selectedBook = books[randomIndex];
                const randomImage = getImgUrl(selectedBook.coverImage);
                setRandomImage(randomImage);
                setRandomBookId(selectedBook._id);
            }
        };
        fetchRandomImage();
    }, [books]);
    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            //alert("Login successful!");
            navigate("/user-dashboard")
        } catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        }
    }
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            // alert("Login successful!");
            navigate("/user-dashboard")
        } catch (error) {
            alert("Google sign in failed!")
            console.error(error)
        }
    }

    return (
    <div className='flex items-center justify-center px-4 my-10'>
        <div className="w-full md:w-8/12 flex flex-col md:flex-row items-center justify-center gap-8 p-8 rounded-xl bg-gradient-to-r from-blue-100 via-gray-200 to-blue-300 bg-[length:200%_200%] animate-running-gradient">
            {/* Image Section */}
            <div className="w-full md:w-1/2 p-6 rounded-lg bg-white shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
                {randomImage && (
                    <Link to={`/books/${randomBookId}`} className="block">
                        <img 
                            src={randomImage} 
                            alt="Random Book" 
                            className="w-full h-96 object-cover rounded-lg shadow-xl hover:opacity-80 transition-opacity duration-300"
                        />
                    </Link>
                )}
                <p className="text-center text-lg font-semibold text-gray-800 mt-4">You may like this book!</p>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 space-y-6">    
                <h2 className="text-3xl font-bold text-center text-gray-800">Please Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            {...register("email", { required: true })}
                            className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300"
                            id="email"
                            type="email"
                            defaultValue={email}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: true })}
                            className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    {message && <p className="text-red-500 text-xs italic">{message}</p>}

                    <div className="flex flex-col gap-3">
                        <button
                            className="btn-primary text-white font-semibold py-2 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
                            type="submit"
                        >
                            Login
                        </button>

                        <button
                            className="flex gap-2 items-center justify-center bg-red-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
                            onClick={handleGoogleSignIn}
                        >
                            <FaGoogle className="text-lg" />
                            Sign in with Google
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
                        Register here
                    </Link>
                </p>

                <p className="mt-4 text-center text-gray-500 text-xs">
                    &copy;{new Date().getFullYear()} Book Store. All rights reserved.
                </p>
            </div>
        </div>
    </div>

    );
}

export default Login;
