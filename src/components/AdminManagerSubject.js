import { React, useEffect, useState } from "react";
import ListBoostrapComponent from './GenericComponent/ListBoostrapComponent';
import SeasonService from '../services/SeasonService'
import DialogMuiComponent from './GenericComponent/DialogMuiComponent'
import ListMuiComponent from "./GenericComponent/ListMuiComponent";
import TestType from "../constant/TestType";
import SelectMuiComponent from "./GenericComponent/SelectMuiComponent";
import RoomClassService from "../services/RoomClassService";
import TestScheDuleService from '../services/TestScheduleService'
import MajorRegisterService from "../services/MajorRegisterService";
function AdminManagerSubject() {
    const [seasons, setSeasons] = useState([])
    const [perMoneyCredit, setPerMoneyCredit] = useState('')
    const [roomClasses, setRoomClasses] = useState([])

    const [roomClassId, setRoomClassId] = useState('')
    const [testType, setTestType] = useState(TestType.ESSAY)
    const [testGroup, setTestGroup] = useState('')
    const [numberOfStudent, setNumberOfStudent] = useState('')
    const [startDate, setStartDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    document.title = "Đăng ký lịch thi"
    useEffect(() => {
        RoomClassService.getAllRoomClass()
            .then(res => setRoomClasses(res.data))
            .catch(err => console.log(err))
        SeasonService.getAllSeason()
            .then(res => {
                setSeasons(res.data);
            }).catch(err => alert("Error get infomation"))
    }, [])
    const handleSelectRoomClass = (roomId) => {
        setRoomClassId(roomId)
    }
    const columns = [
        { id: 'season', label: 'Mùa học', align: 'center', minWidth: 100 },
        { id: 'details', label: 'Xem chi tiết', align: 'center', minWidth: 170 },

    ];

    const createTestSchedule = (seasonId, subjectId) => {
        const testSchedule = {
            "startTime": startTime,
            "startDate": startDate,
            "numberOfStudent": numberOfStudent,
            "testGroup": testGroup,
            'endTime': endTime,
            "examRequest": {
                "seasonId": seasonId,
                "classRoomId": roomClassId,
                "subjectId": subjectId,
                "testType": testType
            }
        }
        TestScheDuleService.createTestSchedule(testSchedule)
            .then(() => {
                alert("Đã tạo nhóm thi: " + testGroup)
            }).catch((err) => {
                console.log(err)
                alert("Xảy ra lỗi thi tạo lịch thi")
            })
    }
    const createDataSeason = (season, details) => {
        return { season, details }
    }

    const handleOpenRegister = (majorRegisterId, openRegister) => {
        MajorRegisterService.handleOpenRegister(majorRegisterId, openRegister)
            .then(() => {
                if (openRegister) alert("Đã bật")
                else alert("Đã đóng")
            })
            .catch(() => alert("Xảy ra lỗi!"))
    }

    const rows = seasons.map((season) => {
        return (
            createDataSeason(season.fullNameSeason, (<DialogMuiComponent
                nameAction="Xem chi tiết"
                nameSomething={season.fullNameSeason}
                number={2}
                interface={
                    <ListBoostrapComponent
                        columns={['Chuyên ngành', 'Các môn học', 'Tổng số tín', 'Mở đăng ký', 'Đóng đăng ký']}
                        rows={season.majorRegisterDTOS.length != 0 ? season.majorRegisterDTOS.map(majorRegister => {
                            return (
                                <tr>
                                    <td>{majorRegister.majorDTO != null ? majorRegister.majorDTO.name : ''}</td>
                                    <td>
                                        <DialogMuiComponent
                                            nameAction="Xem chi tiết"
                                            nameSomething={season.fullNameSeason + " ngành " + majorRegister.majorDTO.name}
                                            number={3}
                                            interface={
                                                <ListBoostrapComponent
                                                    columns={['Mã', 'Tên', 'Số tín', "Lịch thi"]}
                                                    rows={majorRegister.subjectDTOS != null && majorRegister.subjectDTOS.length != 0 ? majorRegister.subjectDTOS.map(subject => {
                                                        return (
                                                            <tr>
                                                                <td>{subject.subjectCode}</td>
                                                                <td>{subject.subjectName}</td>
                                                                <td>{subject.credit}</td>
                                                                <td><DialogMuiComponent
                                                                    nameAction="Lịch thi"
                                                                    nameSomething={subject.subjectName}
                                                                    number={4}
                                                                    interface={
                                                                        <div>
                                                                            <button style={{ border: 'none', marginBottom: '15px', padding: '0 0' }}>
                                                                                <DialogMuiComponent
                                                                                    nameAction="Tạo lịch thi"
                                                                                    number={5}
                                                                                    interface={
                                                                                        <div className="row">
                                                                                            <div className="col-6">
                                                                                                <div className="card-body">
                                                                                                    <div className="form-group mb-2">
                                                                                                        <label className="form-label">
                                                                                                            Mùa học:
                                                                                                        </label>
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            placeholder="Phòng thi"
                                                                                                            className="form-control"
                                                                                                            disabled
                                                                                                            value={season.nameSeason}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="form-group mb-2">
                                                                                                        <label className="form-label">
                                                                                                            Môn học:
                                                                                                        </label>
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            placeholder="Phòng thi"
                                                                                                            className="form-control"
                                                                                                            disabled
                                                                                                            value={subject.subjectName}
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
                                                                                                        <label className="form-label">
                                                                                                            Nhóm thi:
                                                                                                        </label>
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            placeholder="Nhóm thi"
                                                                                                            className="form-control"
                                                                                                            value={testGroup}
                                                                                                            onChange={(e) => setTestGroup(e.target.value)}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="form-group mb-2">
                                                                                                        <label className="form-label">
                                                                                                            Số lượng sinh viên:
                                                                                                        </label>
                                                                                                        <input
                                                                                                            type="number"
                                                                                                            placeholder="Số lượng sinh viên"
                                                                                                            className="form-control"
                                                                                                            value={numberOfStudent}
                                                                                                            onChange={(e) => setNumberOfStudent(e.target.value)}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                                <div className="card-body">
                                                                                                    <div className="form-group mb-2">
                                                                                                        <label className="form-label">
                                                                                                            Ngày thi:
                                                                                                        </label>
                                                                                                        <input
                                                                                                            type="date"
                                                                                                            placeholder="Ngày thi"
                                                                                                            className="form-control"
                                                                                                            value={startDate}
                                                                                                            onChange={(e) => setStartDate(e.target.value)}
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
                                                                                                            Hình thức thi:
                                                                                                        </label>
                                                                                                        <select value={testType} onChange={(e) => setTestType(e.target.value)}>
                                                                                                            <option value={TestType.ESSAY} checked>{"Tự luận"}</option>
                                                                                                            <option value={TestType.QUIZ}>{"Trắc nghiệm"}</option>

                                                                                                        </select>

                                                                                                    </div>
                                                                                                    <div className="form-group mb-3">
                                                                                                        <button className="btn btn-primary w-100">Xem các lịnh thi đã tạo</button>

                                                                                                    </div>
                                                                                                    <div className="form-group">
                                                                                                        <button className="btn btn-primary w-100" onClick={() => createTestSchedule(season.id, subject.id)}>Tạo lịch thi</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                />
                                                                            </button>
                                                                            <ListBoostrapComponent
                                                                                columns={['Phòng thi', 'Ngày thi', 'Thời gian', "Hình thức thi"]}
                                                                                rows={majorRegister.subjectDTOS != null && majorRegister.subjectDTOS.length != 0 ? majorRegister.subjectDTOS.map(subject => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>{subject.subjectCode}</td>
                                                                                            <td>{subject.subjectName}</td>
                                                                                            <td>{subject.credit}</td>
                                                                                            <td></td>
                                                                                        </tr>
                                                                                    )
                                                                                }) : []}
                                                                            />
                                                                        </div>

                                                                    }

                                                                /></td>
                                                            </tr>
                                                        )
                                                    }) : []}
                                                />

                                            }

                                        />
                                    </td>
                                    <td>{majorRegister.totalCreditOfMajor}</td>
                                    <td><button className="btn btn-primary" onClick={() => handleOpenRegister(majorRegister.id, true)}>Mở đăng ký</button>{majorRegister.openRegister === true ? '(Đang mở)' : '(Đã đóng)'}</td>
                                    <td><button className="btn btn-primary" onClick={() => handleOpenRegister(majorRegister.id, false)}>Đóng đăng ký</button>{majorRegister.openRegister === false ? '(Đã đóng)' : '(Đang mở)'}</td>

                                </tr>
                            )
                        }) : []}
                    />

                }

            />))
        )
    })
    return (
        <div className='container'
            style={{
                marginTop: '30px'
            }}>
            <ListMuiComponent
                title="Đăng ký lịch thi"
                columns={columns}
                rows={rows}
            />
        </div>
    )
}
export default AdminManagerSubject;