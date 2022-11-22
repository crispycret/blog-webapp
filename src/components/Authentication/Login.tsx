import { useEffect, useRef, useState } from "react"
import { Container, Modal, Form, Button, Tabs, Tab } from "react-bootstrap"



export const Login = (props: any, handleClose: any) => {


    const loginForm = useRef<HTMLFormElement>(null)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [showLoginError, setShowLoginError] = useState(false)
    const [loginErrorMsg, setLoginErrorMsg] = useState("Login Failed")
    const loginErrorComponent = <>
        <div className="alert alert-danger" role="alert">
            {loginErrorMsg}
        </div>
    </>


    const handleLogin = () => {
        props.user.login(email, password).then((res: any) => {
            if (res.data.status == 200) {
                setShowLoginError(false)
                handleClose();
            
            }else {
                setShowLoginError(true)
                setLoginErrorMsg(res.data.msg)
            }
        })
    }


    const onSubmit = (e: any) => {

    }

    return (
        <Form id='login' ref={loginForm} style={{width: '100%'}} onSubmit={e => onSubmit(e)}>
                                    
            {showLoginError && loginErrorComponent }



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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
        </Form>
    )

}



export default Login;