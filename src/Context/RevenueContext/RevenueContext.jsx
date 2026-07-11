import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../AuthContext/StoreContext";
import { useParams } from "react-router-dom";

export const RevenueContext = createContext(null);

export const RevenueContextProvider = ({ children }) => {

  const {id} = useParams();

  const backendURL = "http://localhost:3000";

  const { token, setToken } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);

  const [revenue, setRevenue] = useState({
    title: "",
    description: "",
    amount: null,
    revenueDate: "",
    categories: []
  });

  const [revenues, setRevenues] = useState([]);

  const createRevenueAPI = async (e) => {
    e.preventDefault()
    setCreateLoading(true);
    // setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/revenue/create-revenue`, revenue, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data) {
        toast.success("Revenue is created successfully");
        setRevenues((prev) => ([...prev, response.data]));
        setRevenue({
          title: "",
          description: "",
          amount: 0,
          revenueDate: "",
          categories: [],
        });
      }
    } catch (error) {
      toast.error("No revenue is fetched")
    } finally {
      setCreateLoading(false);
      // setLoading(false)
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setRevenue((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? Number(value)
          : name === "categories"
            ? [value] // <-- wrap the selected value in an array
            : value,
    }));
  };

  const fetchingRevenueAPI = useCallback(async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
  
    setFetchLoading(true);
  
    try {
      const response = await axios.get(
        `${backendURL}/revenue/revenues-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data) {
        setRevenues(response.data);
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setFetchLoading(false);
    }
  }, [token, backendURL]);

  useEffect(() => {
    if (token) {
      fetchingRevenueAPI()
    }
  }, [token])

  const deleteRevenueAPI = async (id) => {
    try {
      const response = await axios.delete(`${backendURL}/revenue/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data) {
        toast.success("deleted");
        setRevenues((prev)=>prev.filter((revenue)=>revenue._id !== id))
      }
    } catch (error) {
      toast.error("Server Error");
    }
  }

  const value = {
    onChangeHandler, createRevenueAPI, revenue, setRevenue, loading, setLoading, fetchingRevenueAPI, revenues, deleteRevenueAPI
  };

  return (
    <RevenueContext.Provider value={value}>
      {children}
    </RevenueContext.Provider>
  );
};