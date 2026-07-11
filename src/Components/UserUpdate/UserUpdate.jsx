import React, { useContext, useState, useEffect } from 'react'
import "./UserUpdate.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { StoreContext } from '../../Context/AuthContext/StoreContext';
import { toast } from 'react-toastify';

const UserUpdate = () => {

  const { id } = useParams()

  const { backendURL, token } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
            ? value === "" ? "" : Number(value)
            : value
    }));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${backendURL}/auth/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setData(prev => ({
          ...prev,
          ...response.data
        }));
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load user");
      }
    };
  
    if (token && id) {
      getUser();
    }
  }, [backendURL, id, token]);

  const userUpdateAPI = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const response = await axios.patch(`${backendURL}/auth/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data) {
        toast.success(`${response.data.firstname} is successfully updated`);
        navigate("/home-page");
      }
    } catch (error) {
      toast.error(`${error.response?.data?.message || "Server Error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={userUpdateAPI} className='registration-form'>
      <div className='registration-div-section'>
        <div id='sign-up-h1'>
          <h1>Finly / Update</h1>
        </div>
        <div className='firstname-lastname-section'>
          <div>
            <p id='firstname-p'>Firstname</p>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={data.firstname}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <p id='lastname-p'>Lastname</p>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={data.lastname}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className='email-password-section'>
          <div className='email-section'>
            <p id='email-p'>Email</p>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className='password-serction'>
            <p id='password-p'>Password</p>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>
        <div className='age-student-section'>
          <div className='age-student-section'>
            <p id='student-p'>Student</p>
            <input
              type="checkbox"
              name="student"
              id="student"
              checked={data.student}
              onChange={onChangeHandler}
            />
          </div>
          <div className='age-section'>
            <p id='age-p'>Age</p>
            <input
              type="number"
              name="age"
              id="age"
              value={data.age}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className='professions-aim-section'>
          <div>
            <select name="professions" id="professions" value={data.professions} onChange={onChangeHandler}>
              <option value="Financial Analyst">Financial Analyst</option>
              <option value="Financial Advisor">Financial Advisor</option>
              <option value="Corporate Accountant & Controller">Corporate Accountant & Controller</option>
              <option value="Marketing Specialist">Marketing Specialist</option>
              <option value="Auditor">Auditor</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <p id='age-p'>Purpose of using the software</p>
            <textarea
              name="aim"
              id="aim"
              cols="30"
              rows="10"
              value={data.aim}
              onChange={onChangeHandler}
            >
            </textarea>
          </div>
        </div>
        <div className='register-button-section'>
          <button id='registration-button' type="submit">{loading ? "Loading ..." : "Update"}</button>
        </div>
      </div>
    </form>
  )
}

export default UserUpdate