import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
    document.title = "Quản trị"
    return (
        <div>
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
            <Button variant="contained" component={Link} to={"/admin/manager-subject"}>Quản lý về vấn đề môn học</Button>
            <br/>
            <br/>
            <Button variant="contained" component={Link} to={"/admin/seasons"}>Mùa học</Button>
            <br/>
            <br/>
            <Button variant="contained" component={Link} to={"/admin/aspirationRegisters"}>Nguyện vọng đăng ký môn</Button>
        </div>
    )
}
export default Admin;