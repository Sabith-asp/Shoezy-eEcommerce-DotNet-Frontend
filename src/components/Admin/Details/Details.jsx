import React, { useContext } from "react";
import "./Details.css";
import CountUp from "react-countup";
import { AdminContext } from "../../../context/AdminProvider";

const Details = () => {
  const { products, users } = useContext(AdminContext);
  const salesAmount = users.reduce((totalAmount, user) => {
    const userTotal = user.order.reduce((sum, order) => sum + order.total, 0);
    return totalAmount + userTotal;
  }, 0);

  const totalStocks = products?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  //   const salesAmount=users.reduce((acc,user.order.)=>acc+curr)
  return (
    <div className="container-fluid p-1">
      <h3 className=" fw-semibold mt-3">Details</h3>
      <div className="row">
        <div className="col-6 col-md-5 mb-3">
          <div
            style={{
              backgroundColor: "#1ac6e5",
              height: "90px",
              border: " 2px solid black",
            }}
            className="statics p-2 rounded-4  d-flex flex-column justify-content-center "
          >
            <h2 className="mb-0 mt-2 fw-bolder">
              <CountUp start={0} end={products.length} duration={2} />
            </h2>
            <h5 className="fw-bold">Products</h5>
          </div>
        </div>
        <div className="col-6 col-md-5 mb-3">
          <div
            style={{
              backgroundColor: "#FE5E41",
              height: "90px",
              border: " 2px solid black",
            }}
            className="statics p-2 rounded-4 d-flex flex-column justify-content-center"
          >
            <h2 className="mb-0 mt-2 fw-bolder">
              <CountUp start={0} end={users.length} duration={2} />
            </h2>
            <h5 className="fw-bold">Users</h5>
          </div>
        </div>
        <div className="col-6 col-md-5 mb-3">
          <div
            style={{
              backgroundColor: "#00A878",
              height: "90px",
              border: " 2px solid black",
            }}
            className=" statics p-2 rounded-4 d-flex flex-column justify-content-center"
          >
            <h2 className="mb-0 mt-2 fw-bolder">
              ₹<CountUp start={0} end={salesAmount} duration={2} />+
            </h2>
            <h5 className="fw-bold">Sales</h5>
          </div>
        </div>
        <div className="col-6 col-md-5 mb-3">
          <div
            style={{
              backgroundColor: "#04395E",
              height: "90px",
              border: " 2px solid black",
            }}
            className="statics p-2 rounded-4 d-flex flex-column justify-content-center"
          >
            <h2 className="mb-0 mt-2 fw-bolder">
              <CountUp start={0} end={totalStocks} duration={2} />+
            </h2>
            <h5 className="fw-bold">Stocks</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
