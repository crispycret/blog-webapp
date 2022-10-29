import { useState, useEffect } from 'react'
import { Container, Tabs, Tab } from "react-bootstrap"
import { Props } from "../../App"

import { Post } from "./Post"
import PostForm from "./PostForm"


export const CreatePost = (props: Props) => {

    const [title, setTitle] = useState('Post Title')
    const [body, setBody] = useState(``)

    const postProps = {
        title, setTitle,
        body, setBody
    }


    useEffect(() => {
    }, [])


    return (
        <Container>
            <Tabs
                defaultActiveKey="edit"
                id="create-post-tabs"
                className="mb-3"
            >
                <Tab eventKey="edit" title="Edit">
                    {/* <PostForm {...props} title={title} setTitle={setTitle} body={body} setBody={setBody}/> */}
                    <PostForm {...props} {...postProps} />
                </Tab>
                <Tab eventKey="view" title="View">
                    <Post {...props} {...postProps} />
                </Tab>
            </Tabs>
        </Container>
    )


}