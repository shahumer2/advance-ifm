import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { GET_USER, UPDATE_USER } from '../constants/utils';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function ChangePassword() {
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: currentUser?.user?.username || '',
    oldPassword: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData,"hghghg");
    try {
      const dataToSend = {
        username: formData.username,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      };

      const response = await fetch(`${GET_USER}/change-password`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        toast.success("Password Updated Successfully!");
        navigate("/auth/signin");
      } else {
        const errorData = await response.json();
        toast.error(`Failed to update password: ${errorData.message}`);
        console.error('Failed to update password', errorData);
      }
    } catch (error) {
      console.error('Error during password update:', error);
      toast.error('An error occurred while updating the password');
    }
  };

  return (
    <section className="sec" style={{ padding: '2rem' }}>
      <div className="card mr-3 ml-3 w-full h-full">
        <div className="card-body bg-white">
          <h2 className="font-weight-bold text-center text-uppercase">
            Change Password
          </h2>
          <hr style={{ height: '1px', borderWidth: '0', color: 'black', backgroundColor: 'black' }} />
          <div className="container-fluid mt-1 justify-center">
            <form onSubmit={handleSubmit} className="mt-2" encType="multipart/form-data">
              <div className="row" style={{ marginBottom: "40px" }}>
                <div className="col-md-12">
                  <div className="row">
                    {/* Your form fields */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPlus size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      className="form-control"
                      required
                      value={formData.username}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-8 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPlus size="25px" />
                      </div>
                    </div>
                    <input
                      type="password"
                      name="oldPassword"
                      id="oldPassword"
                      placeholder="Enter Old Password"
                      className="form-control"
                      required
                      value={formData.oldPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-8 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPlus size="25px" />
                      </div>
                    </div>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="Enter New Password"
                      className="form-control"
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success btn-lg">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
