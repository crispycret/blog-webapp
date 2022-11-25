import {useRef, useState, useEffect} from 'react';
import { Container, Modal, Form, Button, Tabs, Tab } from "react-bootstrap"

import { AuthPopUpProps } from './Authentication';



type RegistrationProps = AuthPopUpProps & {onSuccess?: (email:string, password:string) => Promise<any>}
export const Register = (props: RegistrationProps) => {
    
    const form = useRef<HTMLFormElement>(null)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Registration Failed")
    const errorComponent = <>
        <div className="alert alert-danger" role="alert">
            {errorMsg}
        </div>
    </>

    const handleRegister = async () => {
        // Don't allow submission if passwords do not match
        let res = await props.user.register(username, email, password)
        if (res.data.status == 200) {
            setShowError(false)
            if (props.onSuccess)
                props.onSuccess(email, password)
            // props.handleClose();
        } else {
            setShowError(true)
            setErrorMsg(res.data.msg)
        }
    }

    const onSubmit = (e:any) => {
        e.preventDefault()
        handleRegister()
    }


    return (
        <Form id='register' ref={form} style={{width: '100%'}} onSubmit={e => onSubmit(e)}>

            {showError && errorComponent }

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter Username" value={username} onChange={e => setUsername(e.currentTarget.value)}/>
                <Form.Text className="text-muted">
                    Username
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={e => setConfirmPassword(e.currentTarget.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
        </Form>
    )

}



export default Register