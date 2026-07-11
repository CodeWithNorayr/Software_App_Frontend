import React, { useContext, useEffect, useState } from 'react';
import "./UserRegistration.css";
import { StoreContext } from '../../Context/AuthContext/StoreContext';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const UserRegistration = () => {

  const slides = [
    {
      title: "Image-1",
      image: assets.Image1
    },
    {
      title:"Image-2",
      image: assets.Image2
    },
    {
      title: "Image-3",
      image: assets.Image3
    },
    {
      title: "Image-4",
      image: assets.Image4
    }
  ]

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length)
        setFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {setToken, backendURL} = useContext(StoreContext);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
    student: false,
    aim: "",
    professions: ""
  })

  const onChangeHandler = (e) => {
    const { type, checked, name, value } = e.target;
  
    setData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "age"
          ? Number(value)
          : value
    }));
  };

  const userRegistrationAPI = async (e) => {
    e.preventDefault();
    try {
      setLoading(false);
      const response = await axios.post(`${backendURL}/auth/auth-registration`,data)
      if(response.data.access_token) {
        setToken(response.data.access_token)
        localStorage.setItem("token", response.data.access_token)
        toast.success(`${response.data.firstname} is successfully registered`)
        navigate("/user-login")
      }
    } catch (error) {
      console.log("Backend Error",error.response?.data)
      toast.error("Server Error (try a bit later) ... ")
    } finally {
      setLoading(false)
    }
  } 

  return (
    <div className='full-registration-code'>
    <form onSubmit={userRegistrationAPI} className='registration-form'>
      <div className='registration-div-section'>
        <div className='sign-up-title-section'>
          <h1 id='sign-up-h1'>Finly / Sign Up</h1>
        </div>
        <div className='firstname-lastname-section'>
          <div>
            <p id='firstname-p'>Firstname <span className='span-reg-req'></span></p>
            <input type="text" name="firstname" value={data.firstname} onChange={onChangeHandler} id="firstname" placeholder='Mark' required/>
          </div>
          <div>
            <p id='lastname-p'>Lastname <span className='span-reg-req'></span></p> 
            <input type="text" name="lastname" value={data.lastname} onChange={onChangeHandler} id="lastname" placeholder='Simens' required/>
          </div>
        </div>

        <div className='email-password-section'>
          <div className='email-section'>
            <p id='email-p'>Email <span className='span-reg-req'></span></p>
            <input type="email" name="email" value={data.email} onChange={onChangeHandler} id="email" placeholder='marksimens@gmail.com' required/>
          </div>
          <div className='password-serction'>
            <p id='password-p'>Password <span className='span-reg-req'></span></p>
            <input type="password" name="password" value={data.password} onChange={onChangeHandler} id="password" placeholder='****aA123@#' required/>
          </div>
        </div>

        <div className='age-student-section'>
          <div className='student-section'>
            <p id='student-p'>Student ?</p>
            <input type="checkbox" name="student" checked={data.student} onChange={onChangeHandler} id="student" />
          </div>
          <div className='age-section'>
            <p id='age-p'>Age</p>
            <input type="number" name="age" value={data.age} onChange={onChangeHandler} id="age" placeholder='24' />
          </div>
        </div>

        <div className='professions-aim-section'>
          <select name="professions" id="professions" value={data.professions} onChange={onChangeHandler}>
            <option value="Financial Analyst">Financial Analyst</option>
            <option value="Financial Advisor">Financial Advisor</option>
            <option value="Corporate Accountant & Controller">Corporate Accountant & Controller</option>
            <option value="Marketing Specialist">Marketing Specialist</option>
            <option value="Auditor">Auditor</option>
            <option value="Others">Others</option>
          </select>

          <textarea name="aim" value={data.aim} onChange={onChangeHandler} id="aim" cols="30" rows="10" placeholder="What's your purpose for using this software">
          </textarea>
        </div>

        <div className='terms-and-policy'>
          <input type="checkbox" id="terms-checkbox" required/>
          <p className='check-for-account-posession'>Agree with the policy of this website</p><span className='span-reg-req'></span>
        </div>

        <div>
          <p className='check-for-account-posession'>Already have an account ? <span id='already-signIn' onClick={() => navigate("/user-login")}>Sign In</span></p>
        </div>

        <div className='register-button-section'>
          <button id='registration-button' type='submit'>{
            loading ? "Loading ... " : "Sign Up"
          }</button>
        </div>
      </div>
    </form>
    <div className='registration-image-section'>
          <div>
            <img className='registration-image-1' src={slides[index].image} alt="" id='image-1'/>
          </div>
    </div>
    </div>
  )
}

export default UserRegistration