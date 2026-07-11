import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import "./AreaChartExpenses.css";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";


import { Line } from "react-chartjs-2";


import { ExpenseContext } from "../../Context/ExpenseContext/ExpenseContext";
import { StoreContext } from "../../Context/AuthContext/StoreContext";



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);






const AreaChartExpenses = () => {



  const { token } = useContext(StoreContext);



  const {
    expenses=[],
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

  const isTablet = width <=1200 && width>768;

  const isMobile = width <=768 && width>360;

  const isSmall = width <=360;

  const isTiny = width <=250;









  const expenseTotals = {


    COGS:0,


    Operating_Expenses:0,


    Fixed_Expenses:0,


    Variable_Expenses:0,


    "Non-Operating_Expenses":0,


    Other_Expenses:0,


  };








  expenses.forEach((expense)=>{


    const amount =
    Number(expense.amount) || 0;




    expense.categories?.forEach((category)=>{


      const normalizedCategory =
      category
      .trim()
      .replaceAll("-","_")
      .replaceAll(" ","_");




      if(
        normalizedCategory ===
        "Non_Operating_Expenses"
      ){


        expenseTotals["Non-Operating_Expenses"]
        += amount;


      }



      else if(
        expenseTotals[normalizedCategory] !== undefined
      ){


        expenseTotals[normalizedCategory]
        += amount;


      }



    });



  });










  const labels = useMemo(()=>{


    if(isTiny || isSmall){


      return [

        "COGS",

        "Operating",

        "Fixed",

        "Variable",

        "Non Op.",

        "Other"

      ];


    }




    return [


      "COGS",

      "Operating Expenses",

      "Fixed Expenses",

      "Variable Expenses",

      "Non Operating Expenses",

      "Other Expenses"


    ];



  },[width]);













  const data = useMemo(()=>({



    labels,



    datasets:[



      {


        fill:true,



        label:"Expense Chart",




        data:[


          expenseTotals.COGS,


          expenseTotals.Operating_Expenses,


          expenseTotals.Fixed_Expenses,


          expenseTotals.Variable_Expenses,


          expenseTotals["Non-Operating_Expenses"],


          expenseTotals.Other_Expenses,


        ],





        borderColor:
        "rgb(239,68,68)",




        backgroundColor:
        "rgba(239,68,68,0.4)",




        tension:0.4,




        pointRadius:


          isTiny ? 2 :

          isSmall ? 3 :

          5,



      }



    ]



  }),[
    expenses,
    width
  ]);












  const options = {



    responsive:true,


    maintainAspectRatio:false,






    interaction:{


      mode:"index",


      intersect:false,


    },










    plugins:{






      legend:{



        display:!isTiny,



        position:



          isDesktop

          ? "top"

          :"bottom",





        labels:{



          boxWidth:


            isTiny ? 8 :

            isSmall ? 10 :

            12,




          padding:


            isTiny ? 5 :

            10,





          font:{



            size:


              isTiny ? 7 :

              isSmall ? 10 :

              isMobile ? 12 :

              16,




            weight:"bold"


          }



        }



      },









      title:{



        display:true,



        text:



          isTiny

          ? "Expenses"

          :"Expense Distribution",






        font:{



          size:


            isTiny ? 10 :

            isSmall ? 15 :

            isMobile ? 18 :

            24,



          weight:"bold"


        }



      },











      tooltip:{



        titleFont:{



          size:


            isTiny ? 8 :

            isSmall ? 10 :

            isMobile ? 12 :

            16,



          weight:"bold"


        },







        bodyFont:{



          size:


            isTiny ? 9 :

            isSmall ? 10 :

            isMobile ? 12 :

            14,


        },






        padding:


          isTiny ? 5 :

          isSmall ? 7 :

          12,




        callbacks:{



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





    },









    scales:{





      y:{



        beginAtZero:true,



        ticks:{



          font:{



            size:


              isTiny ? 7 :

              isSmall ? 9 :

              isMobile ? 11 :

              14,


          }



        }



      },








      x:{



        ticks:{



          maxRotation:


            isTiny ? 90 :

            isSmall ? 45 :

            0,




          minRotation:


            isTiny ? 90 :

            isSmall ? 45 :

            0,




          autoSkip:false,






          font:{



            size:


              isTiny ? 7 :

              isSmall ? 9 :

              isMobile ? 11 :

              14,


          }



        }



      }



    }



  };









  return (


    <div className="expense-area-chart-container">


      <Line

        options={options}

        data={data}

      />


    </div>


  );


};



export default AreaChartExpenses;