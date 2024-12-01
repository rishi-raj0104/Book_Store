import { createSlice } from '@reduxjs/toolkit';
import Swal  from "sweetalert2";
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [] 
};
export const cartSlice = createSlice({
  name: 'cart' ,
  initialState ,
  reducers: {
    addtoCart: (state,action) => {
        const existingItem = state.cartItems.find(item => item._id === action.payload._id);
        if(!existingItem){
            state.cartItems.push(action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product Added to the Cart",
              showConfirmButton: false,
              timer: 1500
            });
        } else{
          Swal.fire({
            title: "Already Added to the Cart",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK!"
          })

        }
    },
    removeFromCart: (state, action) => {
        state.cartItems =  state.cartItems.filter(item => item._id !== action.payload._id)
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
        state.cartItems = []
        localStorage.removeItem('cartItems');
    }
  },
})

export const { addtoCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;