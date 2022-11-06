import { useState } from 'react';
import './App.css';
import Login from './component/login.component';
import SignUp from './component/signup.component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
