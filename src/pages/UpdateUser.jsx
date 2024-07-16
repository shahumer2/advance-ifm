import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { GET_USER, UPDATE_USER } from '../constants/utils';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function UpdateUser() {
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    username: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...userData,
      role: userData?.authorities?.length > 0 ? userData.authorities[0].authority : ''
    }));
  }, [userData]);

  const getUser = async () => {
    try {
      const response = await fetch(`${GET_USER}/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();
      setUserData(data);
      console.log(data, "Response from server");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  console.log(formData, "jamkashhhh");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
       
        role: {
          id: 0, // Assuming 0 or any appropriate id based on your role data
          name: formData.role,
          users: [id] // Assuming you want to send the user's ID here
        }
      };

      const response = await fetch(`${UPDATE_USER}/${id}`, {
        method: "PUT",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("User Updated Successfully!");
        console.log(data, "Response from server");
        navigate("/profile/view");
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const firstAuthority = formData.role || 'No role assigned';
  console.log(firstAuthority, "jump");

  return (
    <section className="sec" style={{ padding: '2rem' }}>
      <div className="card mr-3 ml-3 w-full h-full">
        <div className="card-body bg-white">
          <h2 className="font-weight-bold text-center text-uppercase">
            Update User
          </h2>
          <hr style={{ height: '1px', borderWidth: '0', color: 'black', backgroundColor: 'black' }} />
          <div className="container-fluid mt-1">
            <form onSubmit={handleSubmit} className="mt-2" encType="multipart/form-data">
              <div className="row" style={{ marginBottom: "40px" }}>
                <div className="col-md-12">
                  <div className="row">
                    {/* Your form fields */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPlus size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Name"
                      className="form-control"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPlus size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter Address"
                      className="form-control"
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPlus size="25px" />
                      </div>
                    </div>
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phone"
                      placeholder="Enter phone number"
                      className="form-control"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPlus size="25px" />
                      </div>
                    </div>
                    <input
                      type="username"
                      name="username"
                      id="username"
                      placeholder="Enter Username"
                      className="form-control"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPlus size="25px" />
                      </div>
                    </div>
                    <select
                      className="custom-select form-control"
                      name="role"
                      id="inlineFormCustomSelectPref"
                      required
                      value={firstAuthority}
                      onChange={handleChange}
                    >
                      <option value="">Choose One...</option>
                      <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                      <option value="ROLE_USER">ROLE_USER</option>
                    </select>
                    <div className="input-group-append">
                      <span className="input-group-text">Select Role</span>
                    </div>
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

export default UpdateUser;
