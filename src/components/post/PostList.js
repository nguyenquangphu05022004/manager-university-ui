// components/PostList.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostNotificationService from '../../services/PostNotificationService';
import Spinner from '../GenericComponent/Spinner';
function PostList() {
    const [posts, setPosts] = useState([])
    const [openSpinner, setOpenSpinner] = useState(true);

    useEffect(() => {
        PostNotificationService.getAllPosts()
        .then(res => {
            setOpenSpinner(false);
            setPosts(res.data)
        })
        .catch(err => {
            setOpenSpinner(false);
        })
    }, [])
    if(openSpinner) {
        return <Spinner/>
    }
  return (
    <div className='container mb-4'>
      <ul className="list-group list-group-flush" style={{ marginTop: "20px" }}>
            { posts.map((post, index) => {
                return (
                    <div key={index}>
                        <Link to={`/notifications/${post.id}`} className="none-under">
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{post.title}</div>
                                </div>
                                {index == 0  ? (<span className="badge bg-primary rounded-pill">New</span>) : ""}
                            </li>
                        </Link>
                    </div>
                )
            })}
        </ul>
    </div>
  );
}

export default PostList;
