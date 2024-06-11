import { useEffect } from "react";
import Banner from "./Banner";
import CategoriesProd from "./categoriesProd";
import Trending from "./Trending";
import AfterService from "./AfterService";
import Contact from "./Contact";
function HomePage() {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div>
      <Banner />
      <CategoriesProd />
      <Trending />
      <AfterService />
      <Contact />
    </div>
  );
}

export default HomePage;
