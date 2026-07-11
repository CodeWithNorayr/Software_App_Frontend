import React, { useContext, useEffect, useMemo, useState } from "react";
import "./PieChart.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

import { RevenueContext } from "../../Context/RevenueContext/RevenueContext";
import { StoreContext } from "../../Context/AuthContext/StoreContext";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



const PieChart = () => {


  const { token } = useContext(StoreContext);

  const {
    revenues,
    fetchingRevenueAPI
  } = useContext(RevenueContext);



  const [width, setWidth] = useState(window.innerWidth);



  useEffect(() => {


    const resize = () => {

      setWidth(window.innerWidth);

    };


    window.addEventListener(
      "resize",
      resize
    );


    return () => {

      window.removeEventListener(
        "resize",
        resize
      );

    };


  }, []);



  useEffect(() => {


    if (token) {

      fetchingRevenueAPI();

    }


  }, [
    token,
    fetchingRevenueAPI
  ]);





  const isDesktop = width > 1200;

  const isTablet = width <= 1200 && width > 768;

  const isMobile = width <= 768 && width > 360;

  const isSmall = width <= 360;

  const isTiny = width <= 250;





  const revenueTotals = {


    Operating_Revenue: 0,

    "Non-Operating_Revenue": 0,

    Financial_Revenue: 0,

    Other_Revenue: 0,


  };




  revenues?.forEach((revenue) => {


    revenue.categories?.forEach((category) => {


      if (revenueTotals.hasOwnProperty(category)) {


        revenueTotals[category] += Number(revenue.amount);


      }


    });


  });





  const data = useMemo(() => ({


    labels: [

      "Operating Revenue",

      "Non-Operating Revenue",

      "Financial Revenue",

      "Other Revenue",

    ],



    datasets: [


      {


        label: "Revenue",


        data: [

          revenueTotals.Operating_Revenue,

          revenueTotals["Non-Operating_Revenue"],

          revenueTotals.Financial_Revenue,

          revenueTotals.Other_Revenue,

        ],



        backgroundColor: [

          "#22c55e",

          "#3b82f6",

          "#f59e0b",

          "#ef4444",

        ],



        borderColor: "#fff",


        borderWidth: 2,


        hoverOffset:

          isTiny ? 8 :
            isSmall ? 12 :
              20,


      }


    ]



  }), [revenues, width]);






  const options = {


    responsive: true,


    maintainAspectRatio: false,


    interaction: {


      mode: "nearest",


      intersect: true,


    },



    layout: {


      padding:


        isTiny ? 0 :

          isSmall ? 4 :

            15,


    },



    plugins: {



      title: {


        display: true,


        text:

          isTiny

            ? "Revenue"

            :

            "Revenue Distribution",




        font: {


          size:

            isTiny ? 4 :

              isSmall ? 10 :

                isMobile ? 18 :

                  24,


          weight: "bold"


        }


      },






      legend: {



        display: !isTiny,



        position:

          isDesktop

            ? "right"

            : "bottom",




        labels: {



          boxWidth:


            isTiny ? 4 :

              isSmall ? 6 :

                16,




          padding:


            isTiny ? 0 :

              10,




          font: {



            size:


              isTiny ? 4 :

                isSmall ? 6 :

                  isMobile ? 12 :

                    16,




            weight: "bold"


          }



        }


      },







      tooltip: {

        enabled: true,
    
        titleFont: {
    
            size:
                isTiny ? 4 :
                isSmall ? 6 :
                isMobile ? 11 :
                16,
    
            weight: "bold",
    
        },
    
    
        bodyFont: {
    
            size:
                isTiny ? 4 :
                isSmall ? 6 :
                isMobile ? 11 :
                14,
    
        },
    
    
        padding:
            isTiny ? 5 :
            isSmall ? 6 :
            isMobile ? 8 :
            12,
    
    
        callbacks: {
    
            title: (items) => {
    
                if(window.innerWidth <= 360){
    
                    const shortLabels = {
    
                        "Operating Revenue": "Operating",
    
                        "Non-Operating Revenue": "Non-Operating",
    
                        "Financial Revenue": "Financial",
    
                        "Other Revenue": "Other",
    
                    };
    
    
                    return shortLabels[items[0].label] || items[0].label;
    
                }
    
    
                return items[0].label;
    
            },
    
    
            label: (context) => {
    
    
                if(window.innerWidth <= 360){
    
                    return "$ " + 
                    context.raw.toLocaleString();
    
                }
    
    
                return (
                    context.dataset.label +
                    ": $" +
                    context.raw.toLocaleString()
                );
    
            }
    
        }
    
      }
    }
  };





  return (

    <div className="pie-chart-container-revenue">


      <Pie

        data={data}

        options={options}

      />


    </div>

  );


};


export default PieChart;