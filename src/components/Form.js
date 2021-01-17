import React, { useContext, useState, useEffect } from "react";
import { incomeCategories, expenseCategories } from "../constants/categories";
import { TrackerContext } from "../context/Context";
import { v4 as uuid } from "uuid";
import { useSpeechContext } from "@speechly/react-client";
import ListUp from "./ListUp";

const initialState = {
  type: "Income",
  category: "",
  amount: "",
  date: new Date().toLocaleDateString
};

const Form = () => {
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useContext(TrackerContext);
  const { segment } = useSpeechContext();

  const selectedCategory =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount))) {
      return;
    }
    let transactionsMade = {
      ...formData,
      amount: Number(formData.amount),
      id: uuid()
    };
    addTransaction(transactionsMade);
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.final &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.final &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLocaleLowerCase()}`;
        switch (e.type) {
          case "amount":
            return setFormData({ ...formData, amount: e.value });
          case "category":
            if (incomeCategories.map((ic) => ic.type).includes(category)) {
              return setFormData({ ...formData, category, type: "Income" });
            } else if (
              expenseCategories.map((ec) => ec.type).includes(category)
            ) {
              return setFormData({ ...formData, category, type: "Expense" });
            }
            break;
          case "date":
            return setFormData({ ...formData, date: e.value });
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.type &&
        formData.amount &&
        formData.category &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  return (
    <div>
      <h5 className="card-subtitle m-2">
        {segment && segment.words.map((word) => word.value).join(" ")}
      </h5>
      <hr />
      <select
        className="form-control form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      >
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <select
        className="form-control form-select form-select-sm mb-3"
        aria-label=".form-select-sm example"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        {selectedCategory.map((category) => (
          <option value={category.type} key={category.type}>
            {category.type}
          </option>
        ))}
      </select>
      <div className="input-group mb-3">
        <span className="input-group-text">$</span>
        <input
          type="number"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          required
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <span className="input-group-text">.00</span>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Date</span>
        <input
          type="date"
          className="form-control"
          date-format="mm-dd-yyyy"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <button
        type="button"
        className="btn btn-dark btn-block m-auto"
        onClick={createTransaction}
      >
        Create Transaction
      </button>

      <ListUp />
    </div>
  );
};
export default Form;
