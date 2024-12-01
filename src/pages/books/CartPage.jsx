import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';
import swal from "sweetalert";
const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const navigate =useNavigate();
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleProceedToCheckout = () => {
        if (!cartItems || cartItems.length === 0) {
            swal("Cart is empty", "Please add items to your cart before proceeding.", "warning").then(() => {
                navigate("/");
            });
        }
        else{
            navigate("/checkout");
        }
    }

    return (
        <div className="flex flex-col items-center px-4 sm:px-8 lg:px-16 py-12 bg-gray-50">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Shopping Cart</h1>
                    <button
                        onClick={handleClearCart}
                        className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Cart Items */}
                <div>
                    {cartItems.length > 0 ? (
                        <ul role="list" className="divide-y divide-gray-200">
                            {cartItems.map((product) => (
                                <li key={product?._id} className="flex items-center gap-4 py-6">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-300">
                                        <img
                                            src={`${getImgUrl(product?.coverImage)}`}
                                            alt={product?.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-1 justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800">
                                                <Link to="/">{product?.title}</Link>
                                            </h3>
                                            <p className="text-sm text-gray-500 capitalize mt-1">
                                                <strong>Category:</strong> {product?.category}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                <strong>Qty:</strong> 1
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-gray-800">${product?.newPrice}</p>
                                            <button
                                                onClick={() => handleRemoveFromCart(product)}
                                                className="mt-2 text-sm text-red-500 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600 mt-8">Your cart is empty.</p>
                    )}
                </div>

                {/* Subtotal Section */}
                <div className="mt-8 border-t pt-6">
                    <div className="flex justify-between text-lg font-medium text-gray-800">
                        <span>Subtotal</span>
                        <span>${totalPrice ? totalPrice : 0}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={handleProceedToCheckout}
                            className="w-full flex justify-center items-center bg-black text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-slate-800 transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <Link to="/">
                            <button
                                type="button"
                                className="text-black text-sm font-medium hover:underline"
                            >
                                Continue Shopping &rarr;
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
