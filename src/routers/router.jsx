import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "./NotFoundPage";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from '../pages/dashboard/DashboardLayout';
// import Dashboard from '../pages/dashboard/Dashboard';
// import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
// import AddBook from "../pages/dashboard/addBook/AddBook";
// import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import { Products } from "../components/Products";
import AdminLayout from "../pages/dashboard/AdminLayout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path: "/",
            element:<Home></Home>
        },
        {
          path: "/products",
          element:<Products></Products>
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
            path: "/about",
            element: <div>About</div>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        },
        {
          path: "/cart",
          element: <CartPage></CartPage>
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage></CheckoutPage></PrivateRoute>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {
          path: "/user-dashboard",
          element: <PrivateRoute><UserDashboard/></PrivateRoute>
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />, 
      children: [
        {
          path: "",
          element: <AdminLogin />
        },
        {
          path: "dashboard",
          element: <AdminRoute><DashboardLayout /></AdminRoute>
        },
        // {
        //   path: "add-new-book",
        //   element: <AdminRoute><AddBook /></AdminRoute>
        // },
        // {
        //   path: "edit-book/:id",
        //   element: <AdminRoute><UpdateBook /></AdminRoute>
        // },
        // {
        //   path: "manage-books",
        //   element: <AdminRoute><ManageBooks /></AdminRoute>
        // }
      ]
    },
    {
      path: "*", 
      element: <NotFoundPage />
    }
  ]);

export default router;