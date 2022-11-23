import { useState, useEffect } from "react"
import { Props } from "../../App"

export const emailVerifiedCheck = (props: Props, setVerified:any) => {
    const check = () => {

        console.log("emailVerifiedCheck")

        props.user.emailVerifiedCheck()
        .catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
        .then(res => {
            console.log(res)
            if (res.data.status == 200)
                setVerified(true)
            else
                setVerified(false)
        })
    }
    check()
}


export const EmailVerification = (props: Props) => {

    // Check to see if the email is verified for the user
    // if it is, redirect the user to their target destination
    // it it's not, force user to this page and notify them to check their email or send a new email confirmation.

    const [verified, setVerified] = useState(false);


    useEffect(() => {
        emailVerifiedCheck(props, setVerified)
    }, [])

    return (
        <>
            { !verified &&
                <>
                    <div>
                        EMAIL IS NOT VERIFIED
                    </div>
                </>
            }
            
            { verified &&
                <>
                    <div>
                        EMAIL IS VERIFIED
                    </div>
                </>
            }
        </>
    )

}


export default EmailVerification;