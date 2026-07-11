import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import "./AreaChartRevenue.css";


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


import { StoreContext } from "../../Context/AuthContext/StoreContext";
import { RevenueContext } from "../../Context/RevenueContext/RevenueContext";



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






const AreaChartRevenue = () => {



  const { token } = useContext(StoreContext);



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

      fetchingRevenueAPI();

    }


  },[
    token,
    fetchingRevenueAPI
  ]);







  const isDesktop = width > 1200;

  const isTablet = width <=1200 && width>768;

  const isMobile = width <=768 && width>360;

  const isSmall = width <=360;

  const isTiny = width <=250;










  const revenueTotals = {



    Operating_Revenue:0,


    "Non-Operating_Revenue":0,


    Financial_Revenue:0,


    Other_Revenue:0,


  };








  revenues.forEach((revenue)=>{


    revenue.categories?.forEach((category)=>{


      if(
        revenueTotals.hasOwnProperty(category)
      ){


        revenueTotals[category] +=
        Number(revenue.amount) || 0;


      }


    });



  });









  const labels = useMemo(()=>{


    if(isTiny || isSmall){


      return [


        "Operating",

        "Non-Operating",

        "Financial",

        "Other"


      ];


    }




    return [


      "Operating Revenue",

      "Non-Operating Revenue",

      "Financial Revenue",

      "Other Revenue"


    ];



  },[width]);












  const data = useMemo(()=>({



    labels,



    datasets:[



      {


        fill:true,


        label:"Revenue",



        data:[


          revenueTotals.Operating_Revenue,


          revenueTotals["Non-Operating_Revenue"],


          revenueTotals.Financial_Revenue,


          revenueTotals.Other_Revenue,


        ],





        borderColor:
        "rgb(53,162,235)",




        backgroundColor:
        "rgba(53,162,235,0.5)",




        tension:0.4,



        pointRadius:


          isTiny ? 2 :

          isSmall ? 3 :

          5,


      }



    ]



  }),[
    revenues,
    width
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

          ? "Revenue"

          :"Revenue Distribution",






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



    <div className="revenue-area-chart-container">


      <Line

        options={options}

        data={data}

      />


    </div>


  );


};




export default AreaChartRevenue;