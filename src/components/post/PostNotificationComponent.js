import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import Parse from 'html-react-parser'
import PostNotificationService from "../../services/PostNotificationService";
function PostNotificationComponent() {
    const {id} = useParams();
    const [post, setPost] = useState(null)

    useEffect(()=> {
        PostNotificationService.getPostById(id)
        .then(res => setPost(res.data))
        .catch(e => console.log(e))
    }, [])
    document.title =post != null&& post.title
    return (
        <div className="container" style = {{marginTop : "20px"}}>
            <h1>{post != null && post.title}</h1>
            {post != null && Parse(post.content)}
        </div>
    )
}

export default PostNotificationComponent;