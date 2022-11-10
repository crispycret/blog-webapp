
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, ListGroup, ListGroupItem, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap'


import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete, AiFillDelete } from 'react-icons/ai'
import { BiAddToQueue } from 'react-icons/bi'

import { Props } from "../../App";


export const PostManager = (props: Props) => {

    const paths = {
        createPost: '/dashboard/post/create' 
    }


    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedId, setSelectedId] = useState('')

    const deletePost = async () => {
        console.log(`Post Deleted ${selectedId}`)
        let res = await props.posts.deletePost(selectedId)
        .catch(err => {
            console.log(err)
        })
        props.posts.getPosts()
        handleClose()
    }

    const handleClose = () => {
        setShowDeletePopup(false)
    }

    useEffect(() => {
    })

    const deletePopupElement =
        <Modal show={showDeletePopup} onHide={handleClose} className='my-auto'>
            <ModalHeader>Delete Post</ModalHeader>
            <ModalBody>Are you sure you want to delete the post with id {selectedId}?</ModalBody>
            <ModalFooter><Button className='btn-danger' onClick={() => deletePost()}>Delete</Button></ModalFooter>
        </Modal>


    return (
        <>
            {deletePopupElement}

            <Container>
                <ListGroup horizontal>
                    <Link to={paths.createPost} style={{textDecoration: 'none'}}>
                        <ListGroupItem  className='border rounded-top'>
                            <BiAddToQueue /> New
                        </ListGroupItem>
                    </Link>
                </ListGroup>

                <ListGroup className='rounded-0'>
                    <ListGroupItem className='text-start fw-bold fs-6'>
                        <Row>
                            <Col className='col-11'>Title</Col>
                            <Col className='col-1'>
                                <Row>
                                    <Col><FaRegEdit /></Col>
                                    <Col><AiFillDelete /></Col>
                                </Row>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>

                <ListGroup className='px-0 mx-0'>

                    { props.posts.posts.length == 0 &&
                        <ListGroupItem key='empty' className='border rounded-0'>
                            No available posts
                        </ListGroupItem>
                    }

                    { props.posts.posts.map((post: any, i: number, row: any) => 
        
                        <ListGroupItem key={post.id} className='border rounded-0'>
                            <Row className='text-start'>
                                <Col className='col-11'>
                                    <Link to={`/post/${post.id}`}  style={{textDecoration:'none'}}>{post.title}</Link>
                                </Col>
                                <Col className='col-1'>
                                    <Row>
                                        <Col><Link to={`/dashboard/post/${post.id}/edit`} style={{textDecoration:'none'}}><FaRegEdit /></Link></Col>
                                        <Col><Link to='' style={{textDecoration:'none'}}><AiFillDelete className='text-danger' onClick={() => {setShowDeletePopup(true); setSelectedId(post.id)}}/></Link></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Container>
        </>
    )
}


export default PostManager;