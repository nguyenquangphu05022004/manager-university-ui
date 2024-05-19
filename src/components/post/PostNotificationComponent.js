import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import Parse from 'html-react-parser'
import PostNotificationService from "../../services/PostNotificationService";
import Spinner from "../GenericComponent/Spinner";
var spinner = true
function PostNotificationComponent() {
    const {id} = useParams();
    const [post, setPost] = useState(null)
    const [openSpinner, setOpenSpinner] = useState(true);
    useEffect(()=> {
        PostNotificationService.getPostById(id)
        .then(res => {
            spinner = false;
            setPost(res.data)
        })
        .catch(e => {
            spinner = false;
            setPost({})
        })
    }, [])
    document.title =post != null&& post.title
    if(spinner) {
        return <Spinner/>
    }
    return (
        <div className="container" style = {{marginTop : "20px"}}>
            <h1>{post != null && post.title}</h1>
            {post != null && Parse(post.content)}
        </div>
    )
}

export default PostNotificationComponent;