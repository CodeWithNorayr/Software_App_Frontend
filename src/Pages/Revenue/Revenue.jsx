import React, { useContext, useEffect, useState } from 'react'
import "./Revenue.css"
import { RevenueContext } from '../../Context/RevenueContext/RevenueContext'
import { assets } from '../../assets/assets';

const Revenue = () => {

  const { onChangeHandler, createRevenueAPI, revenue, loading } = useContext(RevenueContext);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const slides = [
    {
      image: assets.Austin
    },
    {
      image: assets.Luke
    },
    {
      image: assets.Dollor
    },
    {
      image: assets.Jackub
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length)
        setFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(interval);
  }, [])

  return (
    <div className='revenue-section-full'>
      <div className="revenue-image-section">
        <img
          src={slides[index].image}
          alt=""
          className={`revenue-image ${fade ? "fade-in" : "fade-out"}`}
        />
      </div>
      <form className='revenue-form-section' onSubmit={createRevenueAPI}>
        <div className='revenue-div-section'>
          <div className='purpose-section'>
            <p>Purpose</p>
            <input type="text" name="title" id="title" value={revenue.title} onChange={onChangeHandler} placeholder='Target' required />
          </div>
          <div className='description-section'>
            <p>Description</p>
            <textarea name="description" value={revenue.description} id="description" onChange={onChangeHandler} cols="30" rows="10" placeholder='Describe transaction with a few words' required></textarea>
          </div>
          <div className='amount-section'>
            <p>Amount</p>
            <input type="number" name="amount" value={revenue.amount} onChange={onChangeHandler} id="amount" placeholder='20$' required />
          </div>
          <div className='date-section'>
            <p>Transaction Date</p>
            <input type="date" name="revenueDate" value={revenue.revenueDate} onChange={onChangeHandler} id="revenueDate" required />
          </div>
          <div className='categories-section'>
            <select
              name="categories"
              value={revenue.categories[0] || ""}
              onChange={onChangeHandler}
              required
            >
              <option value="">Select category</option>
              <option value="Operating_Revenue">Operating Revenue</option>
              <option value="Non-Operating_Revenue">Non-Operating Revenue</option>
              <option value="Financial_Revenue">Financial Revenue</option>
              <option value="Other_Revenue">Other Revenue</option>
            </select>
          </div>
          <div className='button-section'>
            <button className='btn-section-revenue' type="submit">{loading ? "Loading ... " : "Add"}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Revenue