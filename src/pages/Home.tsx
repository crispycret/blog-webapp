import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { Container, Card } from 'react-bootstrap'

import { Props } from "../App";
import { Post } from "../components/Post/Post";


export const Home = (props: Props) => {

    // Create file PostManager to manage retireving posts

    // For now ?

    const [postsData, setPostsData] = useState<Array<object>>([])
    const [posts, setPosts] = useState<JSX.Element[]>([<></>])

    const getPosts = async () => {
        
        let res = await props.api.client.get('/post/all')
        
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        })

        if (res.data.status == 200) {
            // Store raw posts data ??
            setPostsData(res.data.body.posts)
            
            // For each post object in the request create a post element.
            let elements = []
            for (let post of res.data.body.posts) {
                let element = <>
                    <Container className='mb-3'>
                        <Card>
                            <Post {...props} title={post.title} body={post.body} bodyLimit={500}/>            
                        </Card>
                    </Container>
                </>
                elements.push(element)
            }

            setPosts(elements)
        }

        return res
    }


    useEffect(() => {
        getPosts()
    }, [])


    return (
        <>

            <div className='mb-3'></div>

            {posts}

            {!props.user.active &&
                <>
                {

                }
                </>
            }

        </>
    )
}



export default Home;
