import React from "react";
import { SiAdidas, SiNike, SiPuma, SiNewbalance } from "react-icons/si";
import "./Brands.css";

const Brands = () => {
  return (
    <section className="brands container-md p-0">
      <h1 className="fw-bold text-center my-2 my-md-3">BrandS</h1>
      <div className="row m-auto">
        <div className="col-6 col-sm-3 p-0 disp">
          <div className="brands-sub d-flex flex-column justify-content-center align-items-center m-1 m-md-2 text-white  rounded-4">
            <SiAdidas className="fs-1" />
            <h4>Adidas</h4>
          </div>
        </div>
        <div className="col-6 col-sm-3 p-0 ">
          <div className="brands-sub d-flex flex-column justify-content-center align-items-center m-1 m-md-2 text-white rounded-4">
            <SiPuma className="fs-1" />
            <h4>PUMA</h4>
          </div>
        </div>
        <div className="col-6 col-sm-3 p-0 ">
          <div className="brands-sub d-flex flex-column justify-content-center align-items-center m-1 m-md-2 text-white rounded-4">
            <SiNike className="fs-1" />
            <h4>NIKE</h4>
          </div>
        </div>
        <div className="col-6 col-sm-3 p-0 ">
          <div className="brands-sub d-flex flex-column justify-content-center align-items-center m-1 m-md-2 text-white rounded-4">
            <SiNewbalance className="fs-1" />
            <h4>NB</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
