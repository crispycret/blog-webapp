import { useEffect, useState } from "react"

import { AxiosError, AxiosResponse } from "axios";

import API from "./API";



export type Posts = {
    posts: Array<object>,
    getPosts: () => Promise<AxiosResponse<any, any>>,
    getPost: (id: string) => Promise<AxiosResponse<any, any>>,
    updatePost: (id: string, title:string, body:string) => Promise<AxiosResponse<any, any>>,
    deletePost: (id: string) => Promise<AxiosResponse<any, any>>,
} 
export const Posts = (props: API) => {

    const [posts, setPosts] = useState<Array<any>>([])

    const getPosts = async () => {
        
        // [NOTE] To retrieve data using the user, load user data from cookies

        let res = await props.client.get('/post/all')
        
        .catch((error: AxiosError) => {
            return Promise.reject(error);
        })

        if (res.data.status == 200) {
            setPosts(res.data.body.posts)
        }

        return res
    }


    const getPost = async (id: string) => {
        let res = await props.client.get(`post/${id}`)

        return res
    }


    const updatePost = async (id: string, title: string, body: string) => {
        let data = {
            id: Number.parseInt(id), 
            title,
            body
        }
        let res = await props.client.patch(`post/${id}/update`, data)
        return res
    }


    const deletePost = async (id: string) => {
        let res = await props.client.delete(`post/${id}/delete`)
        return res
    }

    return {
        posts,
        getPost,
        getPosts,
        updatePost,
        deletePost,
    }

}

export default Posts;