import { useEffect } from "react";
import { Props } from "../App";


export const Dashboard = (props: Props) => {

    useEffect (() => {
        if (!props.user.isAdmin)
        {
            window.location.href = '/'
        }
    }, [])

    return (
        <>
        </>
    )
}

export default Dashboard;