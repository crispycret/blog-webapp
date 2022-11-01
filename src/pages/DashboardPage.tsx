import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Props } from "../App";

import CreatePost from "../components/Post/CreatePost";
import PostManager from "../components/Dashboard/PostManager";
import Post from "../components/Post/Post";
import EditPost from "../components/Post/EditPost";


export type RouteProps = Props & {
    match?: any
}

export const DashboardPage = (props: RouteProps) => {



    useEffect (() => {
        if (!props.user.isAdmin) {
            window.location.href = '/'
        }

        if(props.user.isAdmin) {
            console.log("UPDATE")
            props.posts.getPosts()
        }
    }, [])


    const element = <>
  
        <h1>Dashboard</h1>

        <Container>
            <PostManager {...props} />
        </Container>

    </>


    return (
        <>
            {/* Put this in the dashboard forward to /dashboard/post/create */}

            <Routes>
                <Route index path='/' element={element} />
                
                {/* CreatePost and EditPost should be the same component */}
                {/* <Route path='/post/create' element={<CreatePost {...props}/>} /> */}
                <Route path='/post/create' element={<CreatePost {...props}/>} />
                <Route path='/post/:postId/edit' element={<EditPost {...props} />} />
            </Routes>
  
        </>
    )
}

export default DashboardPage;