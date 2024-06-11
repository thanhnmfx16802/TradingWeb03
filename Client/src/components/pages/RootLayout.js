import { Outlet } from "react-router-dom";
import NavBar from "../layout/Navbar";
import Footer from "../layout/Footer";

const RootLayout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
