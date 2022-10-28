import { Container, Form, Button } from "react-bootstrap";


// type Props = {
//     children?: JSX.Element;
// }

// export const PostForm = ({children}: Props)  => {
//     return <> {children} </> 
// }



//  Make a Form version and a Preview version using tags
// Don't do this here do it where the PostForm component is being used.


export const PostForm = ()  => {

    return <>
        <Container className='mx-auto bg-dark text-white text-start'>

            <Form className='mt-3 mx-auto'>
                <Form.Group className="mb-3" controlId="postForm.Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Group>
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Don't be afraid to use this as a development tool for you!
                    </Form.Text>
                    <Form.Control type="textarea" placeholder="Start at your post with a clear intent of what this post is about." />
                </Form.Group>


                <Form.Group className="mb-3" controlId="postForm.Tags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control type="Tags" placeholder="Find Form Tag Module" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="postForm.Body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={20} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="make private" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    </> 

}


/*
    JSXElement of a Post Creation Form.
*/
const Title = (props: any) => <>

</>



PostForm.Title = Title



export default PostForm;