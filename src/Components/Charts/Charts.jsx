import React, { useContext, useEffect } from "react";
import "./Charts.css";

import { RevenueContext } from "../../Context/RevenueContext/RevenueContext";
import { ExpenseContext } from "../../Context/ExpenseContext/ExpenseContext";
import { StoreContext } from "../../Context/AuthContext/StoreContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import PieChart from "../PieChart/PieChart";
import ExpensePieChart from "../ExpensePieChart/ExpensePieChart";
import AreaChartExpenses from "../AreaChartExpenses/AreaChartExpenses";
import AreaChartRevenue from "../AreaChartRevenue/AreaChartRevenue";
import VerticalBarChart from "../VerticalBarChart/VerticalBarChart";

// Register Chart.js components ONCE
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const { token } = useContext(StoreContext);
  const { revenues, fetchingRevenueAPI } = useContext(RevenueContext);
  const { expenses, fetchingExpenses } = useContext(ExpenseContext);

  useEffect(() => {
    if (token) {
      fetchingRevenueAPI();
      fetchingExpenses();
    }
  }, [token, fetchingRevenueAPI, fetchingExpenses]);

  const width = window.innerWidth;

  const isDesktop = width > 1200;
  const isTablet = width <= 1200 && width > 768;
  const isMobile = width <= 768 && width > 320;
  const isTiny = width <= 320;

  // Revenue labels (dates)
 const labels = revenues?.map(item => {

    const date = new Date(item.revenueDate);

    if (isTiny)
        return date.getDate();

    if (isMobile)
        return date.toLocaleDateString("en", {
            month: "short",
        });

    return date.toLocaleDateString();

});

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenues?.map((item) => item.amount),
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.3)",
        tension: 0.3,
      },
      {
        label: "Expenses",
        data: expenses?.map((item) => item.amount),
        borderColor: "rgb(239,68,68)",
        backgroundColor: "rgba(239,68,68,0.3)",
        tension: 0.3,
      },
    ],
  };

  

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
        mode: "nearest",
        intersect: false,
    },

    elements: {
        point: {
            radius: isTiny ? 2 : isMobile ? 3 : 5,
            hoverRadius: isTiny ? 5 : 8,
        },

        line: {
            borderWidth: isTiny ? 2 : 3,
        },
    },

    layout: {
        padding: isTiny ? 5 : 15,
    },

    plugins: {

        title: {

            display: true,

            text: isTiny
                ? "Revenue"
                : isMobile
                ? "Revenue & Expenses"
                : "Revenue vs Expenses",

            font: {

                size: isTiny
                    ? 14
                    : isMobile
                    ? 18
                    : isTablet
                    ? 24
                    : 30,

                weight: "bold",

            },

        },

        legend: {

            display: !isTiny,

            position: "bottom",

            labels: {

                boxWidth: isTiny ? 8 : 16,

                padding: isTiny ? 6 : 15,

                font: {

                    size: isTiny
                        ? 10
                        : isMobile
                        ? 12
                        : 16,

                },

            },

        },

        tooltip: {

            enabled: true,

            titleFont: {

                size: isTiny ? 12 : 16,

            },

            bodyFont: {

                size: isTiny ? 12 : 16,

            },

            padding: isTiny ? 8 : 12,

        },

    },

    scales: {

        x: {

            ticks: {

                autoSkip: true,

                maxTicksLimit: isTiny
                    ? 3
                    : isMobile
                    ? 5
                    : 8,

                font: {

                    size: isTiny
                        ? 10
                        : isMobile
                        ? 11
                        : 13,

                },

            },

            grid: {

                display: !isTiny,

            },

        },

        y: {

            ticks: {

                font: {

                    size: isTiny
                        ? 10
                        : isMobile
                        ? 11
                        : 13,

                },

            },

        },

    },

};
  

  return (
    <div className="chart-full-section">
      <div className="chart-container">
        <Line options={options} data={data} />
      </div>
      <div className="pie-chart-container">
        <PieChart />
      </div>
      <div className="pie-chart-expense-container">
        <ExpensePieChart />
      </div>
      <div className="area-chart-expenses">
        <AreaChartExpenses />
      </div>  
      <div className="area-chart-revenue">
        <AreaChartRevenue />
      </div>
      <div className="vertical-chart-container">
        <VerticalBarChart />
      </div>
    </div>
  );
};

export default Charts;