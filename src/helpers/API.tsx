import axios from "axios"
import { AxiosInstance, CreateAxiosDefaults, RawAxiosRequestHeaders } from "axios"
import { useEffect } from "react";

import { useCookies } from 'react-cookie'
import { Cookie, CookieSetOptions } from 'universal-cookie';

/*
Interfaces for the API.

 * APIInterface -> Our Axios Wrapper

 * APIClientConfigInterface -> Wrapper for the object axios requires when axios.create() is called -> Must extend CreateAxiosDefaults

 * APIClientConfigHeadersInterface -> Wrapper for the object the axios headers requires -> Must extend RawAxiosRequestHeaders
*/
export type API = {
    cookies: {[x: string]: any},
    setCookie: (name: string, value: any, options?: CookieSetOptions | undefined) => void,
    removeCookie: (name: string, options?: CookieSetOptions | undefined) => void,
    client_config: ClientConfig,
    client: AxiosInstance,
    reconnect: () => AxiosInstance,
    setHeader: (key: string, value: string) => void,
    deleteHeader: (key: string) => void,
  }
  
  export type ClientConfig = {
    baseURL: string,
    headers: ClientConfigHeaders
  }
  
  export type ClientConfigHeaders = {
    // Unfourtently with how typescript works we must add all possible headers 
    // that will be accumulated now as optional
    
    // Authentication
    Authentication?: string
  }
  
  
  /*
   API to interact with the blog api server side.
  */
  
  export const API = () => {
  
    let [cookies, setCookie, removeCookie] = useCookies()

    let client_config: ClientConfig = {
      // baseURL: 'https://bnadeau-blog-api.herokuapp.com/',
      baseURL: 'http://localhost:5000/',
      
      headers: {}
    }
    
    let client = axios.create(client_config)
    const reconnect = () => client = axios.create(client_config)

    /*
     * Extend the header of all client requests with a given header key and value 
    */
    const setHeader = (key: string, value: string) => {
        axios.defaults.headers.common[key] = value
    }

    /*
     * Remove the provided header key from all  client requests. 
    */
    const deleteHeader = (key: string) => {
        delete axios.defaults.headers.common[key]
    }

    // On Page Load check cookies and set values
    useEffect(() => {
        // No cookie values need to be loaded here
    }, [])
    
    return {
        cookies, setCookie, removeCookie,   
        client_config,
        client,

        reconnect,
        setHeader,
        deleteHeader
    } as API
  
  }


  export default API;