import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import "./VerticalBarChart.css";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


import { Bar } from "react-chartjs-2";


import { StoreContext } from "../../Context/AuthContext/StoreContext";
import { ExpenseContext } from "../../Context/ExpenseContext/ExpenseContext";
import { RevenueContext } from "../../Context/RevenueContext/RevenueContext";



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);






const VerticalBarChart = () => {



  const {token} = useContext(StoreContext);


  const {
    expenses=[],
    fetchingExpenses
  } = useContext(ExpenseContext);



  const {
    revenues=[],
    fetchingRevenueAPI
  } = useContext(RevenueContext);





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

      fetchingRevenueAPI();

    }


  },[
    token,
    fetchingExpenses,
    fetchingRevenueAPI
  ]);







  const isDesktop = width > 1200;

  const isTablet = width <=1200 && width>768;

  const isMobile = width <=768 && width>360;

  const isSmall = width <=360;

  const isTiny = width <=250;









  const labels = useMemo(()=>{


    const dates = revenues.map((item)=>

      new Date(item.revenueDate)

    );



    return dates.map((date)=>{


      if(isTiny || isSmall){


        return date.toLocaleDateString(
          "en-US",
          {
            month:"short",
            day:"numeric"
          }
        );


      }



      return date.toLocaleDateString();



    });



  },[
    revenues,
    width
  ]);










  const chartData = useMemo(()=>({



    labels,



    datasets:[



      {


        label:"Expenses",



        data: expenses.map(
          expense=>Number(expense.amount)
        ),




        backgroundColor:
        "rgba(255,99,132,0.5)",


        borderRadius:6


      },





      {


        label:"Revenues",



        data: revenues.map(
          revenue=>Number(revenue.amount)
        ),





        backgroundColor:
        "rgba(53,162,235,0.5)",


        borderRadius:6


      }



    ]



  }),[
    labels,
    expenses,
    revenues
  ]);









  const options = {



    responsive:true,



    maintainAspectRatio:false,





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

            15,




          font:{



            size:


              isTiny ? 7 :

              isSmall ? 10 :

              isMobile ? 12 :

              15,



            weight:"bold"


          }



        }



      },








      title:{



        display:true,



        text:



          isTiny

          ? "Finance"

          :"Expenses vs Revenues",






        font:{



          size:


            isTiny ? 10 :

            isSmall ? 14 :

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



        ticks:{



          font:{



            size:


              isTiny ? 7 :

              isSmall ? 9 :

              isMobile ? 11 :

              14,



            weight:"bold"


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





          font:{



            size:


              isTiny ? 7 :

              isSmall ? 9 :

              isMobile ? 11 :

              14,



            weight:"bold"


          }



        }


      }



    }



  };








  return (


    <div className="vertical-bar-chart-container">


      <Bar

        options={options}

        data={chartData}

      />


    </div>


  );


};



export default VerticalBarChart;