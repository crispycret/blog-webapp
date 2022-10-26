import User from "./User";


// Authentication holds a user but does it require anything else?
// should the methods expressed in User be defined here instead?
// If so then User should simply act as a model to hold information.
export const Auth = (props: any) => {

    let user = User(props);

    return {
        user,
    }

}


export default Auth;