import './App.css';
import Sidebar from './Components/Sidebar';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListUsers from './pages/ListUsers';
import CreateUser from './pages/CreateUser';


const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/" element={<ListUsers />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
