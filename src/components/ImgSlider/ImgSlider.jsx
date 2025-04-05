// src/ImgSlider.js
import React, { useState, useEffect } from "react";
import "./ImgSlider.css";

const images = [
  "https://images.puma.com/image/upload/f_auto,q_auto/global/380176/01/sv01/fnd/PNA/fmt/png/Cali-Star-Shoes",
  "https://images.puma.com/image/upload/f_auto,q_auto/global/371570/01/sv01/fnd/PNA/fmt/png/RS-X3-Puzzle-Shoes",
  "https://static.nike.com/a/images/f_png,q_auto,w_500,h_500,c_pad/pysqd15onjaeugu8mh4l/AH8050_005_A_PREM",
];

const ImgSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImgSlider;
