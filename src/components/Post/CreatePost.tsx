import { AxiosError } from 'axios'
import { useState, useEffect } from 'react'
import { Container, Tabs, Tab } from "react-bootstrap"
import { Props } from "../../App"

import '../../assets/css/create_post.css'

import Post  from "./Post"
import PostForm from "./PostForm"



export const CreatePost = (props: Props) => {

    const [title, setTitle] = useState('Post Title')
    const [body, setBody] = useState(``)

    const postProps = {
        title, setTitle,
        body, setBody
    }

    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    


    const handleSubmit = async () => {
        let data = {
            title: postProps.title,
            body: postProps.body
        }
        
        let res = await props.api.client.post('/post/create', data)
        
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        })

        if (res.data.status == 200) {
            window.location.href = '../..'
        }

        // Post title already exists.
        if (res.data.status == 409) {
            setShowError(true)
            setErrorMsg(res.data.body)
        }
        return res
    }


    const postFormProps = {
        showError, setShowError,
        errorMsg, setErrorMsg,
        handleSubmit
    }

    useEffect(() => {
    }, [])

    return (
        <Container className='bg-dark flex-grow vh-100'>
            <h1>Create New Post</h1>
            <Tabs
                defaultActiveKey="edit"
                id="createbo-post-tabs"
                className="mb-3 border-0"
            >
                <Tab eventKey="edit" title="Edit">
                    <PostForm {...props} {...postProps} {...postFormProps} />
                </Tab>
                <Tab eventKey="view" title="View">
                    <Post {...props} {...postProps} />
                </Tab>
            </Tabs>
        </Container>
    )


}


export default CreatePost;
