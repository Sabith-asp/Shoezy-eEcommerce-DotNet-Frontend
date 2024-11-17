import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import "./Home.css";
import Brands from "../../components/Brands/Brands";
import Latest from "../../components/Latest/Latest";

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <Brands />
      <Latest />
    </div>
  );
};

export default Home;
