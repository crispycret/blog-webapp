import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { Container, Card } from 'react-bootstrap'

import { Props } from "../App";
import PostList from "../components/Post/PostList";


export const Home = (props: Props) => {

    return (
        <>
            <Container className='bg-dark text-white'>
                <div className='mb-3'></div>

                <PostList {...props} />

                { !props.user.active && <>{}</> }
            </Container>

        </>
    )
}



export default Home;
