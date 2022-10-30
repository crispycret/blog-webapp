import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { Container, Card } from 'react-bootstrap'

import { Props } from "../App";
import PostList from "../components/Post/PostList";


export const Home = (props: Props) => {

    return (
        <>

            <div className='mb-3'></div>

            <PostList {...props} />

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
