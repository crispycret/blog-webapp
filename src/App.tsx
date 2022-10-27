import axios, { AxiosInstance, CreateAxiosDefaults, RawAxiosRequestHeaders } from 'axios';
import React, { useState } from 'react';


import './assets/css/App.css';

import API, { APIInterface } from './helpers/API';
import User, {UserInterface} from './helpers/User'

import MyNavbar from "./components/Navbar/MyNavbar";
import { Authentication } from './components/Authentication/Authentication';

import Home from './pages/Home';




/*
  Setup App Logic
  Modularize logic at the app level so that any component and page can have access to this logic.
  

  
*/


export interface PropsInterface {
  api: APIInterface,
  user: UserInterface,
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
      <Home {...props}/>
    </div>
);
}

export default App;
