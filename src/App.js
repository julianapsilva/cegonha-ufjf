import './App.css';
import Sidebar from './Components/Sidebar';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListUsers from './pages/User/ListUsers';
import CreateUser from './pages/User/CreateUser';
import Login from './pages/Login';
import ListCenterMedical from './pages/CenterMedical/ListCenterMedical';
import CreateCenterMedical from './pages/CenterMedical/CreateCenterMedical';
import ListCoverAdress from './pages/CoverAdress/ListCoverAdress'
import CreateCoverAdress from './pages/CoverAdress/CreateCoverAdress';
import ListDiscoveryAdress from './pages/DiscoveryAdress/ListDiscoveryAdress';
import CreateDiscoveryAdress from './pages/DiscoveryAdress/CreateDiscoveryAdress';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/center-medical" element={<ListCenterMedical />} />
        <Route path="/create-center-medical" element={<CreateCenterMedical />} />
        <Route path="/cover-adress" element={<ListCoverAdress />} />
        <Route path="/create-cover-adress" element={<CreateCoverAdress />} />
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/discovery-adress" element={<ListDiscoveryAdress/>} />
        <Route path="/create-discovery-adress" element={<CreateDiscoveryAdress/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
