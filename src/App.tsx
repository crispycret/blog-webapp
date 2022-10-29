import axios, { AxiosInstance, CreateAxiosDefaults, RawAxiosRequestHeaders } from 'axios';
import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import './assets/css/App.css';

import API from './helpers/API';
import User from './helpers/User'

import MyNavbar from "./components/Navbar/MyNavbar";
import { Authentication } from './components/Authentication/Authentication';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PostForm from './components/Post/PostForm';
import { CreatePost } from './components/Post/CreatePost';


/*
  Setup App Logic
  Modularize logic at the app level so that any component and page can have access to this logic.
*/

export type Props = {
  api: API,
  user: User,
  showAuth: boolean,
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>,
}


function App() {

  let api = API()
  let user = User(api)
  const [showAuth, setShowAuth] = useState(false)

  const props = {
    api,
    user,
    showAuth,
    setShowAuth,
  }

  return (
    <div className="App">

      <Authentication {...props}/>
      <MyNavbar {...props}/>

      <Router>
        <Routes>
          
          {/* <Route path='/' element={<Layout {...props} />} />  */}
          <Route index element={<Home {...props} />} />
          
          {/* Put this in the dashboard forward to /dashboard/post/create */}
          {user.active && user.isAdmin &&
            <Route path='/post/create' element={<CreatePost {...props}/>} />
          }
  
          
        </Routes>
      </Router>

      {/* <Home {...props}/> */}
    </div>
  );
}


export default App;


