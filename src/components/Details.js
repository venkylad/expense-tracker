import React from "react";
import { Doughnut } from "react-chartjs-2";
import useTransaction from "../useTransaction";

const Details = ({ title }) => {
  const { chartData, total } = useTransaction(title);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-1 text-muted">{total}</h6>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};
export default Details;
