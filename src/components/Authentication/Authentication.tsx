import { useEffect, useRef, useState } from "react"
import { Container, Modal, Form, Button, Tabs, Tab } from "react-bootstrap"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Props } from "../../App"



/*
    Displays a popup for user login and registration.
    Upon login or registration failure the error message will be displayed.

*/
export const Authentication = (props: Props, _show=false) => {

    const loginForm = useRef<HTMLFormElement>(null)
    const registerForm = useRef<HTMLFormElement>(null)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const loginRef = useRef<HTMLButtonElement>(null)
    const registerRef = useRef<HTMLButtonElement>(null)

    const [isLoading, setIsLoading] = useState(false)

    const [showLoginError, setShowLoginError] = useState(false)
    const [loginErrorMsg, setLoginErrorMsg] = useState("Login Failed")
    const loginErrorComponent = <>
        <div className="alert alert-danger" role="alert">
            {loginErrorMsg}
        </div>
    </>

    const [showRegisterError, setShowRegisterError] = useState(false)
    const [registerErrorMsg, setRegisterErrorMsg] = useState("Registration Failed")
    const registerErrorComponent = <>
        <div className="alert alert-danger" role="alert">
            {registerErrorMsg}
        </div>
    </>


    const handleClose = () => {
        props.setShowAuth(false)
    }

    const handleLogin = () => {
        props.user.login(email, password).then ((res) => {
            if (res.data.status == 200) {
                setShowLoginError(false)
                handleClose();
            
            }else {
                setShowLoginError(true)
                setLoginErrorMsg(res.data.msg)
            }
        })
    }

    
    const handleRegister = () => {
        // Don't allow submission if passwords do not match
        props.user.register(username, email, password).then ((res) => {
            if (res.data.status == 200) {
                setShowRegisterError(false)
                handleClose();
            } else {
                setShowRegisterError(true)
                setRegisterErrorMsg(res.data.msg)
            }
        })
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        const selectedForm = e.target.id

        // Enable Loading Visual
        setIsLoading(true)
        
        console.log(selectedForm)

        if (selectedForm == 'login'){
            handleLogin()
        }
        else if (selectedForm == 'register') {
            handleRegister()
        }

        // Disable Loading Visual
        setIsLoading(false)
    }


    useEffect(() => {}, [])


    return (
        <Container>
            <Modal show={props.showAuth} onHide={handleClose} className='my-auto text-light'>

                {isLoading &&
                    <Container className='auth-loading-overlay'>
                        <div className='mx-auto my-auto'>
                            <AiOutlineLoading3Quarters className='loading-symbol mx-auto my-auto'/>
                        </div>
                    </Container>
                }

                {/* <Modal.Header className='btn-close-white' closeButton></Modal.Header> */}

                {/* User is already autheticated */}
                {props.user.active &&
                    <>
                        {/* Display to the user that they are already authenticated but can logout. */}
                        {/* 
                        <Modal.Body>You are already logged in as {props.user.email}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={e => {props.user.logout(); handleClose();}}>Logout</Button>
                        </Modal.Footer> 
                        */}
                    </>
                }

                {/* User is not yet authenticated */}
                {!props.user.active &&
                    <Tabs id="auth-tabs" defaultActiveKey="login" className="bg-dark" fill>

                        {/* Display Login Tab */}
                        <Tab eventKey="login" title="Login" className="btn-dark bg-dark">
                            <Modal.Footer>
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
                                    <Button variant="primary" type="submit" ref={loginRef}>Login</Button>
                                </Form>
                            </Modal.Footer>
                        </Tab>


                        {/* Display Register Tab */}
                        <Tab eventKey="register" title="Register" className="bg-dark">
                            <Modal.Footer>
                                <Form id='register' ref={registerForm} style={{width: '100%'}} onSubmit={e => onSubmit(e)}>

                                    {showRegisterError && registerErrorComponent }
                                    
                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Username" value={username} onChange={e => setUsername(e.currentTarget.value)}/>
                                        <Form.Text className="text-muted">
                                            
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
                                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember Me" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" ref={registerRef}>Register</Button>
                                </Form>
                            </Modal.Footer>
                        </Tab>
 
                    </Tabs>

                }
            </Modal>
        </Container>
    )

}


export default Authentication

