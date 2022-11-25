import { useEffect, useRef, useState } from "react"
import { Container, Modal, Form, Button, Tabs, Tab } from "react-bootstrap"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Props } from "../../App"
import EmailVerification from "./EmailVerification"
import Login from "./Login"
import Register from "./Register"

export type AuthPopUpProps = Props & {handleClose: () => void}


/*
    Displays a popup for user login and registration.
    Upon login or registration failure the error message will be displayed.

*/
export const Authentication = (props: Props, _show=false) => {

    const defaultSelectedTab = 'login'
    const [selectedTab, setSelectedTab] = useState(defaultSelectedTab)
    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [triggerLogin, setTriggerLogin] = useState(false)


    const handleClose = () => {
        props.setShowAuth(false)
    }

    // Upon successful registration activate and forward credentials to the login tab
    const successfulRegistration = async (_email: string, _password: string) => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSelectedTab('login')
        setEmail(_email)
        setPassword(_password)
        // Wait 1 second before attempting to login
        setTriggerLogin(true)
    }

    const loginProps = {
        email, password,
        setEmail, setPassword,
        login: triggerLogin,
    }

    useEffect(() => {}, [])


    return (
        <Container>
            <div><EmailVerification {...props} /></div>
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
                    <Tabs id="auth-tabs" defaultActiveKey={defaultSelectedTab} className="bg-dark" fill
                        activeKey={selectedTab}
                        onSelect={(k) => setSelectedTab(k || defaultSelectedTab)}
                    >
                        {/* Display Login Tab */}
                        <Tab eventKey="login" title="Login" className="btn-dark bg-dark">
                            <Modal.Footer>
                            <Login handleClose={handleClose} {...loginProps} {...props}/>
                            {/* <Login handleClose={handleClose} email={email} password={password} {...props}/> */}
                            </Modal.Footer>
                        </Tab>

                        {/* Display Register Tab */}
                        <Tab eventKey="register" title="Register" className="bg-dark">
                            <Modal.Footer>
                                <Register handleClose={handleClose} onSuccess={successfulRegistration} {...props}/>
                            </Modal.Footer>
                        </Tab>
                    </Tabs>

                }
            </Modal>
        </Container>
    )

}


export default Authentication

