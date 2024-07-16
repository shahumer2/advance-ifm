import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import FormComponent from './pages/Form';
import ViewProfile from './pages/ViewProfile';
import CardComponent from './pages/qrcard';
import QrCard from './pages/IdCard';
import CustomNavbar from './pages/Navbar';
import UpdateEmp from './pages/UpdateEmp';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { options } from './constants/utils';
import SignIn from './pages/AUTH/SignIn';
import Signup from './pages/AUTH/Signup';
import { useSelector } from 'react-redux';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import ViewUser from './pages/ViewUser';
import UpdateUser from './pages/UpdateUser';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.persisted.user);

  // Utility function to check if the path is one of the public routes that should not show the navbar
  const isPublicRouteWithoutNavbar = (pathname) => {
    return pathname === '/auth/signin' || pathname === '/auth/signup' ||
           (!currentUser && (pathname === '/profile/viewCard/:id' || pathname === '/card/:id'));
  };

  const shouldDisplayNavbar = !isPublicRouteWithoutNavbar(location.pathname);

  useEffect(() => {
    if (!currentUser && location.pathname !== '/auth/signin' && location.pathname !== '/auth/signup') {
      navigate('/auth/signin');
    }
  }, [currentUser, location, navigate]);

  return (
    <div>
      {shouldDisplayNavbar && <CustomNavbar />}
      <ToastContainer {...options} />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<Signup />} />
        
        {/* Public routes */}
        <Route path="/" element={<FormComponent />} />
        <Route path="/profile/viewCard/:id" element={<CardComponent />} />
        <Route path="/card/:id" element={<QrCard />} />
        
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/addEmp" element={<FormComponent />} />
          <Route path="/user/view" element={<ViewUser />} />
          <Route path="/profile/view" element={<ViewProfile />} />
          <Route path="/profile/update/:id" element={<UpdateEmp />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />

        
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
