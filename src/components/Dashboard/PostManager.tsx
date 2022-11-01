
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, ListGroup, ListGroupItem, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap'


import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete, AiFillDelete } from 'react-icons/ai'

import { Props } from "../../App";


export const PostManager = (props: Props) => {


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
                <ListGroup>
                { props.posts.posts.map((post: any) =>
                    <ListGroupItem key={post.id}>
                        <Row className='text-start'>
                            <Col className='col-11'>{post.title}</Col>
                            <Col className='col-1'>
                                <Row>
                                    <Col><Link to={`/dashboard/post/${post.id}/edit`} style={{textDecoration:'none'}}><FaRegEdit /></Link></Col>
                                    {/* <Col><Link to={`/post/${post.id}/delete`} style={{textDecoration:'none'}} className='text-danger'><AiFillDelete/></Link></Col> */}
                                    <Col>
                                        <AiFillDelete className='text-danger' onClick={() => {setShowDeletePopup(true); setSelectedId(post.id)}}/>
                                    </Col>
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