import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { StoreContextProvider } from './Context/AuthContext/StoreContext'
import { RevenueContextProvider } from './Context/RevenueContext/RevenueContext'
import { ExpenseContextProvider } from './Context/ExpenseContext/ExpenseContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <RevenueContextProvider>
        <ExpenseContextProvider>
          <App />
        </ExpenseContextProvider>
      </RevenueContextProvider>
    </StoreContextProvider>
  </BrowserRouter>
)
