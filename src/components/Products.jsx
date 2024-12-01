import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';
import { addtoCart } from '../redux/features/cart/cartSlice';
import { getImgUrl } from '../utils/getImgUrl';

export const Products = () => {
    const { data: books = [], isLoading, isError, error } = useFetchAllBooksQuery();
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [search, setSearch] = useState('');
    const handleAddToCart = (book) => {
        dispatch(addtoCart(book));
    };
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleSearchChange = (e) => setSearch(e.target.value);
    const handlePriceChange = (e) => {
        const [min, max] = e.target.value.split('-').map(Number);
        setPriceRange([min, max]);
    };
    //console.log(books);
    const filteredBooks = books.filter((book) => {
        const matchesCategory = category ? book.category === category : true;
        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
        const matchesPrice = book.newPrice >= priceRange[0] && book.newPrice <= priceRange[1];
        return matchesCategory && matchesSearch && matchesPrice;
    });
    if (isLoading) return <p className="text-center mt-10 text-lg text-gray-600">Loading books...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error: {error?.message || 'Something went wrong'}</p>;
    return (
        <div className="bg-gray-100 min-h-screen py-10 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-1/5 bg-white p-4 shadow-md md:sticky top-0">
                <h2 className="text-2xl font-semibold mb-4">Filters</h2>
                {/* Search */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Search</label>
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>
                {/* Category Filter */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="w-full border px-2 py-1 rounded"
                    >
                        <option value="">All Categories</option>
                        <option value="business">Business</option>
                        <option value="fiction">Fiction</option>
                        <option value="horror">Horror</option>
                        <option value="adventure">Adventure</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                {/* Price Range Filter */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Price Range</label>
                    <select
                        onChange={handlePriceChange}
                        className="w-full border px-2 py-1 rounded"
                    >
                        <option value="0-1000">All Prices</option>
                        <option value="0-10">₹0 - ₹10</option>
                        <option value="11-20">₹11 - ₹20</option>
                        <option value="21-30">₹21 - ₹30</option>
                        <option value="31-40">₹31 - ₹40</option>
                        <option value="41-50">₹41 - ₹50</option>
                    </select>
                </div>
            </aside>
            {/* Main Content */}
            <main className="w-3/4 p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                    {filteredBooks.map((book,index) => (
                        <div
                            key={index}
                            className="bg-white border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={getImgUrl(book.coverImage)}
                                alt={book.title}
                                className="w-full h-52 object-cover rounded mb-4"
                            />
                            <h2 className="text-xl font-semibold text-gray-800 truncate">{book.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                {book?.description.length > 80
                                    ? `${book.description.slice(0, 80)}...`
                                    : book?.description}
                            </p>
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-lg font-bold text-blue-600">
                                    ₹{book?.newPrice}
                                    <span className="line-through text-gray-500 text-sm ml-2">
                                        ₹{book?.oldPrice}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500 capitalize">{book.category}</p>
                            </div>
                            <button
                                onClick={() => handleAddToCart(book)}
                                className="bg-mainbutton text-white py-2 px-4 w-full rounded hover:bg-slate-800 transition-colors duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                ) :
                (
                    <p className="text-center text-gray-500 text-lg mt-10">No product found</p>
                )}
            </main>
        </div>
    );
};
