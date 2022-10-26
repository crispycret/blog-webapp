


export const Authentication = (props: any) => {

    return (
        <>
            {/* User is already autheticated */}
            {props.auth.user.active &&
                <>
                    {/* Display to the user that they are already authenticated but can logout. */}
                </>
            }

            {/* User is not yet authenticated */}
            {!props.auth.user.active &&
                <>
                    {/* Display to the user that they can either login, register or reset password */}
                </>
            }
        </>
    )

}

