import React, { useContext, useEffect } from "react";
import "./FinancialStatements.css";
import { ExpenseContext } from "../../Context/ExpenseContext/ExpenseContext";

const FinancialStatements = () => {

  const { statement, fetchingStatements } = useContext(ExpenseContext);

  useEffect(() => {
    fetchingStatements()
  }, [])

  if (!statement) {
    return (
      <div>
        <p>Loading financial statements...</p>
      </div>
    );
  }

  return (
    <div className="full-fin-state-section">
      <div className="fin-sect-title-h1">
        <h1>FINANCIAL STATEMENT</h1>
      </div>
      <div className="financial-statement-page">
        <div className="financial-statement-page-div">
          <div className="financial-statement-section">
            <p>
              <strong>
                Operating Revenue:
                <span>
                  {statement?.revenue?.operatingRevenue}
                </span>
              </strong>
            </p>

            <p>
              <strong>
                Non Operating Revenue:
                <span>
                  {statement?.revenue?.nonOperatingRevenue}
                </span>
              </strong>
            </p>
            <p>
              <strong>
                Financial Revenue
                <span>
                  {statement?.revenue?.financialRevenue}
                </span>
              </strong>
            </p>
            <p>
              <strong>
                Other Revenue
                <span>
                  {statement?.revenue?.otherRevenue}
                </span>
              </strong>
            </p>
            <p>
              <strong>
                Total Revenue
                <span>
                  {statement?.revenue?.totalRevenue}
                </span>
              </strong>
            </p>
          </div>

          <div className="financial-statement-expenses-section">
            <p>
              <strong>
                Cost Of Sales
                <span>
                  {statement?.expenses?.cogs}
                </span>
              </strong>
            </p>
            <p>
              <strong>
                Operating Expenses
                <span>
                  {statement?.expenses?.operatingExpenses}
                </span>
              </strong>
            </p>
            <p>
              <strong>
                Fixed Expenses
                <span>
                  {statement?.expenses?.fixedExpenses}
                </span>
              </strong>
            </p>
            <p>
              <strong>
                Variable Expenses
                <span>
                  {statement?.expenses?.variableExpenses}
                </span>
              </strong>
            </p>
            <p>
              <strong>
                Non-Operating Expenses
                <span>
                  {statement?.expenses?.nonOperatingExpenses}
                </span>
              </strong>
            </p>
            <p>
              <strong>
                Other Expenses
                <span>
                  {statement?.expenses?.otherExpenses}
                </span>
              </strong>
            </p>
            <p>
              <strong>
                Total Expenses
                <span>
                  {statement?.expenses?.totalExpenses}
                </span>
              </strong>
            </p>
          </div>


          <div className="financial-statement-revenue-section">
            <p className="grosss-profit-section-2">
              <strong>
                Gross Profit:
              </strong>
              <span>
                {statement?.summary?.grossProfit}
              </span>
            </p>


            <p>
              <strong>
                Operating Profit:
                <span>
                  {statement?.summary?.operatingProfit}
                </span>
              </strong>
            </p>


            <p>
              <strong>
                Profit Before Tax:
                <span>
                  {statement?.summary?.profitBeforeTax}
                </span>
              </strong>
            </p>


            <p>
              <strong>
                Tax:
                <span>
                  {statement?.summary?.tax}
                </span>
              </strong>
            </p>


            <p>
              <strong>
                Net Profit:
                <span>
                  {statement?.summary?.netProfit}
                </span>
              </strong>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FinancialStatements;