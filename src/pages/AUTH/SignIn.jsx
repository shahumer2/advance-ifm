import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInSuccess, signinStart } from '../../redux/Slice/userSlice.js';
import { SIGNIN_URL } from '../../constants/utils.js';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state?.persisted?.user);

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError('Please fill all the fields');
            return;
        }

        try {
            dispatch(signinStart());
            const res = await fetch(SIGNIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
              
                dispatch(signInSuccess(data));
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            dispatch(signInFailure());
            setError('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <header>
                <style>
                    {`
          #intro {
            background-image: url(https://images.unsplash.com/photo-1478031706604-bb4b7b0b4e9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG9wZW4lMjBzb3VyY2V8ZW58MHx8MHx8fDA%3D);
            height: 102.1vh;
            background-size: cover
            
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
                        <img src="/images/STIE.png" alt="Logo" style={{ width: '70px', height: '30px' }} />
                    </div>
                </nav>

                <div id="intro" className="bg-image shadow-1-strong">
                    <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <div className="container" >
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-md-8">
                                    <form className="rounded shadow-8-strong p-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onSubmit={handleSubmit}>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="form-outline mb-4">
                                            <label className="form-label text-white" htmlFor="form1Example1">USERNAME</label>
                                            <input
                                                type="text"
                                                id="form1Example1"
                                                name="username"
                                                className="form-control"
                                                value={formData.username}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label text-white" htmlFor="form1Example2">PASSWORD</label>
                                            <input
                                                type="password"
                                                id="form1Example2"
                                                name="password"
                                                className="form-control"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="row mb-4">
                                            <div className="row text-center d-flex align-items-center justify-content-center">
                                                <p className="mb-0 me-2 text-white">Don't Have An Account?  <a href="/auth/signup" style={{ textDecoration: "none", color: "red" }}>  SignUp</a></p>

                                            </div>
                                        </div>
                                        <div className="items-center text-center">
                                            <button type="submit" className="btn btn-danger">Sign in</button>
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

export default SignIn;
