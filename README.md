# Book Store App - React + Vite + Express + MongoDB

This is a book store web application built using **React**, **Vite**, **Express**, **MongoDB**, **Razorpay** for payment integration, and **Firebase** for authentication. Styled with **Tailwind CSS**, the app offers a dynamic and responsive user experience for browsing books, managing orders, and performing administrative tasks.

## Features

- **User Authentication**: Register and login functionality using **Firebase Authentication**.
- **Book Management**: View, add, and manage books in the store.
- **Shopping Cart**: Add books to the cart and proceed to checkout using **Redux** for state management.
- **Order Management**: Place orders and view them in the user dashboard.
- **Payment Integration**: **Razorpay** is integrated for handling payments at checkout.
- **Admin Panel**: Admin routes to manage the bookstore, including book addition and updates.
- **Private Routes**: Secure pages with route protection using **PrivateRoute** and **AdminRoute** components.
- **State Management**: Uses **Redux Toolkit (RTK)** for managing the cart state and **RTK Query** for efficient API handling.
- **Responsive UI**: Built with **Tailwind CSS** for a responsive and modern design.

## Technologies Used

- **Frontend**:
  - **React.js** for building the user interface.
  - **Vite** for fast development and bundling.
  - **Tailwind CSS** for styling.
  - **Redux Toolkit (RTK)** for state management.
  - **React Router DOM** for routing.
  - **Firebase** for authentication.
  - **Razorpay** for payment gateway integration.
  
- **Backend**:
  - **Express.js** (on top of Node.js) for server-side functionality.
  - **MongoDB** for storing user data and book information.
  - **Mongoose** for MongoDB object modeling.

## Installation

### Clone the Repository

```bash
git clone https://github.com/rishi-raj0104/book-store-app.git
cd book-store-app
