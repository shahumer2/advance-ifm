import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaLinkedin,
  FaStreetView,
  FaRegAddressCard,
  FaSuitcase,
} from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { TbDeviceLandlinePhone, TbWorldLatitude } from "react-icons/tb";
import { IoFileTrayFullSharp } from "react-icons/io5";
import { TiWorld } from "react-icons/ti";
import { AiFillProfile } from "react-icons/ai";
import { ADD_EMP } from "../constants/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import "./CardComponent.css";
function FormComponent() {
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    profile: "",
    email: "",
    linkedInUrl: "",
    alternateNumber: "",
    companyName: "",
    country: "",
    state: "",
    street: "",
    pincode: "",
    profession: "",
    photo: null, // Initialize photo as null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, photo: file }));

    // Preview photo (if needed)
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("photoPreview").src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch(ADD_EMP, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      toast.success(" Employee Added Successfully !");
      // console.log(data, "Response from server");

      navigate("/profile/view");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sec" style={{ padding: "2rem" }}>
      <div className="card mr-3 ml-3 w-full h-full">
        <div className="card-body bg-white">
          <h2 className="font-weight-bold text-center text-uppercase mb-1 font-custom">
            Add Employee
          </h2>

          <hr
            style={{
              height: "1px",
              borderWidth: "0",
              color: "black",
              backgroundColor: "black",
            }}
          />
          <div className="container-fluid mt-1">
            <form
              onSubmit={handleSubmit}
              className="mt-2"
              encType="multipart/form-data"
            >
              <div className="row" style={{ marginBottom: "40px" }}>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6 text-center pt-5 mb-3">
                      <label
                        htmlFor="profilephoto"
                        className="btn btn-outline-danger"
                      >
                        Upload photo
                      </label>
                      <input
                        type="file"
                        name="photo"
                        id="profilephoto"
                        className="form-control profilephoto"
                        accept="image/jpeg, image/png, image/jpg"
                        style={{ height: "2.8rem", display: "none" }}
                        required
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6 ml-8">
                      <div className="col-md-4 offset-md-4 ml-9">
                        <div
                          style={{
                            border: "2px solid black ml-5",
                            height: "150px",
                            width: "150px",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            alt="photoPreview"
                            id="photoPreview"
                            src=""
                            height="150px"
                            width="150px"
                          />
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
                      <option value="Advancer IFM Services">
                        Advancer IFM Services
                      </option>
                      <option value="Cleaning & Stewarding">
                        Cleaning & Stewarding
                      </option>
                      <option value="Pest Control & Fumigation">
                        Pest Control & Fumigation
                      </option>
                      <option value="Landscape & Gardening">
                        Landscape & Gardening
                      </option>
                      <option value="Security & Technology">
                        Security & Technology
                      </option>
                    </select>
                    <div className="input-group-append">
                      <span className="input-group-text">Department Name</span>
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
                      placeholder="Country"
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
                      placeholder="State"
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
                      placeholder="Street"
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
                      type="number"
                      name="pincode"
                      id="pincode"
                      placeholder="Pincode"
                      className="form-control"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <AiFillProfile size="25px" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="profession"
                      placeholder="Enter Your Degree"
                      className="form-control"
                      required
                      value={formData.profession}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-3 info">
                  <strong>Note:</strong>

                  <span style={{ color: "red" }}>*</span>
                  <small> Upload Image Less Than 2 Mb.</small>

                  <span style={{ color: "red" }}>*</span>
                  <small> Only JPG,JPEG,PNG Files Are Allowed </small>

                  <p>
                    <span style={{ color: "red" }}>*</span>
                    <small> All Fields Are Mandatory </small>
                  </p>
                </div>
                <div className="container text-center mt-3">
                  <button
                    style={{ width: "150px" }}
                    className="btn btn-outline-primary custom-button"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormComponent;
