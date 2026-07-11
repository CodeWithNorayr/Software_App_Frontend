import React, { useContext } from "react";
import { ExpenseContext } from "../../Context/ExpenseContext/ExpenseContext";
import "./FetchingExpenses.css";

const FetchingExpenses = () => {

  const { expenses, fetchLoading, deleteExpenseAPI } = useContext(ExpenseContext);


  if (fetchLoading) {
    return (
      <div className="expense-loading">
        <p>Loading expenses...</p>
      </div>
    );
  }


  if (expenses.length === 0) {
    return (
      <div className="no-expense">
        <h3>No Expenses Found</h3>
        <p>Your expense records will appear here.</p>
      </div>
    );
  }


  return (
    <section className="expenses-container">

      <div className="expenses-header">
        <h2>Expense Records</h2>
        <p>Track and manage your business expenses</p>
      </div>


      <div className="expenses-grid">

        {expenses.map((expense) => (

          <div
            className="expense-card"
            key={expense._id}
          >

            <div className="expense-card-header">

              <h3>{expense.title}</h3>

              <span className="expense-category">
                {expense.categories?.[0]?.replace("_", " ")}
              </span>

            </div>


            <p className="expense-description">
              {expense.description}
            </p>


            <div className="expense-details">

              <div className="expense-item">
                <span>Amount</span>
                <strong>
                  ${expense.amount}
                </strong>
              </div>
              
              <div className="expense-item">
                <span>Date</span>
                <strong>
                  {new Date(expense.expenseDate)
                    .toLocaleDateString()}
                </strong>
              </div>
            </div>

            <button className="deleting-expense-button"
                onClick={() => {
                  if (window.confirm("Delete this expense?")) {
                    deleteExpenseAPI(expense._id);
                  }
                }}
              >
                Delete
              </button>

          </div>

        ))}

      </div>

    </section>
  );
};

export default FetchingExpenses;