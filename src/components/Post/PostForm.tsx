import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Props } from "../../App";


// type Props = {
//     children?: JSX.Element;
// }

// export const PostForm = ({children}: Props)  => {
//     return <> {children} </> 
// }



//  Make a Form version and a Preview version using tags
// Don't do this here do it where the PostForm component is being used.

type PostForm = Props & {
    title: string,
    setTitle: (arg0: string) => void,
    body: string,
    setBody: (arg0: string) => void,
}

export const PostForm = (props: PostForm) => {

    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Login Failed")
    const errorComponent = <>
        <Form.Text>
            <div className="alert alert-danger" role="alert">
                {errorMsg}
            </div>    
        </Form.Text>
    </>

    useEffect(() => {

    }, [])

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        let data = {
            title: props.title,
            body: props.body
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



    return <>
        <Container className='mx-auto bg-dark text-white text-start'>


            <Form className='mt-3 mx-auto' onSubmit={e => handleSubmit(e)}>

                {showError && <Form.Group className='mt-2 pt-2'>{errorComponent}</Form.Group>}

                <Form.Group className="mb-3" controlId="postForm.Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Group>
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Don't be afraid to use this as a development tool for you!
                    </Form.Text>
                    <Form.Control type="textarea" value={props.title} 
                        onChange={e => props.setTitle(e.target.value)} 
                        placeholder="Start at your post with a clear intent of what this post is about." 
                    />
                </Form.Group>


                <Form.Group className="mb-3" controlId="postForm.Tags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control type="Tags" placeholder="Find Form Tag Module" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="postForm.Body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={15} 
                        value={props.body} onChange={e => props.setBody(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="make private" />
                </Form.Group>

                <Button variant="primary" type="submit" >
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