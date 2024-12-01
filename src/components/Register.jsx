import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getImgUrl } from '../utils/getImgUrl';
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';
const Register = () => {
  const [message, setMessage] = useState("");
  const {registerUser,signInWithGoogle} = useAuth();
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
    const onSubmit = async(logdata) => {
        try {
            await registerUser(logdata.email, logdata.password);
            alert("User registered successfully!")
            navigate("/login", { state: { email: logdata.email } });
        } catch (error) {
            //console.log(error);
            if (error.code === "auth/email-already-in-use") {
                setMessage("This email is already registered. Please try logging in.");
            } else if (error.code === "auth/invalid-email") {
                setMessage("Invalid email format. Please provide a valid email.");
            } else if (error.code === "auth/weak-password") {
                setMessage("Password should be at least 6 characters long.");
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
        }
    }
    const handleGoogleSignIn = async() => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
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
                    <h2 className='text-xl font-semibold mb-4'>Please Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email
                            </label>
                            <input
                                {...register("email", { required: true })} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                {...register("password", { required: true })} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        {/* <p className="text-red-500 text-xs italic mb-3">Message</p> */}
                        {
                        message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                        }
                        <div className="flex flex-wrap space-y-2.5 items-center justify-between">
                            
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                className="btn-primary text-white font-semibold py-2 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
                                type="submit"
                            >
                                Register
                            </button>
                            <button
                                className="flex gap-2 items-center justify-center bg-red-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
                                onClick={handleGoogleSignIn}
                            >
                                <FaGoogle className="mr-2" />
                                Sign in with Google
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-sm text-gray-600">
                        Have an account? Please
                        <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold"> Login</Link>
                    </p>

                    <p className="mt-5 text-center text-gray-500 text-xs">
                        &copy;2025 Book Store. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register;
 