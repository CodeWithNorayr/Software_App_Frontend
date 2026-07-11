import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import "./ExpensePieChart.css";


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";


import { Pie } from "react-chartjs-2";


import { ExpenseContext } from "../../Context/ExpenseContext/ExpenseContext";
import { StoreContext } from "../../Context/AuthContext/StoreContext";



ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);





const ExpensePieChart = () => {



  const { token } = useContext(StoreContext);



  const {
    expenses,
    fetchingExpenses
  } = useContext(ExpenseContext);




  const [width,setWidth] = useState(window.innerWidth);





  useEffect(()=>{


    const resize = ()=>{


      setWidth(window.innerWidth);


    };



    window.addEventListener(
      "resize",
      resize
    );



    return()=>{


      window.removeEventListener(
        "resize",
        resize
      );


    };


  },[]);






  useEffect(()=>{


    if(token){

      fetchingExpenses();

    }


  },[
    token,
    fetchingExpenses
  ]);








  const isDesktop = width > 1200;

  const isTablet = width <= 1200 && width > 768;

  const isMobile = width <= 768 && width > 360;

  const isSmall = width <= 360;

  const isTiny = width <= 250;









  const expenseTotals = {


    COGS:0,

    Operating_Expenses:0,

    Fixed_Expenses:0,

    Variable_Expenses:0,

    "Non-Operating_Expenses":0,

    Other_Expenses:0,


  };








  expenses?.forEach((expense)=>{


    const amount = Number(expense.amount) || 0;



    expense.categories?.forEach((category)=>{


      const normalizedCategory = category
      .trim()
      .replaceAll("-","_")
      .replaceAll(" ","_");





      if(normalizedCategory === "Non_Operating_Expenses"){


        expenseTotals["Non-Operating_Expenses"] += amount;


      }


      else if(expenseTotals[normalizedCategory] !== undefined){


        expenseTotals[normalizedCategory] += amount;


      }



    });



  });









  const data = useMemo(()=>({



    labels:[


      "COGS",

      "Operating Expenses",

      "Fixed Expenses",

      "Variable Expenses",

      "Non Operating Expenses",

      "Other Expenses"



    ],





    datasets:[



      {


        label:"Expenses",



        data:[


          expenseTotals.COGS,

          expenseTotals.Operating_Expenses,

          expenseTotals.Fixed_Expenses,

          expenseTotals.Variable_Expenses,

          expenseTotals["Non-Operating_Expenses"],

          expenseTotals.Other_Expenses,


        ],





        backgroundColor:[


          "#22c55e",

          "#3b82f6",

          "#f59e0b",

          "#ef4444",

          "#a855f7",

          "#14b8a6"


        ],





        borderColor:"#fff",


        borderWidth:2,




        hoverOffset:


          isTiny ? 8 :

          isSmall ? 12 :

          20,



      }


    ]



  }),[expenses,width]);












  const options = {



    responsive:true,


    maintainAspectRatio:false,




    interaction:{


      mode:"nearest",

      intersect:true,


    },





    layout:{


      padding:


        isTiny ? 0 :

        isSmall ? 4 :

        15,


    },







    plugins:{






      title:{


        display:true,



        text:


          isTiny

          ? "Expenses"

          : "Expense Distribution",






        font:{


          size:


            isTiny ? 6 :

            isSmall ? 10 :

            isMobile ? 18 :

            24,



          weight:"bold"


        }



      },









      legend:{



        display: !isTiny,





        position:



          isDesktop

          ? "right"

          : "bottom",







        labels:{



          boxWidth:


            isTiny ? 8 :

            isSmall ? 10 :

            16,





          padding:


            isTiny ? 5 :

            10,





          font:{



            size:


              isTiny ? 4 :

              isSmall ? 8 :

              isMobile ? 12 :

              16,




            weight:"bold"


          }



        }



      },









      tooltip:{



        enabled:true,





        titleFont:{


          size:


            isTiny ? 4 :

            isSmall ? 8 :

            isMobile ? 11 :

            16,



          weight:"bold"


        },






        bodyFont:{



          size:


            isTiny ? 6 :

            isSmall ? 8 :

            isMobile ? 11 :

            14,


        },







        padding:


          isTiny ? 0 :

          isSmall ? 6 :

          isMobile ? 8 :

          12,








        callbacks:{



          title:(items)=>{



            if(window.innerWidth <=360){



              const shortLabels={


                "Operating Expenses":"Operating",

                "Fixed Expenses":"Fixed",

                "Variable Expenses":"Variable",

                "Non Operating Expenses":"Non-Operating",

                "Other Expenses":"Other",

                "COGS":"COGS"


              };



              return shortLabels[items[0].label] || items[0].label;


            }



            return items[0].label;


          },







          label:(context)=>{



            if(window.innerWidth <=360){



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



    <div className="expense-pie-chart-container">


      <Pie

        data={data}

        options={options}

      />


    </div>


  );



};




export default ExpensePieChart;