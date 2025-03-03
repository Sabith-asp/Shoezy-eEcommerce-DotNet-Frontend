import React, { useContext, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularChart = () => {
  //   const { products } = useContext(AdminContext);
  const { products } = useSelector((state) => state.admin);
  console.log(products);

  const shoeCategoryCount = (category) =>
    products.filter((product) => product.category === category).length;

  const boots = shoeCategoryCount("Boots");
  const walking = shoeCategoryCount("walking");
  const running = shoeCategoryCount("running");
  const hiking = shoeCategoryCount("hiking");
  const skate = shoeCategoryCount("skate");
  const sports = shoeCategoryCount("Sports");

  const data = {
    labels: [
      `Boots ${boots}`,
      `Walking ${walking}`,
      `Running ${running}`,
      `Hiking ${hiking}`,
      `Skate ${skate}`,
      `Sports ${sports}`,
    ],
    datasets: [
      {
        label: "Shoe Categories",
        data: [boots, walking, running, hiking, skate, sports],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default CircularChart;
