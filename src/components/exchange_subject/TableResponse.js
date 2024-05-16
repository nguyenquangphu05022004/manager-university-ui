import * as React from 'react';
import ActionService from '../../services/ActionService'
import ListMuiComponent from '../GenericComponent/ListMuiComponent';
const columns = [
    { id: 'fullName', label: 'Họ và tên', minWidth: 170 },
    { id: 'subjectCode', label: 'Mã môn học', minWidth: 100 },
    {
        id: 'subjectName',
        label: 'Tên môn học',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'credit',
        label: 'Số tín chỉ',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'group',
        label: 'Nhóm học',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'time',
        label: 'Thời gian học',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'room',
        label: 'Phòng học',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'teacher',
        label: 'Giảng viên',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'action',
        label: 'Hành động',
        minWidth: 170,
        align: 'right',
    }
];
function TableResponse(param) {
    function createData(fullName, subjectCode, subjectName, credit, group, time,room, teacher, action) {
        return { fullName, subjectCode, subjectName, credit, group, time,room,teacher, action };
    }
    const rows  = param.listRequest.map((request) => {
        return createData(
            request.studentExchangeRegisterDTO.studentDTO.personDTO.fullName,
            request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.subjectDTO.subjectCode,
            request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.subjectDTO.subjectName,
            request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.subjectDTO.credit,
            request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.groupDTO.code,
            `Thứ ${request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.dayOfWeek} ${request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.startTime + " - " + request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.endTime} từ ${request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.startDate} đến ${request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.endDate}`,
            request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.classRoomDTO.roomName + " - " + request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.classRoomDTO.house,
            request.studentExchangeRegisterDTO.registerDTO.timeTableDTO.teacherDTO.personDTO.fullName,
            <button
                value = {request.id}
                className={"btn btn-primary"}
                onClick={(e) => {
                    handleConfirm(e)
                }}
            >Xác nhận</button>
    
        )
    })
    const handleConfirm = (e) => {
        // const responseId = e.target.value;
        // const requestId = param.requestId;
        // ActionService.confirm(requestId, responseId)
        //     .then(() => {
        //         window.location.reload()
        //         alert("Đổi thành công");
        //     }).catch((err) => {
        //         console.error(err)
        // })
    
    }
    return (
       <ListMuiComponent
            columns = {columns}
            rows = {rows}
       />
    );
}

export default  TableResponse;