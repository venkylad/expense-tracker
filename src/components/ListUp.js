import React, { useContext } from "react";
import { TrackerContext } from "../context/Context";

const ListUp = () => {
  const { transactions, deleteTransaction } = useContext(TrackerContext);

  return (
    <div>
      <ul className="list-group list-group-flush mt-3 m-1">
        {transactions.map((trans) => (
          <li
            className={
              trans.type === "Income"
                ? "list-group-item bg-success bg-gradient mb-1"
                : "list-group-item bg-danger bg-gradient mb-1"
            }
            key={trans.id}
          >
            <h3 className="text-white ml-4">
              <button
                className="btn btn-outline-dark m-4"
                onClick={() => deleteTransaction(trans.id)}
              >
                X
              </button>
              {trans.category} -
              <small className="text-white">
                <strong>${trans.amount}</strong> - {trans.date}
              </small>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListUp;
