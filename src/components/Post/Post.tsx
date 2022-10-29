import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import {Container, Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Props } from '../../App'



type PostProps = Props & {
    title: string,
    body: string,
    bodyLimit?: number | undefined
}

export const Post = (props: PostProps) => {

    const [bodyLimit, setBodyLimit] = useState(props.bodyLimit)

    useEffect(() => {

    }, [])


    return (
        <>
        {/* 
            Use this in the Home() page an actual post page will be described below.
            Show a piece of the react markdown and if the user clicks the body or the header have the markdown expand.


            Use this for a dedicated Post() page. post/title/
            Or for use in the post/create view as the preview version of the post.
         */}

            <Container className='bg-dark text-start'>

                <Card className='bg-dark'>
                    <Card.Header>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} children={`# ${props.title}`} />
                    </Card.Header>
                   
                    {/* <ListGroup>
                        <ListGroupItem className='bg-dark text-white'>Tag 1</ListGroupItem>
                        <ListGroupItem className='bg-dark text-white'>Tag 2</ListGroupItem>
                    </ListGroup> */}

                    <Card.Body>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} children={props.body.substring(0, bodyLimit)} />
                    </Card.Body>

                    {/* Show More body Footer Overlay*/}
                    { bodyLimit && 
                        <Card.Footer className='text-center bg-dark' 
                        style={{marginTop: '-3rem', zIndex: '1'}} 
                        onClick={(e: any) => setBodyLimit(undefined)}>
                            Load More
                        </Card.Footer>
                    }
                    </Card>
            </Container>
        </>
    )
}





