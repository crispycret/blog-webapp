import { useEffect, useRef, useState } from "react"
import { Container, Modal, Form, Button } from "react-bootstrap"
import { PropsInterface } from "../../App"




export const Authentication = (props: PropsInterface) => {

    const [show, setShow] = useState(true)
    const loginForm = useRef<HTMLFormElement>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClose = () => {
        setShow(false)
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        // Disable fields and ability to resubmit
        // Enable loading symbol for visual effect

        props.auth.user.login(email, password).then ((res) => {
            if (res.data.status == 200) {
                // Login successful
                // display login success state??
                handleClose();
            }

            if (res.data.status == 400) {
                // Login unsuccessful
                // display red error bar at top of form fields
                
            }
        })

    }

    useEffect(() => {

    }, [])

    return (
        <Container>
            <Modal show={show} onHide={handleClose}>

                {/* User is already autheticated */}
                {props.auth.user.active &&
                    <>
                        {/* Display to the user that they are already authenticated but can logout. */}
                        <Modal.Header closeButton>
                            <Modal.Title>Authentication</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You are already logged in as {props.auth.user.email}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={handleClose}>Logout</Button>
                        </Modal.Footer>
                    </>
                }

                {/* User is not yet authenticated */}
                {!props.auth.user.active &&
                    <>
                        {/* Display to the user that they can either login, register or reset password */}
                        <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Login using email and password</Modal.Body>
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
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <Button variant="primary" type="submit">Login</Button>
                            </Form>

                        </Modal.Footer>
                    </>
                }
            </Modal>
        </Container>
    )

}

