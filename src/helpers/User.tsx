
// When sending confedential information such as passwords to the backend should they be encrypted 

import { useState, useEffect} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import {useCookies} from 'react-cookie'
import API from "./API";



export type User = {
    active: boolean;
    email: string;
    isAdmin: boolean;
    login: (_email: string, password: string) => Promise<AxiosResponse<any, any>>;
    logout: () => Promise<void>;
    register: (_email: string, password: string) => Promise<AxiosResponse<any, any>>;
    update: () => Promise<void>;
}


// using an application key known by server and frontend for extra security?
export const User = (props: API) => {


    let path = '/user'

    // Boolean value for if the user is logged in.
    let [active, setActive] = useState(false);

    // email provided by the user or retrieved using cookies
    let [email, setEmail] = useState("")

    // state of the user that will allow access to features and pages that should be restricted to normal users.
    let [isAdmin, setIsAdmin] = useState(false)

    // state of the user provided by the server upon successful login
    let public_id = ""
    let [publicId, setPublicId] = useState("")


    // Process of how to login, handles communication with the backend
    const login = async (_email: string, password: string) => {

        setEmail(_email)

        let data = {
            email: _email,
            password,
        }

        let res = await props.client.post(`/login`, data)

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
            setIsAdmin(res.data.body.user.is_admin)

            // Set cookies
            let token = res.data.body.Authorization
            props.setCookie('Authorization', token, { path: '/', secure: true, sameSite: true})
            props.setCookie('user_active', true, { path: '/', sameSite: true })
            props.setCookie('user_email', res.data.body.user.email, { path: '/', sameSite: true })
            props.setCookie('user_publicId', res.data.body.user.public_id, { path: '/', sameSite: true })
            props.setCookie('user_isAdmin', res.data.body.user.is_admin, { path: '/', sameSite: true })

            // Add the authorization token to every new request made.
            props.setHeader('Authorization', token)

            return res
        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
            setActive(false)
            console.log(res)
            return res
        }

        return res
    }

    // Process of how to logout, handles communication with the backend
    const logout = async() => {

        let res = await props.client.post(`/logout`)
        
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        })
        
        // No matter the status of the logout server side, make sure logout happens client side
        // If the user could not be logged out successfully server side, remove all headers and cookies that point to this user.
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


        // Special action based on the server results of the logout.
        if (res.status != 200) {
            // Handle Server Error
            return 
        }

        if (res.data.status == 200) {
            // Handle successful response
        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
        }


    }


    const register = async () => {
        let res = await props.client.post('/register')
        return res
    }

    // Rename to edit or modify
    // Process of how to update, handles communication with the backend
    const update = async () => {

        let res = await props.client.post(`${path}/update`)
        
        if (res.status != 200) {
            // Handle Server Error
            return
        }

        if (res.data.status == 200) {
            // Handle successful response
            return
        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
            return
        }

        // No matter what even if the user could not be logged out, remove all headers and cookies that point to this user.
        
    }



    // On Page Load check cookies
    useEffect(() => {
        // Check for authentication cookie
        // Using Authorization and other user cookies make a request to the api to validate cookie information?
        // Implement Authorization expiration time so
        if (props.cookies.Authorization) {
            setActive(true)
            setEmail(props.cookies.user_email)
            setPublicId(props.cookies.user_publicId)
            setIsAdmin(props.cookies.user_isAdmin)
            
            // Re-add request headers that should persist for every request
            props.setHeader('Authorization', props.cookies.Authorization)
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
    }

}


export default User;

