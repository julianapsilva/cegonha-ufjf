import './App.css';
import Sidebar from './Components/Sidebar';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListUsers from './pages/User/ListUsers';
import CreateUser from './pages/User/CreateUser';
import Login from './pages/Login';
import ListCenterMedical from './pages/CenterMedical/ListCenterMedical';
import CreateCenterMedical from './pages/CenterMedical/CreateCenterMedical';


const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/center-medical" element={<ListCenterMedical />} />
        <Route path="/create-center-medical" element={<CreateCenterMedical />} />
        <Route path="/" element={<Navigate to="/login"/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
