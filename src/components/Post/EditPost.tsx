import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Tabs, Tab } from 'react-bootstrap'

import { Props } from '../../App';

import Post from './Post';
import PostForm from './PostForm';
import { AxiosError } from 'axios';

export const EditPost = (props: Props) => {

    const {postId} = useParams()

    const [id, setId] = useState(postId)
    const [title, setTitle] = useState('Post Title')
    const [body, setBody] = useState('Post Body')

    const postProps = {
        id,
        title, setTitle,
        body, setBody
    }

    const getPost = async () => {
        // id was retrived from useParams() that means we are editing a post
        // otherwise we are creating a post
        if (postId && id) {
            let res = await props.posts.getPost(id)
            .catch (error => {
                return Promise.reject(error)
            })

            if (res.data.status == 200) {
                setTitle(res.data.body.title)
                setBody(res.data.body.body)
            }
        }
    }

    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')


    const handleSubmit = async () => {
        if (postId && id) {
            console.log("Updating")
            let res = await props.posts.updatePost(id, title, body)
            
            .catch(error => {
                return Promise.reject(error)
            })
            
            console.log(res)

            return res
        } 
        // Handle Create Post Submission
        else {
            console.log("Creating")
            let data = {
                title: postProps.title,
                body: postProps.body
            }
            
            let res = await props.api.client.post('/blog/post/create', data)
            
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
    }



    const postFormProps = {
        showError, setShowError,
        errorMsg, setErrorMsg,
        handleSubmit
    }    

    
    useEffect(() => {
        getPost()
    }, [])


    return (
        <Container fluid className='bg-dark text-white'>
            <Container className='bg-dark text-white'>
                <h1>
                    { id && 'Edit Post'}
                    { !id && 'Create New Post'}
                </h1>

                <Tabs
                    defaultActiveKey="edit"
                    id="createbo-post-tabs"
                    className="mb-3 border-0"
                >
                    <Tab eventKey="edit" title="Edit">
                        {/* feed PostForm an onSubmit method that determines if we need to Edit a post or creat a new post */}
                        <PostForm {...props} {...postProps} {...postFormProps}/>
                    </Tab>
                    <Tab eventKey="view" title="View">
                        <Post {...props} {...postProps} />
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    )
}



export default EditPost;