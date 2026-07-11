import axios from "axios";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { StoreContext } from "../AuthContext/StoreContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const ExpenseContext = createContext(null);

export const ExpenseContextProvider = ({ children }) => {

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(false);

  const { backendURL, token } = useContext(StoreContext);

  const [expense, setExpense] = useState({
    title: "",
    description: "",
    amount: "",
    expenseDate: "",
    categories: []
  });

  const [expenses, setExpenses] = useState([]);

  const [statement, setStatement] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setExpense((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? Number(value)
          : name === "categories"
            ? [value]
            : value
    }));
  };


  // ********** CREATING EXPENSE **********
  const createExpenseAPI = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first");
      return;
    }

    setCreateLoading(true);
    // setLoading(true);

    try {

      const response = await axios.post(
        `${backendURL}/expense/create-expense`,
        expense,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data) {

        toast.success("Expense created successfully");

        setExpenses((prev) => [...prev, response.data]);

        setExpense({
          title: "",
          description: "",
          amount: "",
          expenseDate: "",
          categories: []
        });

      }

    } catch (error) {

      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Server Error"
      );

    } finally {
      setCreateLoading(false);
      // setLoading(false);
    }
  };

  // ******** FETCHING EXPENSES *********
  const fetchingExpenses = useCallback(async () => {

    if (!token) {
      toast.error("Please login first");
      return;
    }

    setFetchLoading(true);
    // setLoading(true);
    try {
      const response = await axios.get(`${backendURL}/expense/expenses-list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data) {
        setExpenses(response.data);
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setFetchLoading(false);
      // setLoading(false)
    }
  },[token,backendURL])

  useEffect(() => {
    if (token) {
      fetchingExpenses();
    }
  }, [token]);


  // ********* DELETING EXPENSE **********
  const deleteExpenseAPI = async (id) => {
    try {
      const response = await axios.delete(`${backendURL}/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data) {
        toast.success("deleted");
        setExpenses((prev) =>
          prev.filter((expense) => expense._id !== id)
        );
      }
    } catch (error) {
      toast.error("Server Error");
    }
  }

  // ******** FETCHING STATEMENTS **********
  const fetchingStatements = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendURL}/expense/financial-statements`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.data) {
        setStatement(response.data);
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(token) {
      fetchingStatements()
    }
  },[token])

  return (
    <ExpenseContext.Provider
      value={{
        expense,
        loading,
        onChangeHandler,
        createExpenseAPI,
        fetchingExpenses,
        expenses,
        setExpenses,
        createLoading,
        fetchLoading,
        deleteExpenseAPI,
        fetchingStatements,
        statement
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};