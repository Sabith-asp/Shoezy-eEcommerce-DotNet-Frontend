import React from "react";
import "./Carousel.css";
import ImageSlider from "../imageSlider/imageSlider";

const Carousel = () => {
  return (
    <section className="carousel overflow-hidden container-md rounded-5 p-0 d-flex align-items-center">
      <div className="row h-100">
        <div className="left col-6 h-100 d-flex align-items-center">
          <div className="ps-2 ps-md-5 ">
            <h1 className="carousel-head fw-bolder text-white">Lorem </h1>
            <h2 className="text-white fw-bold fs-6 fs-md-2">Lorem ipsum</h2>
            <p className="carousel-para text-white fs-md-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="right h-100 col-6 d-flex align-items-center">
          <ImageSlider />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
