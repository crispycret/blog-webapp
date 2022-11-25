import { useState, useEffect, useRef } from "react"
import { Button, Modal } from "react-bootstrap"
import { Props } from "../../App"

export const EmailVerification = (props: Props) => {



    const [message, setMessage] = useState("")
    // Check to see if the email is verified for the user
    // if it is, redirect the user to their target destination
    // it it's not, force user to this page and notify them to check their email or send a new email confirmation.

    const codeRef = useRef<HTMLInputElement>(null)

    const handleClose = () => {}

    const sendEmailVerification = async () => {
        try {
            let res = await props.user.sendEmailVerification()
            if (res.status != 200) return;
            if (res.data.status == 200) {
                setMessage(`Email Verification Was Sent. Check ${props.user.email} to activate your account`)

            } else {
                // Display Error to the user so that they can make changes and try again
            }

        }
        catch (error) {}
    }

    const confirmEmailVerification = async () => {
        try {
            if (!codeRef.current) return;
            let res = await props.user.confirmEmailVerification(codeRef.current.value)
            if (res.status != 200) return
            if (res.data.status == 200) {
                
                props.user.emailVerifiedCheck()
                console.log(props.user.emailVerified)
                console.log("Change display to inform the user their email is active.")
                // props.user.emailVerifiedCheck()
            } else {
                // Display Error to the user so that they can make changes and try again

            }
        } catch (error) {}
    }


    useEffect(() => {
        if (props.user.active)
            props.user.emailVerifiedCheck()
    }, [props.user.active, props.user.emailVerified])

    return (
        <>
            { props.user.active && !props.user.emailVerified &&
                <>
                    <div>
                        EMAIL NOT VERIFIED
                    </div>
                    <Modal show={!props.user.emailVerified} onClose={handleClose}>
                        <Modal.Title>Email Verification</Modal.Title>
                        <Modal.Body>
                            <div>
                                Check Your Email For Your Verification Code
                            </div>
                            <input type='text' ref={codeRef} />
                            <div>
                                <a onClick={sendEmailVerification}>Send Email</a>
                            </div>
                            <div>
                                <Button onClick={confirmEmailVerification}>Submit</Button>
                            </div>
                        </Modal.Body>
        
                    </Modal>
                </>
            }
            
            { props.user.emailVerified &&
                <>
                    {/* <div>
                        EMAIL VERIFIED
                    </div> */}
                </>
            }
        </>
    )

}


export default EmailVerification;