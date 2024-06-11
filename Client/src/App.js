import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/pages/RootLayout";
import HomePage from "./components/home/HomePage";
import ShopPage from "./components/pages/ShopPage";
import DetailPage from "./components/pages/DetailPage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import SignUp from "./components/auth/Signup";
import Login from "./components/auth/login";
import History from "./components/pages/History";
import Bill from "./components/orders/Bill";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "detail/:productId", element: <DetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "orders", element: <History /> },
      { path: "orders/:id", element: <Bill /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <SignUp /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
