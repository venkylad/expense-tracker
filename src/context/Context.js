import React, { useContext, useReducer, createContext } from "react";
import { reducer } from "./reducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [];

export const TrackerContext = createContext(initialState);

const TrackerContextProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(reducer, initialState);
  console.log(transactions);

  const addTransaction = (transaction) => {
    return dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const deleteTransaction = (id) => {
    return dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const balance = transactions.reduce(
    (acc, curVal) =>
      curVal.type === "Expense" ? acc - curVal.amount : acc + curVal.amount,
    0
  );

  return (
    <TrackerContext.Provider
      value={{ addTransaction, deleteTransaction, transactions, balance }}
    >
      {children}
    </TrackerContext.Provider>
  );
};
export default TrackerContextProvider;
