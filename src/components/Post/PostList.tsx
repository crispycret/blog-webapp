import { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import { AxiosError } from "axios"

import { Props } from "../../App"
import { Post } from './Post'



export const PostList = (props: Props) => {

    const [posts, setPosts] = useState<JSX.Element[]>([<></>])

    const getPosts = async () => {
        
        let res = await props.api.client.get('/post/all')
        
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        })

        if (res.data.status == 200) {
            // Store raw posts data ??
            
            // // For each post object in the request create a post element.
            setPosts(
                res.data.body.posts.map((post: any) => <>
                    <Container className='mb-3'>
                        <Card>
                            <Post {...props} title={post.title} body={post.body} bodyLimit={500}/>            
                        </Card>
                    </Container>
                </>
            ))
        }

        return res
    }


    useEffect(() => {
        getPosts()
    }, [])


    return (
        <>
            {posts}
        </>
    )
}


export default PostList;