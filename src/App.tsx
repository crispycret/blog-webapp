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

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PostForm from './components/Post/PostForm';
import { CreatePost } from './components/Post/CreatePost';
import Posts from './helpers/Posts';
import PostPage from './pages/PostPage';


/*
  Setup App Logic
  Modularize logic at the app level so that any component and page can have access to this logic.
*/

export type Props = {
  api: API,
  user: User,
  showAuth: boolean,
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>,
  posts: Posts
}


function App() {

  let api = API()
  
  let user = User(api)
  const [showAuth, setShowAuth] = useState(false)

  let posts = Posts(api)


  const props = {
    api,
    user,
    showAuth, setShowAuth,
    posts,
  }



  return (
    <div className="App bg-dark text-light">

      <Authentication {...props}/>
      <MyNavbar {...props}/>

      <Router>
        <Routes>
          
          {/* <Route path='/' element={<Layout {...props} />} />  */}
          <Route index element={<HomePage {...props} />} />

          <Route path='/post/:postId' element={<PostPage {...props} />} />
          
          {/* Put this in the dashboard forward to /dashboard/post/create */}
          {props.user.active && props.user.isAdmin &&
            <Route path='/dashboard/*' element={<DashboardPage {...props}/>} />
          } 
  
          
        </Routes>
      </Router>

    </div>
  );
}


export default App;


