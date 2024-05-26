import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
    document.title = "Quản trị"
    return (
        <div>
            <br/>
            <Button variant="contained" component={Link} to={"/admin/courses"}>Năm học</Button>
            <br />
            <br />
            <Button variant="contained" component={Link} to={"/admin/subject/major"}>Đăng ký môn học cho chuyên ngành theo năm học</Button>
            <br />
            <br />
            <Button variant="contained" component={Link} to={"/admin/majors"}>Chuyên ngành</Button>
            <br />
            <br />
            <Button variant="contained" component={Link} to={"/admin/students"}>Sinh viên</Button>
            <br />
            <br />
            <Button variant="contained" component={Link} to={"/admin/subjects"}>Môn học</Button>
            <br />
            <br />
            <Button variant="contained" component={Link} to={"/admin/grades"}>Điểm của sinh viên</Button>
            <br/>
            <br/>
            <Button variant="contained" component={Link} to={"/admin/tuition"}>Học phí</Button>
            <br/>
            <br/>
            <Button variant="contained" component={Link} to={"/admin/notification"}>Thông báo</Button>
            <br/>
            <br/>
            <Button variant="contained" component={Link} to={"/admin/events"}>Sự kiện</Button>
            <br/>
            <br/>
            <Button variant="contained" component={Link} to={"/admin/test-schedule"}>Lịch thi</Button>
            
        </div>
    )
}
export default Admin;