import './App.css';
import Sidebar from './Components/Sidebar';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListUsers from './pages/User/ListUsers';
import CreateUser from './pages/User/CreateUser';
import Login from './pages/Login';


const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/" element={<Navigate to="/login"/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
