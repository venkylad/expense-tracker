import { useContext } from "react";
import { TrackerContext, transactions } from "./context/Context";
import {
  resetCategories,
  incomeCategories,
  expenseCategories
} from "./constants/categories";

const useTransaction = (title) => {
  resetCategories();
  const { transactions } = useContext(TrackerContext);
  const transactionPerType = transactions.filter(
    (trans) => trans.type === title
  );
  const total = transactionPerType.reduce(
    (acc, calVal) => (acc += calVal.amount),
    0
  );
  const selectedCategory =
    title === "Income" ? incomeCategories : expenseCategories;

  transactionPerType.forEach((trans) => {
    let category = selectedCategory.find((cat) => cat.type === trans.category);
    if (category) {
      category.amount += trans.amount;
    }
  });

  const filteredCategories = selectedCategory.filter((cat) => cat.amount > 0);

  console.log("filter", filteredCategories);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color)
      }
    ],
    labels: filteredCategories.map((c) => c.type)
  };

  return { chartData, total };
};
export default useTransaction;
