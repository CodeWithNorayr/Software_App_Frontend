import React, { useContext } from 'react';
import { RevenueContext } from '../../Context/RevenueContext/RevenueContext';
import { useNavigate } from 'react-router-dom';
import "./FetchingRevenues.css";

const FetchingRevenues = () => {
  
  const {revenues, fetchLoading, deleteRevenueAPI} = useContext(RevenueContext);

  const navigate = useNavigate();
  
  if(fetchLoading) {
    return (
      <div className='expense-loading'>
        <p>Loading revenues ...</p>
      </div>
    )
  }

  if(revenues.length === 0) {
    return (
      <div  className="no-expense">
        <p>No Records</p>
      </div>
    )
  }

  return (
    <section className="expenses-container">

      <div className="expenses-header">
        <h2>Revenue Records</h2>
        <p>Track and manage your business revenues</p>
        <div className='exp-rev-btn'>
          <button id='rev-btn-trans' onClick={() => navigate("/revenues-list")}>Revenues</button>             
          <button id='exp-btn-trans' onClick={() => navigate("/expenses-list")}>Expenses</button>
        </div>
      </div>


      <div className="expenses-grid">

        {revenues.map((revenue) => (

          <div 
            className="expense-card" 
            key={revenue._id}
          >

            <div className="expense-card-header">

              <h3>{revenue.title}</h3>

              <span className="expense-category">
                {revenue.categories?.[0]?.replace("_", " ")}
              </span>

            </div>


            <p className="expense-description">
              {revenue.description}
            </p>


            <div className="expense-details">

              <div className="expense-item">
                <span>Amount</span>
                <strong>
                  ${revenue.amount}
                </strong>
              </div>

              <div className="expense-item">
                <span>Date</span>
                <strong>
                  {new Date(revenue.expenseDate)
                  .toLocaleDateString()}
                </strong>
              </div>
            </div>
            
            <button className="deleting-expense-button"
                onClick={() => {
                  if (window.confirm("Delete this revenue?")) {
                    deleteRevenueAPI(revenue._id);
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
}

export default FetchingRevenues