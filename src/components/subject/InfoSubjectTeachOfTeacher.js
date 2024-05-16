import React, { useEffect, useState } from 'react';
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import TeacherService from '../../services/TeacherService';
import Util from '../../utils/Util';
import ListMuiComponent from '../GenericComponent/ListMuiComponent';
import ExportFileExcelService from '../../services/ExportFileExcelService';

const InfoSubjectTeacherOfTeacher = () => {
    const [teacher, setTeacher] = useState([]);
    useEffect(() => {
        TeacherService.findById(Util.getProfile().id)
            .then(res => setTeacher(res.data))
            .catch(err => alert("Error when get info teacher"))
    }, [])
    const columnsStudent = [
        { id: 'STT', label: 'STT', align: 'center', minWidth: 170 },
        { id: 'studentCode', label: 'Mã sinh viên', align: 'center', minWidth: 170 },
        {
            id: 'fullName',
            label: 'Họ và tên',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'birthOfDate',
            label: 'Ngày sinh',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'major',
            label: 'Chuyên ngành',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'courses',
            label: 'Khóa học',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        }
    ]

    const createDataStudent = (STT,studentCode, fullName, birthOfDate, major, courses) => {
        return {STT,studentCode, fullName, birthOfDate, major, courses}
    }

    const columns1 = [
        { id: 'STT', label: 'STT', align: 'center', minWidth: 170 },
        { id: 'subjectCode', label: 'Mã môn học', align: 'center', minWidth: 170 },
        { id: 'subjectName', label: 'Tên môn học', align: 'center', minWidth: 170 },
        {
            id: 'credit',
            label: 'Số tín chỉ',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'time',
            label: 'Thời gian',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'group',
            label: 'Nhóm',
            minWidth: 50,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'quantity',
            label: 'Số lượng',
            minWidth: 50,
            align: 'center',
        },
        {
            id: 'listStudent',
            label: 'Danh sách sinh viên',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toFixed(2),
        }
    ];


    const handleExportFileExcelStudent = (fileName, subjectGroupId) => {
        ExportFileExcelService.exportStudent(fileName, subjectGroupId);
      }


    const createDataOfColumns1 = (STT,subjectCode, subjectName, credit, time, group, quantity, listStudent) => {
        return {STT, subjectCode, subjectName, credit, time, group, quantity, listStudent }
    }
    const rows1 = teacher != null && teacher.subjectGroupDTOS != null && teacher.subjectGroupDTOS.length > 0 ? (
        teacher.subjectGroupDTOS.map((subjectGroup, index) => {
            return createDataOfColumns1(index + 1,subjectGroup.subject.subjectCode, subjectGroup.subject.subjectName,
                subjectGroup.subject.credit, (<DialogMuiComponent
                    nameAction="Xem"
                    nameSomething={'Thời gian học'}
                    number={1}
                    interface={
                        <ListBoostrapComponent
                            columns={['Thứ', 'Ngày bắt đầu', 'Ngày kết thúc', 'Thời gian']}
                            rows={subjectGroup.times.length != 0 ? subjectGroup.times.map(time => {
                                return (
                                    <tr>
                                        <td>{time.dayOfWeek}</td>
                                        <td>{time.startDate}</td>
                                        <td>{time.endDate}</td>
                                        <td>{time.startTime + " - " + time.endTime}</td>
                                    </tr>
                                )
                            }) : []}
                        />
                    }
                />), subjectGroup.groupName, subjectGroup.numberOfStudent + "/" + subjectGroup.numberOfStudentCurrent,
                (<DialogMuiComponent
                    nameAction="Xem"
                    nameSomething={'Danh sách sinh viên của nhóm: ' + subjectGroup.groupName}
                    number={2}
                    interface={
                        <div >
                            <button onClick={() => {
                                handleExportFileExcelStudent(`${subjectGroup.subject.subName}-Nhom-(${subjectGroup.groupName})`, subjectGroup.id)
                            }} className='btn btn-primary'>Tải xuống</button>
                            <ListMuiComponent
                            columns={columnsStudent}
                            rows={subjectGroup.registerDTOS.length != 0 ? subjectGroup.registerDTOS.map((register, index) => {
                                return (
                                    createDataStudent(index + 1, register.studentDTO.user.username, register.studentDTO.fullName,
                                        register.studentDTO.dateOfBirth, register.studentDTO.major.name, register.studentDTO.courses.code)
                                )
                            }) : []}
                        />
                        </div>
                    }
                />))
        })
    ) : ([]);
    return (
        <div className='container'
            style={{
                marginTop: '50px'
            }}>
            <div className="form-group mb-3">
                <ListMuiComponent
                    title="Danh sách môn giảng dạy"
                    columns={columns1}
                    rows={rows1}
                />
            </div>
        </div>

    )
}
export default InfoSubjectTeacherOfTeacher