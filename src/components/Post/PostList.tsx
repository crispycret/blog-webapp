import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'

import { AxiosError } from "axios"

import Post from './Post'

import { Props } from "../../App"



export const PostList = (props: Props) => {

    const [posts, setPosts] = useState<JSX.Element[]>([<div key={0}/>])

    const getPosts = async () => {
        
        let res = await props.api.client.get('/blog/posts')
        
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        })

        if (res.data.status == 200) {
            // Store raw posts data ??
            
            // // For each post object in the response create a post element.
            setPosts(
                res.data.body.posts.map((post: any) =>
                <Container key={post.id} className='py-2'>
                    <Post {...props} id={post.id} title={post.title} body={post.body} bodyLength={500} />            
                </Container>
            ))
        }

        return res
    }


    useEffect(() => {
        getPosts()
    }, [])


    return (
        <Container>
            <div className='pt-4'> </div>
            {posts}
        </Container>
    )
}


export default PostList;