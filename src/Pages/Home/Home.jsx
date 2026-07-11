import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/AuthContext/StoreContext"
import { assets } from "../../assets/assets";
import "./Home.css"
import React, { useContext, useEffect } from 'react'
import { toast } from "react-toastify";
import Charts from "../../Components/Charts/Charts";
import { ExpenseContext } from "../../Context/ExpenseContext/ExpenseContext";

const Home = () => {
  const { token, backendURL, setToken } = useContext(StoreContext);
  const { statement, fetchingStatements } = useContext(ExpenseContext);

  const navigate = useNavigate();

  const logoutFunction = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged out")
    navigate("/user-login");
  }

  useEffect(()=>{
    if(token) {
      fetchingStatements()
    }
  },[token])

  return (
    <div>
      <div className="home-section">
        <div>
          <button type="button" className="finly-company-button">FINLY</button>
        </div>
        <div className="middle-navbar-section">
          <div onClick={() => navigate("/financial-statements")} className="dashboard-section">
            <img className="dashboard-image" src={assets.Dashboard} alt="" />
            <h1 className="dashboard-p">Statements</h1>
          </div>
          <div onClick={() => navigate("/transactions")} className="transactions-section">
            <img className="transaction-image" src={assets.FinStatements} alt="" />
            <h1 className="transactions-p">Transactions</h1>
          </div>
          <div onClick={() => navigate("/revenue-form")} className="revenue-section-1">
            <img className="revenue-image-1" src={assets.Revenue} alt="" />
            <h1 className="revenue-p">Revenue</h1>
          </div>
          <div onClick={() => navigate("/expense-form")} className="expenses-section">
            <img className="expense-image" src={assets.Expense} alt="" />
            <h1 className="expenses-p">Expenses</h1>
          </div>
        </div>
        <div>
          {token ?
            <div onClick={logoutFunction} className="logout-section">
              <img className="logout-image" src={assets.Logout} alt="" />
              <h1 className="logout-p">Logout</h1>
            </div>
            :
            <div className="login-register-section">
              <div className="login-section">
                <img className="login-sect-image" src={assets.Login} alt="" />
                <h1 className="login-p">Login</h1>
              </div>
              <div className="signUp-section">
                <img className="signUp-sect-image" src={assets.SignUp} alt="" />
                <h1 className="signUp-p">SignUp</h1>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="short-summary-section">
          <div className="total-revenue-section-home">
            <p className="total-revenue-section-home-p"><strong style={{color:"blue"}}>Total Revenue</strong> <span>{statement.revenue?.totalRevenue}</span></p>
          </div>
          <div className="total-expenses-section-home">
            <p className="total-expenses-section-home-p"><strong style={{color:"blue"}}>Total Expenses</strong> <span>{statement.expenses?.totalExpenses}</span></p>
          </div>
          <div className="gross-profit-section-home">
            <p className="gross-profit-section-home-p"><strong style={{color:"blue"}}>Gross Profit</strong> <span>{statement.summary?.grossProfit}</span></p>
          </div>
          <div className="tax-section-home">
            <p className="tax-section-home-p"><strong style={{color:"blue"}}> Tax Paid</strong> <span>{statement.summary?.tax}</span></p>
          </div>
          <div className="new-profit-section-home">
            <p className="new-profit-section-home-p"><strong style={{color:"blue"}}>Net Profit</strong> <span>{statement.summary?.netProfit}</span></p>
          </div>
      </div>
      {/* CHARTS LOGIC GOES HERE */}
      <div className="charts-section-home-page">
        <Charts />
      </div>
    </div>
  )
}

export default Home