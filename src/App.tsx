import axios, { AxiosInstance, CreateAxiosDefaults, RawAxiosRequestHeaders } from 'axios';
import React from 'react';


import './assets/css/App.css';

import API, { APIInterface } from './helpers/API';
import Auth, { AuthInterface }  from './helpers/auth/Auth';

import Navbar from "./components/Navbar/Navbar";
import Home from './pages/Home';
import { Authentication } from './components/Login/Authentication';



/*
  Setup App Logic
  Modularize logic at the app level so that any component and page can have access to this logic.
  

  
*/


export interface PropsInterface {
  api: APIInterface,
  auth: AuthInterface
}


function App() {

  let api = API()
  let auth = Auth(api)

  const props = {
    api,
    auth
  }

  return (
    <div className="App">
      <Authentication {...props}/>

      <Navbar {...props}/>
      <Home {...props}/>
    </div>
);
}

export default App;
