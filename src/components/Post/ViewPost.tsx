import { useParams } from 'react-router-dom'

export const ViewPost = () => {

    const {id} = useParams()

    return (<>
        Post with id {id}
    </>)
}



export default ViewPost;