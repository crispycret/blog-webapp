
// When sending confedential information such as passwords to the backend should they be encrypted 

import { useState } from "react";

import { APIInterface } from "../API";




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
    let [publicId, setPublicId] = useState(false)


    // Process of how to login, handles communication with the backend
    const login = async (password: string) => {

        let data = {
            email,
            password,
        }

        let res = await props.client.post(`${path}/login`, data)
        

        if (res.status != 200) {
            // Handle Server Error
            setActive(false)
            return
        }

        // Server responded as expected but does not mean the user login was successful.
        if (res.data.status == 200) {
            // Handle successful response
            
            // Set user to active as the login was succesful
            setActive(true)
            setPublicId(res.data.public_id)

            // Set user defined headers here and update the api headers afterwards.
            // Do the same on every action (edit, logout)
            // this way we know what headers are attributed to the user when looking at the overall api headers.
            props.client_config.headers.Authorization = res.data.Authorization

            // Set local storage or session cookies for user activity to persist
            // localStorage.setItem('auth.user.public_id', res.data.public_id)
            // localStorage.setItem('auth.user.is_admin', res.data.is_admin)
            return
        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
            setActive(false)
            return
        }
    }

    // Process of how to logout, handles communication with the backend
    const logout = async() => {
        
        let res = await props.client.post(`${path}/logout`)
        
        if (res.status != 200) {
            // Handle Server Error
        }

        if (res.data.status == 200) {
            // Handle successful response

            delete props.client_config.headers.Authentication
        }
        
        if (res.data.status == 400) {
            // Handle unsuccessful response
        }

        // No matter what even if the user could not be logged out, remove all headers and cookies that point to this user.

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
        update,
    }

}


export default User;

