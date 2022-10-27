import axios from "axios"
import { AxiosInstance, CreateAxiosDefaults, RawAxiosRequestHeaders } from "axios"

import { useCookies } from 'react-cookie'
import { Cookie, CookieSetOptions } from 'universal-cookie';

/*
Interfaces for the API.

 * APIInterface -> Our Axios Wrapper

 * APIClientConfigInterface -> Wrapper for the object axios requires when axios.create() is called -> Must extend CreateAxiosDefaults

 * APIClientConfigHeadersInterface -> Wrapper for the object the axios headers requires -> Must extend RawAxiosRequestHeaders
*/
export interface APIInterface {
    cookies: {[x: string]: any},
    setCookie: (name: string, value: any, options?: CookieSetOptions | undefined) => void,
    removeCookie: (name: string, options?: CookieSetOptions | undefined) => void,
    client_config: APIClientConfigInterface,
    client: AxiosInstance,
    reconnect: () => AxiosInstance,
    setHeader: (key: string, value: string) => void,
    deleteHeader: (key: string) => void,
  }
  
  export interface APIClientConfigInterface extends CreateAxiosDefaults{
    baseURL: string,
    headers: APIClientConfigHeadersInterface
  }
  
  export interface APIClientConfigHeadersInterface extends RawAxiosRequestHeaders {
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

    let client_config: APIClientConfigInterface = {
      baseURL: 'http://127.0.0.1:5000/',
      headers: {}
    }
  
    let client = axios.create(client_config)
    const reconnect = () => client = axios.create(client_config)

    const setHeader = (key: string, value: string) => {
        axios.defaults.headers.common[key] = value
    }

    const deleteHeader = (key: string) => {
        delete axios.defaults.headers.common[key]
    }
    
    return {
        cookies, setCookie, removeCookie,   
        client_config,
        client,
        reconnect,
        setHeader,
        deleteHeader
    } as APIInterface
  
  }


  export default API;