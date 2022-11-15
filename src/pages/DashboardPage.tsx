import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
        if (props.user.privilege == 0) {
            // window.location.href = '/'
        }

        if(props.user.privilege > 0) {
            console.log("UPDATE")
            props.posts.getPosts()
        }
    }, [])


    const element = <>
  
        <h1>Dashboard</h1>

        <>
            <PostManager {...props} />
        </>

    </>


    return (
        <Container fluid className="bg-dark text-white">
            {/* Put this in the dashboard forward to /dashboard/post/create */}

            <Routes>

                {!props.user.active && props.user.privilege == 0 &&
                    <Navigate to='/' replace/>
                }
                
                <Route index path='/' element={element} />
                
                {/* CreatePost and EditPost should be the same component */}
                {/* <Route path='/post/create' element={<CreatePost {...props}/>} /> */}
                <Route path='/post/create' element={<CreatePost {...props}/>} />
                <Route path='/post/:postId/edit' element={<EditPost {...props} />} />

                {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
            </Routes>
  
        </Container>
    )
}

export default DashboardPage;