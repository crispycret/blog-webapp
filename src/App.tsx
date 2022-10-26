import axios, { AxiosInstance, CreateAxiosDefaults, RawAxiosRequestHeaders } from 'axios';
import React from 'react';


import './assets/css/App.css';

import API from './helpers/API';
import Auth  from './helpers/auth/Auth';
import Home from './pages/Home';



/*
  Setup App Logic
  Modularize logic at the app level so that any component and page can have access to this logic.
  

  
*/





function App() {

  let api = API()

  let auth = Auth(api)

  const props = {
    api,
    auth
  }

  return (
    <div className="App">
      <Home props/>
    </div>
);
}

export default App;
