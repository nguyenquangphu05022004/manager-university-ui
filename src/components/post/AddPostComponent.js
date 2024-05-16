import React, { useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Link, useParams } from 'react-router-dom';
import PostNotificationService from '../../services/PostNotificationService';
import PostList from './PostList';

const AddPostComponent = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const {id} = useParams();


    const saveOrUpdatePost = () => {
        if(id) {

        } else {
            const post = {
                "title": title,
                "content": content
            }
            PostNotificationService.createPost(post)
            .then(res => window.location.reload())
            .catch(err => alert("Tạo thất bại"))
        }
    }
    return (
        <div className="container" style={{ marginTop: "30px" }}>
            <PostList/>
            <div className="form-group mb-2">
                <h2>Tiêu đề</h2>
                <input
                    type="text"
                    placeholder="Tiêu đề"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <h2>Nội dung</h2>
            <CKEditor
                editor={Editor}
                data={content}
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log(data);
                    setContent(data);
                }}
            />
            <br/>
            {id ? <button className="btn btn-success" onClick={() => saveOrUpdatePost()}>Sửa thông báo</button>
                : <button className="btn btn-success" onClick={() => saveOrUpdatePost()}>Tạo thông báo</button>}
        </div>
    )
}

export default AddPostComponent;