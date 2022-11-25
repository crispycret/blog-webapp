import axios, { AxiosInstance, CreateAxiosDefaults, RawAxiosRequestHeaders } from 'axios';
import React, { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Container } from 'react-bootstrap';

import './assets/css/App.css';

import API from './helpers/API';
import User from './helpers/User'

import Authentication from './components/Authentication/Authentication';
import MyNavbar from "./components/Navbar/MyNavbar";

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

import Posts from './helpers/Posts';
import PostPage from './pages/PostPage';
import AdminDashboardPage from './pages/AdminDashboardPage';


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


  useEffect (() => {

  }, [])



  return (
    <Container fluid className="App bg-dark text-light px-0 mx-0 " style={{minHeight:'100vh'}}>

      <Authentication {...props}/>
      <MyNavbar {...props}/>

      <Router>
        <Routes>
          
          {/* <Route path='/' element={<Layout {...props} />} />  */}
          <Route index element={<HomePage {...props} />} />
          <Route path='/' element={<HomePage {...props} />} />

          <Route path='/post/:postId' element={<PostPage {...props} />} />
          

          {/* Put this in the dashboard forward to /dashboard/post/create */}
          {/* <Route path='/dashboard/*' element={ */}
              {/* props.user.isAdmin ?  */}
              {/* <DashboardPage {...props}/> : <Navigate to="/" replace /> */}
          {/* } /> */}

          {props.user.active && props.user.emailVerified &&
            <Route path='/dashboard/*' element={
                <DashboardPage {...props}/> 
            } />
          }

          {props.user.active && props.user.emailVerified && props.user.privilege > 0 &&
            <Route path='/admin/dashboard/*' element={
                <AdminDashboardPage {...props}/> 
            } />
          }

          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          
        </Routes>

        <Container className='bg-dark py-5' />
      </Router>



    </Container>
  );
}


export default App;


