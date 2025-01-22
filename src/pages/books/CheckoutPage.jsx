import React, { useState ,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDispatch , useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import axios from 'axios';
import { clearCart } from '../../redux/features/cart/cartSlice';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}
const CheckoutPage = () => {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice =  cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const {currentUser}= useAuth();
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/");  
        }
    }, [cartItems, navigate]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();
    const onSubmit = async (data) => {
        const books = cartItems.map((item) => item?._id);
        const newOrder = {
            name: data.name,
            email: data.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: books,
            totalPrice: totalPrice,
            status :'Recieved',
            payment_status :''
        };
        try {
          const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
          if (!res) {
            alert("RazorPay SDK failed to load");
            return;
          }
          //const response = await axios.post('http://localhost:4000/api/v1/payment/capturePayment', { books ,newOrder });
          const response = await axios.post('https://book-store-backend-five-alpha.vercel.app/api/v1/payment/capturePayment', { books ,newOrder });
          
          const orderId= response.data.orderId
            if (response.data.success) {
                const { id, amount, currency } = response.data.paymentOrder;
                try{
                    const options = {
                        key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY,
                        amount: amount,
                        currency: currency,
                        name: 'Book Store App',
                        description: 'Payment for books',
                        order_id: id,
                        handler: async (response) => {
                        try {
                            //const verifyResponse = await axios.post('http://localhost:4000/api/v1/payment/verifyPayment', {
                            const verifyResponse = await axios.post('https://book-store-backend-five-alpha.vercel.app/api/v1/payment/verifyPayment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            books,
                            orderId
                            });
                            if (verifyResponse.data.success) {
                                navigate('/orders');
                                dispatch(clearCart());
                                
                            } else {
                                alert('Payment Verification Failed');
                            }
                        } catch (error) {
                            console.error('Payment Verification Error:', error);
                            alert('Payment Verification Failed');
                        }
                        },
                        prefill: {
                        name: data.name, 
                        email: data?.email,
                        },
                        theme: {
                        color: '#F37254',
                        },
                    };
                    const razorpay = new window.Razorpay(options);
                    //console.log('razorpay',razorpay);
                    console.log('Razorpay initialized');
                    razorpay.open();
                    console.log("WAPAS AAGAYA ");
                }
                catch (error)
                {
                    console.log("Razorpay Order Creation Error:", error);
                }
            }
        } catch (error) {
          console.error("Error during payment processing", error);
          alert("An error occurred during payment processing.");
        }
      };
      
    if (isLoading) return <div>Loading....</div>;
    return (
    <div>
      <section>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <div>
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                    <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                    <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
                    </div>

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Full Name</label>
                                            <input
                                                {...register("name", { required: true })}
                                                type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                                defaultValue={currentUser?.name}
                                            />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label html="email">Email Address</label>
                                            <input
                                                {...register("email", { required: true })}
                                                type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                                //disabled
                                                defaultValue={currentUser?.email}
                                                placeholder="Please enter an email" 
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label html="phone">Phone Number</label>
                                            <input
                                            {...register("phone", { required: true })}
                                            type="number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890" />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Address / Street</label>
                                            <input
                                            {...register("address", { required: true })}
                                                type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">City</label>
                                            <input
                                                {...register("city", { required: true })}
                                                type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="country">Country / region</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    {...register("country", { required: true })}
                                                    name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                                                <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="state">State</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input 
                                                {...register("state", { required: true })}
                                                
                                                name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                                                <button  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input 
                                            {...register("zipcode", { required: true })}
                                            type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                        </div>

                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input 
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                                type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                                                <label htmlFor="billing_same" className="ml-2 ">I am agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link></label>
                                            </div>
                                        </div>



                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button 
                                                disabled={!isChecked}
                                                className="bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded">Place an Order</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default CheckoutPage
