import "./banner.css";

const Banner = () => {
  return (
    <section id="banner">
      <img className="banner-img" src="./images/banner1.jpg" alt="Banner" />
      <div className="banner-group-text">
        <p className="banner-introduce">New Inspiration 2020</p>
        <h3 className="banner-sale">20% off on new season</h3>
        <button className="banner-button">Browse collections</button>
      </div>
    </section>
  );
};

export default Banner;
