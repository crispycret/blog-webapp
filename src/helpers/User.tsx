import { useState, useEffect} from "react";
import {useCookies} from 'react-cookie'
import axios, { AxiosError, AxiosResponse } from "axios";

import API from "./API";



export type User = {
    active: boolean;
    email: string;
    privilege: number;
    emailVerified: boolean;

    register: (username: string, _email: string, password: string) => Promise<AxiosResponse<any, any>>;
    login: (_email: string, password: string) => Promise<AxiosResponse<any, any>>;
    logout: () => Promise<AxiosResponse<any, any>>;
    update: () => Promise<AxiosResponse<any, any>>;
    validateToken: () => Promise<AxiosResponse<any, any>>;
    emailVerifiedCheck: () => Promise<AxiosResponse<any, any>>;
    sendEmailVerification: () => Promise<AxiosResponse<any, any>>;
    confirmEmailVerification: (code:string) => Promise<AxiosResponse<any, any>>;

    clear: () => void,
    setCookies: (data: any) => void,
}


// using an application key known by server and frontend for extra security?
export const User = (props: API) => {


    let path = '/auth'

    // Boolean value for if the user is logged in.
    let [active, setActive] = useState(false);
    let [email, setEmail] = useState("")
    let [privilege, setPrivilege] = useState(0)
    let [publicId, setPublicId] = useState("")
    let [emailVerified, setEmailVerified] = useState(false)


    /**
     * Set user fields and the client headers authentication token from the cookies
     */
    const fromCookies = () => {
        setActive(props.cookies.user_active)
        setEmail(props.cookies.user_email)
        setPublicId(props.cookies.user_publicId)
        setPrivilege(props.cookies.user_privilege)
        setEmailVerified(props.cookies.user_emailVerified)
        
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
            props.setCookie('user_privilege', data.user.privilege, { path: '/', sameSite: true })
            props.setCookie('user_emailVerified', data.user.email_verified, { path: '/', sameSite: true })

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
        setPublicId("")
        setPrivilege(0)
        setEmailVerified(false)
                    
        // Clear cookies
        props.removeCookie('Authorization')
        props.removeCookie('user_active')
        props.removeCookie('user_email')
        props.removeCookie('user_publicId')
        props.removeCookie('user_privilege')
        props.removeCookie('user_emailVerified')

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

        if (res.data.status == 200) {
            setActive(true)
            setPublicId(res.data.body.user.public_id)
            setEmail(res.data.body.user.email)
            setPrivilege(res.data.body.user.privilege)
            setCookies(res.data.body)
        
        } else {
            clear()
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
            return Promise.reject(error);
        })
        clear()
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
        let res = await props.client.post(`${path}/create_user`, data)
        return res
    }

    /**
     * Send an update request to the backend to modify user attributes.
     * @returns 
     */
    const update = async () => {
        if (!active) return

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
    const validateToken = async () => {
        
        let res = await props.client.get(`${path}/token/validate`)
        .catch (err => {
            clear()
            return Promise.reject(err)
        })

        if (res.data.status == 401) {
            clear()
            window.location.href = '/'
        }
        return res
    } 

    /**
     * Request a status check of the user's email verfication on the backend and update the user state if changes detected.
     * Only set a variable state if their was a change to reflect so that state listeners of useEffect don't trigger an infinite loop.
     * @returns 
     */
    const emailVerifiedCheck = async () => {
        // Only submit a verification request if logged in
        if (!active) return

        // data required for the request is present in the applied headers
        // Authorization token is all that is required.
        let res = await props.client.get(`${path}/user`)
        .catch(err => {
            return Promise.reject(err)
        })
 
        // Request failed I. Set emailVerified to false if set to true
        if (res.status != 200) {
            if (emailVerified == true) {
                setEmailVerified(false)
                props.setCookie('user_emailVerified', false, { path: '/', sameSite: true })    
            }
            return res
        }

        // Request failed II. Set emailVerified to false if set to true
        if (res.data.status != 200) {
            if (emailVerified == true) {
                setEmailVerified(false)
                props.setCookie('user_emailVerified', false, { path: '/', sameSite: true })    
            }
            return res
        }
 
        // Request success. Change state if new state detected
        if (res.data.status == 200) {
            let verified = res.data.body.email_verified
            if (emailVerified != verified) {
                setEmailVerified(verified)
                props.setCookie('user_emailVerified', verified, { path: '/', sameSite: true })
            }
        }
        return res
    } 

    const sendEmailVerification = async () => {
        // Only submit a request if logged in
        if (!active) return
        
        let res = await props.client.post(`${path}/send_email_verification`)
        return res
    }
    
    const confirmEmailVerification = async (code:string) => {
        // Only submit a request if logged in.
        if (!active) return

        let data = {verification_code:code}
        let res = await props.client.post(`${path}/confirm_email_verification`, data)
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
           validateToken()
        } else {
            clear()
        }
    }, [])


    return {
        active,
        email,
        publicId,
        privilege,
        emailVerified,

        login,
        logout,
        register,
        update,

        clear,
        validateToken,
        emailVerifiedCheck,
        sendEmailVerification,
        confirmEmailVerification,

        setCookies,
    } as User

}


export default User;

