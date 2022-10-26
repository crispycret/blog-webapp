import Navbar from "../components/Navbar/Navbar";


export const Home = (props: any) => {

    return (
        <>

        <Navbar props/>
        
        {!props.auth.user.active &&
            <>
        
            </>
        }

        </>
    )
}



export default Home;
