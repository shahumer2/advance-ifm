import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FormComponent from './pages/Form';
import ViewProfile from './pages/ViewProfile';
import CardComponent from './pages/qrcard';
import QrCard from './pages/IdCard';
import CustomNavbar from './pages/Navbar';
import UpdateEmp from './pages/UpdateEmp';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <CustomNavbar />
        <Routes>
          <Route path="/addEmp" element={<FormComponent />} />
          <Route path="/profile/view" element={<ViewProfile />} />
          <Route path="/profile/:id" element={<CardComponent />} />
          <Route path="/card/:id" element={<QrCard />} />
          <Route path="/profile/update/:id" element={<UpdateEmp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
