import React from 'react'
import "./Transactions.css"
import FetchingRevenues from '../FetchingRevenues/FetchingRevenues'
import FetchingExpenses from '../FetchingExpenses/FetchingExpenses'

const Transactions = () => {
  return (
    <div className='transactions-list-section'>
      <FetchingRevenues />
      <FetchingExpenses />
    </div>
  )
}

export default Transactions