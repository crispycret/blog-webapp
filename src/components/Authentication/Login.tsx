import { useEffect, useRef, useState } from "react"
import { Container, Modal, Form, Button, Tabs, Tab } from "react-bootstrap"

import { AuthPopUpProps } from './Authentication';

type LoginProps = AuthPopUpProps & {email: string, password: string, setEmail: any, setPassword: any, login: boolean}
export const Login = (props: LoginProps) => {


    const form = useRef<HTMLFormElement>(null)
    const loginBtn = useRef<HTMLButtonElement>(null)

    const [username, setUsername] = useState("")

    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Login Failed")
    const errorComponent = <>
        <div className="alert alert-danger" role="alert">
            {errorMsg}
        </div>
    </>


    const handleLogin = async () => {
        try {
            // Login Request
            let response = await props.user.login(props.email, props.password) 
            if (response.data.status == 200) {
                setShowError(false)
                setErrorMsg('')

                // emailVerifiedCheck(props)
                
                props.handleClose()
            } else {
                setShowError(true)
                setErrorMsg(response.data.msg)
            }
            
        } catch (error) {
            return        
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        handleLogin()
    }


    
    useEffect(() => {
        console.log(props.login)
        if (props.login) {
            loginBtn.current?.click()
        }
    }, [props.login])



    return (
        <Form id='login' ref={form} style={{width: '100%'}} onSubmit={e => onSubmit(e)}>
                                    
            {showError && errorComponent }



            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={props.email} onChange={e => props.setEmail(e.currentTarget.value)}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={props.password} onChange={e => props.setPassword(e.currentTarget.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button variant="primary" type="submit" ref={loginBtn}>Login</Button>
        </Form>
    )

}



export default Login;