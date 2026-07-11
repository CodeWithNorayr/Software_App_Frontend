import React, { useContext, useState } from 'react'
import "./UserLogin.css"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/AuthContext/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserLogin = () => {
  
  const navigate = useNavigate();
  const {setToken, backendURL, setAuthLoading} = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const onChnageHandler = (e) => {
    const {name, value} = e.target
    setData((prev)=>({...prev,[name]:value}))
  }

  const userLoginAPI = async (e) => {
    e.preventDefault()
    try {
      setAuthLoading(true)
      setLoading(true)
      const response = await axios.post(`${backendURL}/auth/auth-login`,data)
      if(response.data.access_token) {
        setToken(response.data.access_token)
        localStorage.setItem("token", response.data.access_token)
        toast.success(`${response.data?.firstname} logged in successfully`)
        navigate("/home-page")
      }
    } catch (error) {
      toast.error("Server error")
    } finally {
      setAuthLoading(false)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={userLoginAPI} className='login-form'>
      <div className='login-div-section'>
        <div className='login-title-section'>
          <h1 id='login-title-p'>Finly/Sign In</h1>
        </div>
        <div className='email-password-section'>
          <div>
            <p id='email-p'>Email</p>
            <input type="email" name="email" value={data.email} onChange={onChnageHandler} id="email" />
          </div>
          <div>
            <p id='password-p'>Password</p>
            <input type="password" name="password" value={data.password} id="password" onChange={onChnageHandler} />
          </div>
          <div>
            <p className='check-for-account-posession'>Already have an account ? <span id='already-signIn' onClick={() => navigate("/user-registration")}>Sign Up</span></p>
          </div>
          <div className='signIn-button-section'>
            <button className='signIn-button' type="submit">{ loading ? "Loading..." : "Sign In" }</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default UserLogin