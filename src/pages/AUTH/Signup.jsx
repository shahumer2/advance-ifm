import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInSuccess, signinStart } from '../../redux/Slice/userSlice.js';
import UseSignup from '../../hooks/UseSignup.js';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        username: '',
        password: ''
    });

    const { handleSubmit } = UseSignup(formData);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <header>
                <style>
                    {`
          #intro {
            background-image: url(https://mdbootstrap.com/img/new/fluid/city/008.jpg);
            height: 100vh;
          }

          @media (min-width: 992px) {
            #intro {
              margin-top: -58.59px;
            }
          }

          .navbar .nav-link {
            color: #fff !important;
          }
        `}
                </style>

                <nav className="navbar navbar-expand-lg navbar-dark d-none d-lg-block" style={{ zIndex: 2000 }}>
                    <div className="container-fluid">
                        <img src="/images/STIE.png" alt="Logo" style={{ width: '70px', height: '43px' }} />
                    </div>
                </nav>

                <div id="intro" className="bg-image shadow-2-strong">
                    <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-md-8">
                                    <form className="rounded shadow-5-strong p-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)'   }} onSubmit={(e) => handleSubmit(e)}>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="form-outline mb-4">
                                            <label className="form-label text-white" htmlFor="form1Example1">NAME</label>
                                            <input
                                                type="text"
                                                id="form1Example1"
                                                name="name"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label text-white" htmlFor="form1Example2">PHONE NUMBER</label>
                                            <input
                                                type="text"
                                                id="form1Example2"
                                                name="phoneNumber"
                                                className="form-control"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label text-white" htmlFor="form1Example3">ADDRESS</label>
                                            <input
                                                type="text"
                                                id="form1Example3"
                                                name="address"
                                                className="form-control"
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label text-white" htmlFor="form1Example4">USERNAME</label>
                                            <input
                                                type="text"
                                                id="form1Example4"
                                                name="username"
                                                className="form-control"
                                                value={formData.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label text-white" htmlFor="form1Example5">PASSWORD</label>
                                            <input
                                                type="password"
                                                id="form1Example5"
                                                name="password"
                                                className="form-control"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="row mb-4">
                                            <div className="row text-center d-flex align-items-center justify-content-center">
                                                <p className="mb-0 me-2 text-white">Already have an account?  <a href="/auth/signin"style={{textDecoration:"none", color:"red"}}>Sign In</a></p>
                                                
                                            </div>
                                        </div>
                                        <div className="items-center text-center">
                                            <button type="submit" className="btn btn-danger btn-block">Sign Up</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Signup;
