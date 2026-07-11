import React, { useContext, useEffect, useState } from "react";
import "./Expenses.css";
import { ExpenseContext } from "../../Context/ExpenseContext/ExpenseContext";
import { assets } from "../../assets/assets";

const Expenses = () => {

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const slides = [
    {
      image: assets.Expense1
    },
    {
      image: assets.Expense2
    },
    {
      image: assets.Expense3
    }
  ]

  
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length)
        setFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(interval);
  }, [])

  const {
    onChangeHandler,
    createExpenseAPI,
    expense,
    loading,
    createLoading
  } = useContext(ExpenseContext);

  return (
    <div className="revenue-section-full">
      <div className="revenue-image-section">
        <img
          src={slides[index].image}
          alt=""
          className={`revenue-image ${fade ? "fade-in" : "fade-out"}`}
        />
      </div>
    <form className="revenue-form-section" onSubmit={createExpenseAPI}>
      <div className="revenue-div-section">

        <div className="purpose-section">
          <p>Purpose</p>
          <input
            type="text"
            name="title"
            id="title"
            value={expense.title}
            onChange={onChangeHandler}
            placeholder="Target"
            required
          />
        </div>

        <div className="description-section">
          <p>Description</p>
          <textarea
            name="description"
            id="description"
            value={expense.description}
            onChange={onChangeHandler}
            placeholder="Describe transaction with a few words"
            required
          />
        </div>

        <div className="amount-section">
          <p>Amount</p>
          <input
            type="number"
            name="amount"
            id="amount"
            value={expense.amount}
            onChange={onChangeHandler}
            placeholder="$20"
            required
          />
        </div>

        <div className="date-section">
          <p>Transaction Date</p>
          <input
            type="date"
            name="expenseDate"
            id="expenseDate"
            value={expense.expenseDate}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="categories-section">
          <select
            name="categories"
            value={expense.categories[0] || ""}
            onChange={onChangeHandler}
            required
          >
            <option value="">Select category</option>
            <option value="COGS">COGS</option>
            <option value="Operating_Expenses">Operating Expenses</option>
            <option value="Fixed_Expenses">Fixed Expenses</option>
            <option value="Variable_Expenses">Variable Expenses</option>
            <option value="Non_Operating_Expenses">Non-Operating Expenses</option>
            <option value="Other_Expenses">Other Expenses</option>
          </select>
        </div>

        <div className="button-section">
          <button className="btn-section-revenue" type="submit">
            {createLoading ? "Loading..." : "Add"}
          </button>
        </div>

      </div>
    </form>
    </div>
  );
};

export default Expenses;