import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubjectService from '../../services/SubjectService'
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import AddSubjectGroupComponent from './AddSubjectGroupComponent';
import RoomClassService from '../../services/RoomClassService';
import SelectMuiComponent from '../GenericComponent/SelectMuiComponent';
import TimeService from '../../services/TimeService';
import SubjectGroupService from '../../services/SubjectGroupService';
const ListSubjectComponent = () => {
    const [subjects, setSubjects] = useState([]);
    const [check, setCheck] = useState(true);
    const [ids, setIds] = useState([]);
    const [roomClasses, setRoomClasses] = useState([])
    const [roomClassId, setRoomClassId] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [numberOfDay, setNumberOfDay] = useState('')
    const [teacherCode, setTeacherCode] = useState('')
    useEffect(() => {
        RoomClassService.getAllRoomClass()
            .then(res => setRoomClasses(res.data))
            .catch(err => console.log(err))
        getAllSubjects();
    }, [])

    const handleSelectRoomClass = (roomId) => {
        setRoomClassId(roomId)
    }
    console.log(subjects)

    const getAllSubjects = () => {
        SubjectService.getAllSubjects().then((res) => {
            setSubjects(res.data);
        }).catch(error => console.log(error))
    }
    const handleDelete = (ids) => {
        SubjectService.deleteSubject(ids).then(() => {
            getAllSubjects();
        }).catch(error => console.error(error))
    }

    const checkIds = (ids) => {
        if (ids.length === 0) {
            setCheck(true);
        }
        else {
            setCheck(false);
        }
    }
    const columns = [
        'Mã môn học', 'Tên môn học', 'Số tín chỉ',
        'Nhóm', 'Cập nhật',
        (
            <button
                className='btn btn-info'
                onClick={() => {
                    handleDelete(ids);
                    setCheck(true);
                    setIds([])
                }}
                disabled={check}
            >Xóa
            </button>
        )
    ]

    const updateTeacherForTeachSubject = (subjectGroupId) => {
        SubjectGroupService.updateTeacher(subjectGroupId, teacherCode)
        .then(() => {
            alert("Đã cập nhật vào database")
        }) .catch(() => {
            alert("Xảy ra lỗi, Mã giảng viên không hợp lệ")
        })
    }

    const handleCreateTimeForSubjectGroup = (subjectGroupId) => {
        const dataRequest = {
            "dayOfWeek": numberOfDay,
            "startTime": startTime,
            "endTime": endTime,
            "startDate": startDate,
            "endDate": endDate,
            "subjectGroupDTO": {
                "id": subjectGroupId
            },
            "roomClass": {
                "id": roomClassId
            }
        }
        TimeService.createTime(dataRequest)
            .then(() => alert('Time saved to database'))
            .catch(err => console.log(err))

    }
    const rows = subjects.map(subject => {
        return (
            <tr key={subject.id}>
                <td>
                    {subject.subjectCode}
                </td>
                <td>
                    {subject.subjectName}
                </td>
                <td>
                    {subject.credit}
                </td>
                <td>
                    <DialogMuiComponent nameAction="Nhóm học"
                        nameSomething={subject.subjectName}
                        number={1}
                        interface={
                            <ListBoostrapComponent
                                actionAdd={
                                    <button style={{ border: 'none', marginBottom: '15px', padding: '0 0' }}>
                                        <DialogMuiComponent
                                            nameAction="Thêm nhóm"
                                            number={2}
                                            nameSomething={"Thêm nhóm học:"}
                                            interface={<AddSubjectGroupComponent subjectName={subject.subjectName} subjectId={subject.id} />}
                                        /></button>
                                }
                                columns={['Nhóm', 'Giảng viên', 'Số sinh viên', 'Thời gian']}
                                rows={subject.subjectGroupDTOS.map(subjectGroup => {
                                    return (
                                        <tr key={subjectGroup.id}>
                                            <td>{subjectGroup.groupName}</td>
                                            <td>{subjectGroup.teacher != null ? subjectGroup.teacher.fullName :
                                                <button style={{border:'none'}}>
                                                    <DialogMuiComponent
                                                        nameAction="Cập nhật giảng viên"
                                                        nameSomething={'Thời gian học'}
                                                        number={3}
                                                        interface={<div className="card-body">
                                                        <div className="form-group mb-3">
                                                            <label className="form-label">
                                                                Mã giảng viên:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="Mã giảng viên"
                                                                className="form-control"
                                                                value={teacherCode}
                                                                onChange={(e) => setTeacherCode(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <button className='btn btn-primary w-100' onClick={() => updateTeacherForTeachSubject(subjectGroup.id)}>Gửi</button>
                                                        </div>
                                                        </div>}
                                                        />

                                                </button>}</td>
                                            <td>{subjectGroup.numberOfStudent}</td>
                                            <td>
                                                <DialogMuiComponent
                                                    nameAction="Xem"
                                                    nameSomething={'Thời gian học'}
                                                    number={2}
                                                    interface={
                                                        <ListBoostrapComponent
                                                            button={
                                                                <button style={{ border: 'none', marginBottom: '15px', padding: '0 0' }}>
                                                                    <DialogMuiComponent
                                                                        nameAction="Thêm/Sửa thời gian"
                                                                        nameSomething={'Thêm/Sửa thời gian'}
                                                                        number={3}
                                                                        interface={
                                                                            <div className="card-body">
                                                                                <input
                                                                                    type="hidden"
                                                                                    placeholder="Mã môn học"
                                                                                    className="form-control"
                                                                                    disabled
                                                                                    value={subjectGroup.id}
                                                                                />
                                                                                <div className="form-group mb-2">
                                                                                    <label className="form-label">
                                                                                        Nhóm - Môn học:
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        placeholder="Mã môn học"
                                                                                        className="form-control"
                                                                                        disabled
                                                                                        value={'Môn học: ' + subject.subjectName + " nhóm: " + subjectGroup.groupName}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group mb-2">
                                                                                    <label className="form-label">
                                                                                        Ngày bắt đầu:
                                                                                    </label>
                                                                                    <input
                                                                                        type="date"
                                                                                        placeholder="Mã môn học"
                                                                                        className="form-control"
                                                                                        value={startDate}
                                                                                        onChange={(e) => setStartDate(e.target.value)}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group mb-2">
                                                                                    <label className="form-label">
                                                                                        Ngày kết thúc:
                                                                                    </label>
                                                                                    <input
                                                                                        type="date"
                                                                                        placeholder="Mã môn học"
                                                                                        className="form-control"
                                                                                        value={endDate}
                                                                                        onChange={(e) => setEndDate(e.target.value)}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group mb-2">
                                                                                    <label className="form-label">
                                                                                        Thời gian bắt đầu:
                                                                                    </label>
                                                                                    <input
                                                                                        type="time"
                                                                                        placeholder="Mã môn học"
                                                                                        className="form-control"
                                                                                        value={startTime}
                                                                                        onChange={(e) => setStartTime(e.target.value)}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group mb-2">
                                                                                    <label className="form-label">
                                                                                        Thời gian kết thúc:
                                                                                    </label>
                                                                                    <input
                                                                                        type="time"
                                                                                        placeholder="Mã môn học"
                                                                                        className="form-control"
                                                                                        value={endTime}
                                                                                        onChange={(e) => setEndTime(e.target.value)}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group mb-2">
                                                                                    <label className="form-label">
                                                                                        Thứ mấy trong tuần:
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        placeholder="Thứ trong tuần(Chú ý Chủ nhật mặc định là 0, thứ 2 là 1, thứ 3 là 2 cứ như vậy đến Thứ 7)"
                                                                                        className="form-control"
                                                                                        value={numberOfDay}
                                                                                        onChange={(e) => setNumberOfDay(e.target.value)}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group mb-2">
                                                                                    <SelectMuiComponent
                                                                                        title="Chọn phòng học"
                                                                                        type={"ROOM_CLASS"}
                                                                                        data={roomClasses}
                                                                                        width={'100%'}
                                                                                        function={(e) => handleSelectRoomClass(e.target.value)}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group mb-2">
                                                                                    <button className='btn btn-primary w-100 mt-4' onClick={() => handleCreateTimeForSubjectGroup(subjectGroup.id)}> Tạo</button>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                    />
                                                                </button>
                                                            }
                                                            columns={['Thứ', 'Ngày bắt đầu', 'Ngày kết thúc', 'Thời gian', "Phòng học"]}
                                                            rows={subjectGroup.times.length != 0 ? subjectGroup.times.map(time => {
                                                                return (
                                                                    <tr>
                                                                        <td>{time.dayOfWeek + 1}</td>
                                                                        <td>{time.startDate}</td>
                                                                        <td>{time.endDate}</td>
                                                                        <td>{time.startTime + " - " + time.endTime}</td>
                                                                        <td>{time.roomClass != null && time.roomClass.name}</td>
                                                                    </tr>
                                                                )
                                                            }) : []}
                                                        />
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                            />
                        }
                    />
                </td>
                <td>
                    <Link className='btn btn-info' to={`/edit-subject/${subject.id}`}>Cập nhật</Link>
                </td>
                <td>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type={"checkbox"}
                            value={subject.id}
                            onChange={(e) => {
                                if (ids.includes(Number(e.target.value))) {
                                    for (let i = 0; i < ids.length; i++) {
                                        if (ids[i] === Number(e.target.value)) {
                                            ids.splice(i, 1);
                                            break;
                                        }
                                    }
                                } else {
                                    ids.push(Number(e.target.value));
                                }
                                setIds(ids);
                                checkIds(ids);
                            }}

                        />
                    </div>
                </td>
            </tr>
        )
    })
    return (
        <div className='container'>
            <ListBoostrapComponent
                title={'Danh sách môn học'}
                rows={rows}
                columns={columns}
            />
            <Link to={"/add-subject"} className="btn btn-primary mb-2">Thêm môn học</Link>
        </div>

    )
}
export default ListSubjectComponent