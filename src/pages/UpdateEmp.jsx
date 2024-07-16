import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus, FaLinkedin, FaStreetView, FaRegAddressCard, FaSuitcase } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { TbDeviceLandlinePhone, TbWorldLatitude } from "react-icons/tb";
import { IoFileTrayFullSharp } from "react-icons/io5";
import { TiWorld } from "react-icons/ti";
import { AiFillProfile } from "react-icons/ai";
import { GET_CARD, UPDATE_EMP } from '../constants/utils';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
function UpdateEmp() {

  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const { id } = useParams();
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    profile: '',
    email: '',
    linkedInUrl: '',
    alternateNumber: '',
    companyName: '',
    country: '',
    state: '',
    street: '',
    pincode: '',
    profession: '',
    photo: null,
    photoPreview: '',
    role:""
  });

  useEffect(() => {
    getEmp();
  }, []);

  useEffect(() => {
    if (empData.photo) {
      const photoBase64 = `data:image/jpeg;base64,${empData.photo}`;
      setFormData((prevData) => ({
        ...prevData,
        ...empData,
        photoPreview: photoBase64,
        photo: dataURItoFile(photoBase64, 'photo.jpg')
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        ...empData
      }));
    }
  }, [empData]);

  const getEmp = async () => {
    try {
      const response = await fetch(`${GET_CARD}/${id}`, {
        method: "GET",
        headers:{
          "Authorization":`Bearer ${token}`
        },
      });

      const data = await response.json();
      setEmpData(data);
 
    } catch (error) {
      console.log(error);
    }
  };

  const dataURItoFile = (dataURI, filename) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, photo: file }));

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prevData) => ({ ...prevData, photoPreview: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== 'photoPreview') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch(`${UPDATE_EMP}/${id}`, {
        method: "PUT",
        body: formDataToSend,
        headers:{
          "Authorization":`Bearer ${token}`
        },

      });

      if (response.ok) {
        const data = await response.json();
        toast.success(" Employee Updated Successfully !");
      
        navigate("/profile/view");
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className="sec" style={{ padding: '2rem' }}>
      <div className="card mr-3 ml-3 w-full h-full">
        <div className="card-body bg-white">
          <h2 className="font-weight-bold text-center text-uppercase">
            Update Employee
          </h2>

          <hr style={{ height: '1px', borderWidth: '0', color: 'black', backgroundColor: 'black' }} />
          <div className="container-fluid mt-1">
            <form onSubmit={handleSubmit} className="mt-2" encType="multipart/form-data">
              <div className="row" style={{ marginBottom: "40px" }}>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6 text-center pt-5">
                      <label htmlFor="profilephoto" className="btn btn-outline-danger">Upload photo</label>
                      <input
                        type="file"
                        name="photo"
                        id="profilephoto"
                        className="form-control profilephoto"
                        accept="image/jpeg, image/png, image/jpg"
                        style={{ height: '2.8rem', display: 'none' }}
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="col-md-4 offset-md-4">
                        <div style={{ border: '2px solid black', height: '150px', width: '150px', borderRadius: '4px', overflow: 'hidden' }}>
                          <img alt="photoPreview" id="photoPreview" src={formData.photoPreview} height="150px" width="150px" />
                        </div>
                      </div>
                    </div>
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
                      name="firstName"
                      id="firstName"
                      placeholder="Enter First Name"
                      className="form-control"
                      required
                      value={formData.firstName}
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
                      name="lastName"
                      id="secondName"
                      placeholder="Enter Last Name"
                      className="form-control"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <IoIosPhonePortrait size="25px" />
                      </div>
                    </div>
                    <input
                      type="number"
                      name="mobileNumber"
                      id="phone"
                      placeholder="Enter phone number"
                      className="form-control"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <MdOutlineMail size="25px" />
                      </div>
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      className="form-control"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaSuitcase size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="profile"
                      id="profile"
                      placeholder="Enter Job Profile"
                      className="form-control"
                      required
                      value={formData.profile}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaLinkedin size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="linkedInUrl"
                      id="linkedInUrl"
                      placeholder="Enter LinkedIn Url"
                      className="form-control"
                      required
                      value={formData.linkedInUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <TbDeviceLandlinePhone size="25px" />
                      </div>
                    </div>
                    <input
                      type="number"
                      name="alternateNumber"
                      id="alternateNumber"
                      placeholder="Enter alternate Number"
                      className="form-control"
                      required
                      value={formData.alternateNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <IoFileTrayFullSharp size="25px" />
                      </div>
                    </div>
                    <select
                      className="custom-select form-control"
                      name="companyName"
                      id="inlineFormCustomSelectPref"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                    >
                      <option value="">Choose One...</option>
                      <option value="Advancer IFM Services">Advancer IFM Services</option>
                      <option value="Cleaning & Stewarding">Cleaning & Stewarding</option>
                      <option value="Pest Control & Fumigation">Pest Control & Fumigation</option>
                      <option value="Landscape & Gardening">Landscape & Gardening</option>
                      <option value="Security & Technology">Security & Technology</option>
                    </select>
                    <div className="input-group-append">
                      <span className="input-group-text">Company Name</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <TiWorld size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Enter Country"
                      className="form-control"
                      required
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <TbWorldLatitude size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="Enter State"
                      className="form-control"
                      required
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaStreetView size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      placeholder="Enter Street"
                      className="form-control"
                      required
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaRegAddressCard size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="pincode"
                      id="pincode"
                      placeholder="Enter pincode"
                      className="form-control"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <AiFillProfile size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="profession"
                      id="profession"
                      placeholder="Enter Profession"
                      className="form-control"
                      required
                      value={formData.profession}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <IoFileTrayFullSharp size="25px" />
                      </div>
                    </div>
                    <select
                      className="custom-select form-control"
                      name="role"
                      id="inlineFormCustomSelectPref"
                      required
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Choose One...</option>
                      <option value="Advancer IFM Services">ROLE_ADMIN</option>
                      <option value="Cleaning & Stewarding">ROLE_USER</option>
                  
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

export default UpdateEmp;
