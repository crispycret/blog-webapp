import axios from "axios"
import { AxiosInstance, CreateAxiosDefaults, RawAxiosRequestHeaders } from "axios"

/*
Interfaces for the API.

 * APIInterface -> Our Axios Wrapper

 * APIClientConfigInterface -> Wrapper for the object axios requires when axios.create() is called -> Must extend CreateAxiosDefaults

 * APIClientConfigHeadersInterface -> Wrapper for the object the axios headers requires -> Must extend RawAxiosRequestHeaders
*/
export interface APIInterface {
    client_config: APIClientConfigInterface,
    client: AxiosInstance,
    reconnect: () => AxiosInstance
  }
  
  export interface APIClientConfigInterface extends CreateAxiosDefaults{
    baseUrl: string,
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
  
  export const API =() => {
  
    let client_config: APIClientConfigInterface = {
      baseUrl: 'http://127.0.0.1/',
      headers: {
  
      }
    }
  
    let client = axios.create(client_config)
  
    const reconnect = () => client = axios.create(client_config)
  
    return {
      client_config,
      client,
      reconnect,
    } as APIInterface
  
  }


  export default API;