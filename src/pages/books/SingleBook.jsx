import React,{useState} from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import ShareButton from './ShareButton';
import './bookstyle.css';
const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);
    const dispatch =  useDispatch();
    const [pincode, setPincode] = useState('');
    const [deliveryInfo, setDeliveryInfo] = useState('');
    const handleAddToCart = (product) => {
        dispatch(addtoCart(product));
    }
    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Error loading book info</div>;
    const handleCheckDelivery = () => {
        if (pincode) {
            setDeliveryInfo(`Delivery available for pincode: ${pincode}. Check your delivery dates and charges.`);
        } else {
            setDeliveryInfo("Please enter a valid pincode to check delivery availability.");
        }
    }
    return (
        <div className="m-2 flex flex-col md:flex-row max-w-6xl mx-auto p-5 shadow-md">
            {/* Left Side - Image and Book Details */}
            <div className="md:w-1/2 flex flex-col items-center mb-6 md:mb-0">
                <img
                    src={`${getImgUrl(book.coverImage)}`}
                    alt={book.title}
                    className="w-full max-w-xs rounded-lg shadow-lg self-center"
                />
                <div className="flex flex-row mt-6 border-2 md:p-2 items-baseline">
                    <div className="flex items-center mb-4 border-r-2 p-2 sm:p-1">
                        <img src="https://img.bookchor.com/bc-media/icon2.jpeg" alt="Quality" className="w-10 h-10 sm:w-12 sm:h-12" />
                        <span className="ml-2 text-xs sm:text-sm">7 Million+ Happy Customers</span>
                    </div>
                    <div className="flex items-center mb-4 border-r-2 p-2 sm:p-1">
                        <img src="https://img.bookchor.com/bc-media/icon1.png" alt="Quality" className="w-10 h-10 sm:w-12 sm:h-12" />
                        <span className="ml-2 text-xs sm:text-sm">100% Original Products</span>
                    </div>
                    <div className="flex items-center py-2 sm:py-1 p-2 sm:p-1">
                        <img src="https://img.bookchor.com/bc-media/icon4.png" alt="Quality" className="w-10 h-10 sm:w-12 sm:h-12" />
                        <span className="ml-2 text-xs sm:text-sm">32 Points Quality Check</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Book Info, Price, Add to Cart, Social Icons */}
            <div className="md:w-1/2 pl-6">
                <div className="flex justify-between items-baseline">
                    <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                    <ShareButton className="ml-auto" /> {/* Positioned on the right */}
                </div>

                {/* Author & Category */}
                <div className="flex mb-2">
                    <p className="text-lg text-gray-700 mr-4"><strong>Author:</strong> {book.author || 'admin'}</p>
                    <p className="text-lg text-gray-700"><strong>Binding:</strong> {'Paperback'}</p>
                </div>
                <p className="text-lg text-gray-700 mb-4"><strong>Category:</strong> {book.category}</p>

                {/* Price */}
                <div className="flex items-center mb-4">
                    <p className="text-xl font-semibold text-gray-900">₹ {book.newPrice}</p>
                    <del className="ml-2 text-gray-500">₹ {book.oldPrice}</del>
                    <span className="ml-2 text-green-500">{((book.oldPrice - book.newPrice) / book.oldPrice * 100).toFixed(2)}% OFF</span>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4"><strong>Description:</strong> {book.description}</p>

                {/* Add to Cart Button */}
                <button onClick={() => handleAddToCart(book)} className="btn-primary flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    <FiShoppingCart />
                    <span>Add to Cart</span>
                </button>


                {/* Social Share and Wishlist
                <div className="mt-4 flex gap-4">
                    <button className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600">
                        <img src="assets-new/images/heart-icon.svg" alt="Add to Wishlist" style={{ height: '32px' }} />
                    </button>
                    <button className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600">
                        <img src="assets-new/images/share-icon.svg" alt="Share" />
                    </button>
                </div> */}
                <div className=" mt-2 max-h-36 overflow-y-auto bg-gray-100 p-4 rounded-md border border-gray-300">
                    <ul className="space-y-3">
                        <li className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">&#10003;</span> 32 Quality Checks
                        </li>
                        <li className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">&#10003;</span> Spine
                        </li>
                        <li className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">&#10003;</span> Inside
                        </li>
                        <li className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">&#10003;</span> Overall: These are new books which directly come from the supplier.
                        </li>
                    </ul>
                </div>
                <div className="highlights mt-8">
                    <h3 className="text-2xl font-bold mb-4">Highlights</h3>
                    <ul className="grid grid-cols-3 md:grid-cols-5">
                        <li className="flex flex-col items-center p-1">
                            <img src="https://img.bookchor.com/images/bc/menu/language.png" alt="Language" className="w-8 h-8 mb-2" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">ENGLISH</p>
                                <span className="text-gray-500">Language</span>
                            </div>
                        </li>
                        <li className="flex flex-col items-center p-1">
                            <img src="https://img.bookchor.com/images/bc/menu/pages.png" alt="Pages" className="w-8 h-8 mb-2" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">352</p>
                                <span className="text-gray-500">Pages</span>
                            </div>
                        </li>
                        <li className="flex flex-col items-center p-1">
                            <img src="https://img.bookchor.com/images/bc/menu/isbn.png" alt="ISBN" className="w-8 h-8 mb-2" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">9780007272617</p>
                                <span className="text-gray-500">ISBN</span>
                            </div>
                        </li>
                        <li className="flex flex-col items-center p-1">
                            <img src="https://img.bookchor.com/images/bc/menu/width.png" alt="Width" className="w-8 h-8 mb-2" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">110 mm</p>
                                <span className="text-gray-500">Width</span>
                            </div>
                        </li>
                        <li className="flex flex-col items-center p-1">
                            <img src="https://img.bookchor.com/images/bc/menu/height.png" alt="Height" className="w-8 h-8 mb-2" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">176 mm</p>
                                <span className="text-gray-500">Height</span>
                            </div>
                        </li>
                        <li className="flex flex-col items-center p-1">
                            <img src="https://img.bookchor.com/images/bc/menu/weight.png" alt="Weight" className="w-8 h-8 mb-2" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">212 gram</p>
                                <span className="text-gray-500">Weight</span>
                            </div>
                        </li>
                        <li className="flex flex-col items-center p-1">
                            <img src="https://img.bookchor.com/images/bc/menu/binding.png" alt="Binding" className="w-8 h-8 mb-2" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">PAPERBACK</p>
                                <span className="text-gray-500">Binding</span>
                            </div>
                        </li>
                        <li className="flex flex-col items-center p-1">
                            <img src="https://img.bookchor.com/images/bc/menu/published-date.png" alt="Publish Date" className="w-8 h-8 mb-2" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">25 JULY {new Date().getFullYear()}</p>
                                <span className="text-gray-500">Publish Date</span>
                            </div>
                        </li>
                        <li className="flex flex-col items-center p-1">
                            <img src="https://img.bookchor.com/images/bc/menu/spine-width.png" alt="Spine Width" className="w-8 h-8 mb-2" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">14 mm</p>
                                <span className="text-gray-500">Spine Width</span>
                            </div>
                        </li>
                    </ul>

                </div>
                {/* Check Delivery Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Check Delivery</h3>
                    <div className=" relative flex border border-black rounded p-2 w-48">
                        <input 
                            type="number"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)} 
                            placeholder="Enter Pincode" 
                            className="text-gray-500 outline-none remove-arrows"
                            maxLength="6"
                        />
                        <button 
                        onClick={handleCheckDelivery}
                        className="text-orange-300 absolute right-2 top-1/2 transform -translate-y-1/2 font-bold ">Check</button>
                    </div>

                    <p className="text-sm text-gray-700">Enter your pincode to check for exact delivery dates and charges, and to see if express delivery is available.</p>
                    
                    {deliveryInfo && (
                        <div className="mt-4 text-sm text-gray-700">{deliveryInfo}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleBook;
