import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormComponent from './pages/Form';
import ViewProfile from './pages/ViewProfile';
import CardComponent from './pages/qrcard';
import QrCard from './pages/IdCard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Router>
      <Routes>
        
        <Route path="/page" element={<FormComponent />} />
        <Route path="/profile/view" element={<ViewProfile />} />

        <Route path="/profile/:id" element={<CardComponent />} />
        <Route path="/card/:id" element={<QrCard />} />
      </Routes>
    </Router>
  
    </>
  )
}

export default App
