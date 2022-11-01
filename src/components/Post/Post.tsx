import { useEffect, useState } from 'react'
import { Container, Card } from 'react-bootstrap'

import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import Posts from '../../helpers/Posts'

import { Props } from '../../App'
import { Link } from 'react-router-dom'



type PostProps = Props & {
    id?: string | undefined,
    title?: string | undefined,
    body?: string | undefined,
    bodyLength?: number | undefined,
}

export const Post = (props: PostProps) => {

    // Take control of body length to expand the body when toggled.
    const [bodyLength, setBodyLength] = useState(props.bodyLength) // maxBodyLength || bodyLength


    return (
        <>
        {/* 
            Use this in the Home() page an actual post page will be described below.
            Show a piece of the react markdown and if the user clicks the body or the header have the markdown expand.


            Use this for a dedicated Post() page. post/title/
            Or for use in the post/create view as the preview version of the post.
         */}

            <Container data-attribute-value={props.id} className='bg-dark text-start'>

                <Card className='bg-dark'>
                    <Card.Header className='text-light border rounded-top border-light border-1'>
                        <Link to={`/post/${props.id}`} style={{textDecoration:'none'}} className='text-light'>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} children={`# ${props.title}`} />
                        </Link>
                    </Card.Header>
                   
                    {/* <ListGroup>
                        <ListGroupItem className='bg-dark text-white'>Tag 1</ListGroupItem>
                        <ListGroupItem className='bg-dark text-white'>Tag 2</ListGroupItem>
                    </ListGroup> */}

                    <Card.Body className='border rounded-bottom border-light border-1'>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]} 
                            rehypePlugins={[rehypeHighlight]} 
                            children={props.body ? props.body.substring(0, bodyLength) : ""} />
                    </Card.Body>

                    {/* Show More body Footer Overlay*/}
                    { bodyLength && 
                        <Card.Footer className='text-primary text-center bg-dark border rounded-bottom border-top-0 border-light border-1' 
                        style={{marginTop: '-2.6rem', zIndex: '1'}} 
                        onClick={(e: any) => setBodyLength(undefined)}>
                            Load More
                        </Card.Footer>
                    }
                    </Card>
            </Container>
        </>
    )
}



export default Post

