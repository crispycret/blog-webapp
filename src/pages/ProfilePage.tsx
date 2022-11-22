import { useEffect } from "react";
import Profile from "../components/Profile/Profile";




export const ProfilePage = (props?: any | undefined) => {

    useEffect(() => {

    }, [])

    return (
        <>
            <Profile {...props} />
        </>
    )

}



export default ProfilePage;