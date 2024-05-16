import React, { useEffect, useState } from 'react';
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import StudentExchangeRegisterService from '../../services/StudentExchangeRegisterService';
import StudentRequestExchangeRegister from '../../services/StudentRequestExchangeRegister';
import ListRequestOfStudent from './ListRequestOfStudent';
function ListStudentExchangeRegister() {
    const [listExchangeOfStudent, setListExchangeOfStudent] = useState([])

    useEffect(() => {
        getListExchangeOfStudent()
    }, [])

    const getListExchangeOfStudent = () => {
        StudentExchangeRegisterService.getListExchangeOfStudentCurrent()
            .then((res) => {
                setListExchangeOfStudent(res.data)
            }).catch((e) => {
               alert("listRequest failed")
            })
    }
    const listTimeTable = (subject, timeTable, action) => {
        return (
            (
                <tr key={timeTable.id}>
                    <td>
                        {subject.subjectCode}
                    </td>
                    <td>{subject.subjectName}</td>
                    <td> {timeTable.startDate + " - " + timeTable.endDate}</td>
                    <td> Thứ {timeTable.dayOfWeek} {timeTable.startTime + " - " + timeTable.endTime} </td>
                    <td> {subject.credit}</td>
                    <td>{timeTable.groupDTO.code}</td>
                    <td>{timeTable.classRoomDTO.roomName + " " + timeTable.classRoomDTO.house}</td>
                    <td>{timeTable.classRoomDTO.studentQuantityCurrent + "/" + timeTable.classRoomDTO.studentQuantity}</td>
                    <td>{timeTable.teacherDTO.personDTO.fullName + " - " + timeTable.teacherDTO.personDTO.username}</td>
                    {action}
                </tr>
            )
        )
    }

    
    const handleRequestExchangeRegister = (e, action)=> {
        if(action) {
            StudentRequestExchangeRegister.addRequestExchangeRegister(e.target.value)
            .then(res => alert("success"))
            .catch(err=> alert("loi he thong"))
        } else {
            StudentRequestExchangeRegister.deleteRequestExchangeRegister(e.target.value)
            .then(res => alert("success"))
            .catch(err=> alert("loi he thong"))
        }
    }
    const columns2 = ["Mã môn học", "Tên môn học", "Ngày học", "Thời gian", "Số tín chỉ", "Nhóm", "Phòng", "Số lượng", "Giảng viên", "Trao đổi"]
    const rows2 = listExchangeOfStudent.map(exchange => {
        const timeTable = exchange.registerDTO.timeTableDTO;
        const subject = timeTable.subjectDTO;
        return listTimeTable(subject, timeTable, (
            <td>
               <ListRequestOfStudent studentExchangeRegisterId = {exchange.id}/>
            </td>
        ))
    })


    return (
        <div className='container'>
            <br />
            <ListBoostrapComponent
                title={'Danh sách môn học'}
                columns={columns2}
                rows={rows2}
            />
        </div>
    )
}
export default ListStudentExchangeRegister;