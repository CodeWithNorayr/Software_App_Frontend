import React from 'react'
import UserRegistration from './Components/UserRegistration/UserRegistration'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from "react-router-dom";
import UserLogin from './Components/UserLogin/UserLogin';
import UserDelete from './Components/UserDelete/UserDelete';
import UserUpdate from './Components/UserUpdate/UserUpdate';
import Home from './Pages/Home/Home';
import UserProtectedRoute from './Components/UserProtectedRoute/UserProtectedRoute';
import Revenue from './Pages/Revenue/Revenue';
import Expenses from './Pages/Expenses/Expenses';
import FetchingExpenses from './Pages/FetchingExpenses/FetchingExpenses';
import FetchingRevenues from './Pages/FetchingRevenues/FetchingRevenues';
import RevenueUpdate from './Pages/RevenueUpdate/RevenueUpdate';
import FinancialStatements from './Pages/FinancialStatements/FinancialStatements';
import Transactions from './Pages/Transactions/Transactions';

const App = () => {
  return (    
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/user-registration' element={<UserRegistration />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-delete/:id' element={<UserProtectedRoute><UserDelete /></UserProtectedRoute>} />
        <Route path='/user-update/:id' element={<UserProtectedRoute><UserUpdate /></UserProtectedRoute>} />
        <Route path='/home-page' element={<UserProtectedRoute><Home /></UserProtectedRoute>} />
        <Route path='/revenue-form' element={<UserProtectedRoute><Revenue /></UserProtectedRoute>} />
        <Route path='/expense-form' element={<UserProtectedRoute><Expenses /></UserProtectedRoute>} />
        <Route path='/expenses-list' element={<UserProtectedRoute><FetchingExpenses /></UserProtectedRoute>} />
        <Route path='/revenues-list' element={<UserProtectedRoute><FetchingRevenues /></UserProtectedRoute>} />
        <Route path='/revenue-update/:id' element={<UserProtectedRoute><RevenueUpdate /></UserProtectedRoute>} />
        <Route path='/expense-update/:id' element={<UserProtectedRoute></UserProtectedRoute>} />
        <Route path='/financial-statements' element={<UserProtectedRoute><FinancialStatements /></UserProtectedRoute>} />
        <Route path='/transactions' element={<UserProtectedRoute><Transactions /></UserProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App