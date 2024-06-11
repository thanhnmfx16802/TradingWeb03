import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./home/Home";
import Products from "./ad_pages/Products";

import TransactionList from "./ad_pages/ListTrans";
import EditProduct from "./ad_pages/EditProduct";

import Login from "./auth_AD/AD_Login";
import Bill from "./orders/Bill";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { index: true, element: <Home /> },
  {
    path: "products",
    element: (
      <ProtectedRoute>
        <Products />{" "}
      </ProtectedRoute>
    ),
  },

  {
    path: "transaction",
    element: (
      <ProtectedRoute>
        <TransactionList />
      </ProtectedRoute>
    ),
  },

  {
    path: "edit/:productId",
    element: (
      <ProtectedRoute>
        <EditProduct />
      </ProtectedRoute>
    ),
  },

  { path: "login", element: <Login /> },
  {
    path: "order/:id",
    element: (
      <ProtectedRoute>
        <Bill />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
