import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './page/LoginForm';
import Register from './page/Register';
import Home from './page/Home';
import Protected from './Protected';
import Errorpage from './page/Errorpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Test from './page/Test'
import Greeting from './for information/demo';
import Formdata from './page/Formdata';
import Backup from './for information/Backup'

function App() {

  return (
    <>
    {/* <Router>
      <Routes>
      <Route path='/home' element={<Protected ><Home/></Protected>} />     

      <Route path='/' element={<Register />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element= {<Errorpage/>}/>
      </Routes>
    </Router> */}
   
  {/* <Formdata/> */}
   <Test/>
   {/* <Home/> */}
   {/* <InputForm/> */}
   {/* <Pagination/> */}
    <Backup/>
  {/* <Greeting/> */}

    </>
    
  );
}

export default App;








