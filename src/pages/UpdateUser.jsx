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
  const [Role, setRole] = useState([]);
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
    fetchRole();
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
 
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRole = async () => {
    try {
      const response = await fetch(`${GET_USER}/allRoles`, {
        method: 'GET',
        headers: {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      const data = await response.json();
 
      setRole(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    if (
      formData.phoneNumber.length < 10 ||
      formData.phoneNumber.length > 12
   
    ) {
      toast.error("Phone numbers must be between 10 and 12 digits.");
      return;
    }
    try {
      const selectedRole = Role.find(r => r.name === formData.role);
      const dataToSend = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        username: formData.username,
      
        role: {
          id: selectedRole.id,
          name:selectedRole.name
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

        navigate("/user/view");
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const firstAuthority = formData.role || 'No role assigned';


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
                      {Role.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
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
