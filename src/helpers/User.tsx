
// When sending confedential information such as passwords to the backend should they be encrypted 

import { useState, useEffect} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import {useCookies} from 'react-cookie'
import API from "./API";



export type User = {
    active: boolean;
    email: string;
    isAdmin: boolean;

    register: (username: string, _email: string, password: string) => Promise<AxiosResponse<any, any>>;
    login: (_email: string, password: string) => Promise<AxiosResponse<any, any>>;
    logout: () => Promise<AxiosResponse<any, any>>;
    update: () => Promise<AxiosResponse<any, any>>;
    validate: () => Promise<AxiosResponse<any, any>>;

    clear: () => void,
    setCookies: (data: any) => void,
}


// using an application key known by server and frontend for extra security?
export const User = (props: API) => {


    let path = '/auth'

    // Boolean value for if the user is logged in.
    let [active, setActive] = useState(false);

    // email provided by the user or retrieved using cookies
    let [email, setEmail] = useState("")

    // state of the user that will allow access to features and pages that should be restricted to normal users.
    let [isAdmin, setIsAdmin] = useState(false)

    // state of the user provided by the server upon successful login
    let public_id = ""
    let [publicId, setPublicId] = useState("")


    /**
     * Set user fields and the client headers authentication token from the cookies
     */
    const fromCookies = () => {
        setActive(true)
        setEmail(props.cookies.user_email)
        setPublicId(props.cookies.user_publicId)
        setIsAdmin(props.cookies.user_isAdmin)
        
        // Re-add request headers that should persist for every request
        props.setHeader('Authorization', props.cookies.Authorization)
    }

    /**
     * Take data from a login response and set the corresponding cookies.
     * Add the authentication token to the client's headers for future authentication requests.
     */
    const setCookies = (data: any) => {
            // Set cookies
            let token = data.Authorization
            props.setCookie('Authorization', token, { path: '/', secure: true, sameSite: true})
            props.setCookie('user_active', true, { path: '/', sameSite: true })
            props.setCookie('user_email', data.user.email, { path: '/', sameSite: true })
            props.setCookie('user_publicId', data.user.public_id, { path: '/', sameSite: true })
            props.setCookie('user_isAdmin', data.user.privilege, { path: '/', sameSite: true })

            // Add the authorization token to every new request made.
            props.setHeader('Authorization', token)
    }

    /**
     * Clear all user related cookies, nullify the user fields, and 
     * remove the authentication token from the client's header 
     */
    const clear = () => {
        // Clear user propery values
        setActive(false)
        setEmail("")
        setIsAdmin(false)
        setPublicId("")
                    
        // Clear cookies
        props.removeCookie('Authorization')
        props.removeCookie('user_active')
        props.removeCookie('user_email')
        props.removeCookie('user_publicId')
        props.removeCookie('user_isAdmin')

        // Remove authorization token from every new request made.
        delete axios.defaults.headers.common['Authorization']
    }


    // Process of how to login, handles communication with the backend
    /**
     * Send a login request to the backend.
     * Upon success set user fields, cookies and add the authentication token to the client's headers
     * @param _email 
     * @param password 
     * @returns 
     */
    const login = async (_email: string, password: string) => {

        let data = {
            email: _email,
            password,
        }

        let res = await props.client.post(`${path}/login`, data)

        .catch((error: AxiosError) => {
            return Promise.reject(error);
        })


        // Server responded as expected but does not mean the user login was successful.
        if (res.data.status == 200) {
            // Handle successful response
            
            // Set user to active as the login was succesful
            setActive(true)
            setPublicId(res.data.body.user.public_id)
            setEmail(res.data.body.user.email)
            setIsAdmin(res.data.body.user.privilege)

            // Set cookies
            setCookies(res.data.body)

        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
            clear()
            console.log(res)
        }

        return res
    }


    /**
     * Send a logout request to the backend and clear all user fields, cookies, 
     * and remove the authentication token from the client's header.
     * @returns 
     */
    const logout = async() => {

        let res = await props.client.post(`${path}/logout`)
        
        .catch((error: AxiosError) => {
            clear()
            return Promise.reject(error);
        })


        clear()

        // Special action based on the server results of the logout.
        if (res.status != 200) {
            // Handle Server Error
        }

        if (res.data.status == 200) {
            // Handle successful response
        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
        }
        
        return res
    }


    /**
     * Upon success navigate the user to the home page or the dashboard. 
     * @param email 
     * @param password 
     * @returns 
     */
    const register = async (username: string, email: string, password: string) => {
        let data = {username, email, password}
        let res = await props.client.post(`${path}/user/create`, data)
        return res
    }

    /**
     * Send an update request to the backend to modify user attributes.
     * @returns 
     */
    const update = async () => {

        let res = await props.client.post(`${path}/update`)

        .catch (err => {
            return Promise.reject(err)
        })
        
        if (res.status != 200) {
            // Handle Server Error
        }

        if (res.data.status == 200) {
            // Handle successful response
        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
        }

        // No matter what even if the user could not be logged out, remove all headers and cookies that point to this user.
        return res        
    }


   /**
    * Validate the user by checking the authentication token on the backend.
    * [!] Update the authentication token by extending the time the token expires.
    * Upon failed validation, clear the users fields, cookies and remove the authentication token from the client's header.
    * @returns 
    */
    const validate = async () => {
        
        let res = await props.client.get(`${path}/token/validate`)
        .catch (err => {
            clear()
            return Promise.reject(err)
        })

        if (res.data.status == 401) {
            window.location.href = '/'
        }

        return res

    } 



    /**
     * Validate the user's authentication token every time the page is refreshed.
     */
    useEffect(() => {
        // Check for authentication cookie
        // Using Authorization and other user cookies make a request to the api to validate cookie information?
        // Implement Authorization expiration time so
        if (props.cookies.Authorization) {
           fromCookies()
           validate()
        } else {
            clear()
        }
    }, [])


    return {
        active,
        email,
        isAdmin,

        login,
        logout,
        register,
        update,

        clear,
        validate,

        setCookies,
    } as User

}


export default User;

