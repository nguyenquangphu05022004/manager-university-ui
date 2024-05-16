import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CourseService from '../../services/CourseService';
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import { Link } from 'react-router-dom';
function ListCourseComponent() {
    const columns = ['Tên khóa sinh viên', 'Mã khóa sinh viên'];
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        CourseService.getAllCourse().then(res => { setCourses(res.data) })
            .catch((err) => { console.log(err.status) })
    }, [])
    
    const rows = courses.map((course) => {
        return (
            <tr key = {course.id}>
                <td>{course.name}</td>
                <td>{course.code}</td>
            </tr>
        )
    })
    return (
        <div className='container'>
        <ListBoostrapComponent
            title={'Danh sách năm học'}
            columns={columns}
            rows={rows}
        />
        <Button variant="contained" component = {Link} to = {"/admin/add-course"}>Thêm khóa học</Button>
        </div>

    )
}
export default ListCourseComponent;