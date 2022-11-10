import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { Container, Card } from 'react-bootstrap'

import { Props } from "../App";
import PostList from "../components/Post/PostList";


export const HomePage = (props: Props) => {

    useEffect ( () => {
        props.posts.getPosts()
    }, [])

    return (
        <Container className='bg-dark py-5 '>
            <PostList {...props} />
        </Container>
    )
}



export default HomePage;
