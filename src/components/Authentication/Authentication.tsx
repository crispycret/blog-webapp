import { useEffect, useRef, useState } from "react"
import { Container, Modal, Form, Button, Tabs, Tab } from "react-bootstrap"

import { Props } from "../../App"



/*
    Displays a popup for user login and registration.
    Upon login or registration failure the error message will be displayed.

*/
export const Authentication = (props: Props, _show=false) => {

    const loginForm = useRef<HTMLFormElement>(null)
    const registerForm = useRef<HTMLFormElement>(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Login Failed")
    const errorComponent = <>
        <div className="alert alert-danger" role="alert">
            {errorMsg}
        </div>
    </>

    const handleClose = () => {
        props.setShowAuth(false)
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        // Disable fields and ability to resubmit
        // Enable loading symbol for visual effect
        
        // Is this an email
        // Is this a valid password for this site

        const selectedForm = e.target.id
        if (selectedForm == 'login'){

            props.user.login(email, password).then ((res) => {
                if (res.data.status == 200) {
                    // Login successful
                    // display login success state??
                    setShowError(false)
                    handleClose();
                }

                if (res.data.status == 400) {
                    // Login unsuccessful
                    // display red error bar at top of form fields
                    
                    setShowError(true)
                    setErrorMsg(res.data.msg)
                }
            })
        }

        else if (selectedForm == 'register') {

            // Confirm password matches password
            props.user.register(email, password).then ((res) => {
                if (res.data.status == 200) {
                    // register successful
                    // display register success state??
                    // Forward to login or actually login.
                    // -> Display register success -> Have button to login now
                    setShowError(false)
                    handleClose();
                }

                if (res.data.status == 400) {
                    // Login unsuccessful
                    // display red error bar at top of form fields
                    setShowError(true)
                    setErrorMsg(res.data.msg)
                }
            })
        }
    }


    useEffect(() => {

    }, [])

    return (
        <Container>
            <Modal show={props.showAuth} onHide={handleClose} className='my-auto'>

                {/* User is already autheticated */}
                {props.user.active &&
                    <>
                        {/* Display to the user that they are already authenticated but can logout. */}
                        <Modal.Header closeButton>
                            <Modal.Title>Authentication</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You are already logged in as {props.user.email}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={e => {props.user.logout(); handleClose();}}>Logout</Button>
                        </Modal.Footer>
                    </>
                }

                {/* User is not yet authenticated */}
                {!props.user.active &&
                    <>

                    <Modal.Header closeButton></Modal.Header>
                    
                    <Tabs
                        defaultActiveKey="login"
                        id="auth-tabs"
                        className="mb-3 position-absolute top-0 "
                    >
                        {/* Display Login Tab */}
                        <Tab eventKey="login" title="Login">

                            {showError && <Modal.Body>{errorComponent}</Modal.Body> }

                            <Modal.Footer>
                                <Form id='login' ref={loginForm} style={{width: '100%'}} onSubmit={e => onSubmit(e)}>
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
                            </Modal.Footer>
                        </Tab>



                        {/* Display Register Tab */}
                        <Tab eventKey="register" title="Register">
                            {showError &&
                                <Modal.Body>
                                    {errorComponent}
                                </Modal.Body>
                            }

                            <Modal.Footer>

                                <Form id='register' ref={registerForm} style={{width: '100%'}} onSubmit={e => onSubmit(e)}>
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
                                    <Button variant="primary" type="submit">Login</Button>
                                </Form>

                            </Modal.Footer>


                        </Tab>
                        {/* <Tab eventKey="contact" title="Contact" disabled></Tab> */}
                    </Tabs>



                        {/* Display to the user that they can either login, register or reset password */}
                       
                    </>
                }
            </Modal>
        </Container>
    )

}

