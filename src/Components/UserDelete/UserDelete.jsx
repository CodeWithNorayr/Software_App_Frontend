import React, { useContext } from 'react'
import "./UserDelete.css"
import axios from 'axios'
import { StoreContext } from '../../Context/AuthContext/StoreContext'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserDelete = () => {
  
  const {id} = useParams();

  const {backendURL, token} = useContext(StoreContext);

  const navigate = useNavigate();

  const deleteUserAPI = async () => {
    const response = await axios.delete(`${backendURL}/auth/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if(response.data) {
      toast.success("Deleted");
      localStorage.removeItem("token");
      navigate("/home-page");
    }
  }

  const deleteConfirmation = async () => {
    const confirmed = window.confirm(
      "Delete this account?"
    );
  
    if (!confirmed) return;
  
    await deleteUserAPI();
  };
  
  return (
    <div className="delete-page">
  
      <div className="delete-card">
  
        <div className="delete-icon">
          ⚠
        </div>
  
        <h1>Delete Account</h1>
  
        <p className="delete-description">
          You're about to permanently delete your Finly account.
          This action cannot be reversed.
        </p>
  
        <div className="delete-warning">
  
          <h3>What will happen?</h3>
  
          <ul>
  
            <li>Your account will be permanently deleted.</li>
  
            <li>All revenue records will be removed.</li>
  
            <li>All expense records will be removed.</li>
  
            <li>Financial statements will be deleted.</li>
  
            <li>Your personal profile information will be deleted.</li>
  
            <li>You will immediately lose access to your account.</li>
  
            <li>This action cannot be undone.</li>
  
          </ul>
  
        </div>
  
        <div className="delete-buttons">
  
          <button
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
  
          <button
            className="delete-account-button"
            onClick={deleteConfirmation}
          >
            Delete Account
          </button>
  
        </div>
  
      </div>
  
    </div>
  )
}

export default UserDelete