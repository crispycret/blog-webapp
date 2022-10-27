
// When sending confedential information such as passwords to the backend should they be encrypted 

import { useState } from "react";
import axios, { AxiosResponse } from "axios";

import {useCookies} from 'react-cookie'

import { APIInterface } from "./API";


export interface UserInterface {
    active: boolean;
    email: string;
    isAdmin: boolean;
    login: (_email: string, password: string) => Promise<AxiosResponse<any, any>>;
    logout: () => Promise<void>;
    register: (_email: string, password: string) => Promise<AxiosResponse<any, any>>;
    update: () => Promise<void>;
}


// using an application key known by server and frontend for extra security?
export const User = (props: APIInterface) => {

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
        
        console.log(res)

        if (res.status != 200) {
            // Handle Server Error
            setActive(false)
            return res
        }

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
            props.setCookie('Authorization', token)
            props.setCookie('user.active', true)
            props.setCookie('user.email', res.data.body.user.email)
            props.setCookie('user.publicId', res.data.body.user.public_id)

            // Add the authorization toke to every new request made.
            props.setHeader('Authorization', token)

            return res
        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
            setActive(false)
            return res
        }

        return res
    }

    // Process of how to logout, handles communication with the backend
    const logout = async() => {

        console.log("Logging Out")
        console.log(props.client.defaults.headers)

        
        let res = await props.client.post(`/logout`)
        
        console.log(res)

        if (res.status != 200) {
            // Handle Server Error
            console.log("Logout Error")
        }

        if (res.data.status == 200) {
            // Handle successful response

            // Clear user
            setActive(false)
            setEmail("")
            setIsAdmin(false)
            setPublicId("")
                        
            // Clear cookies
            props.removeCookie('Authorization')
            props.removeCookie('user.active')
            props.removeCookie('user.email')
            props.removeCookie('user.publicId')

            // Remove authorization token from every new request made.
            delete axios.defaults.headers.common['Authorization']
        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
            console.log("Logout Failed")

        }

        // No matter what even if the user could not be logged out, remove all headers and cookies that point to this user.

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

