import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosInstance, AxiosResponse } from "axios";

import Post from "../components/Post/Post";

import { Props } from "../App";




export const PostPage = (props: Props) => 
{

    const {postId} = useParams ();
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [bodyLength, setBodyLength] = useState<number | undefined>()

    const postProps = {
        id, title, body, bodyLength
    }

    const getPost = async () => {

        // Require a postId retrieved from the url using react-router-dom
        if (!postId) return;

        setId(postId)

        let res = await props.posts.getPost(postId)
        .catch (err => {
            return Promise.reject(err)
        })

        if (res.data.status == '200') {
            setTitle(res.data.body.title)
            setBody(res.data.body.body)
        }
        return res
    }


    useEffect( () => {
        console.log("PostPage")
        getPost()
    }, [])


    return (
        <Post {...props} {...postProps} />
    )  

}


export default PostPage;

