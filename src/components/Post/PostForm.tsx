import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";


import { Props } from "../../App";


export type PostForm = Props & {
    title: string,
    setTitle: (arg0: string) => void,

    body: string,
    setBody: (arg0: string) => void,
    
    handleSubmit: () => Promise<AxiosResponse<any, any>>,
    
    errorMsg: string,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    
    showError: boolean,
    setShowError: React.Dispatch<React.SetStateAction<boolean>>,
}

export const PostForm = (props: PostForm) => {

    const errorComponent = <>
        <Form.Text>
            <div className="alert alert-danger" role="alert">
                {props.errorMsg}
            </div>    
        </Form.Text>
    </>

    useEffect(() => {

    }, [])

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        props.handleSubmit();

   
    }

    
    useEffect(() => {
        console.log(props.title)
    }, [])


    return <>
        <Container className='mx-auto bg-dark text-white text-start'>


            <Form className='mt-3 mx-auto' onSubmit={e => handleSubmit(e)}>

                {props.showError && <Form.Group className='mt-2 pt-2'>{errorComponent}</Form.Group>}

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