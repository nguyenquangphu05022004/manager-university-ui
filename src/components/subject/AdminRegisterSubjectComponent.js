import { React, useEffect, useState } from "react";
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import SeasonService from '../../services/SeasonService'
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import ListMuiComponent from "../GenericComponent/ListMuiComponent";
import TestType from "../../constant/TestType";
import SelectMuiComponent from "../GenericComponent/SelectMuiComponent";
import RoomClassService from "../../services/RoomClassService";
import TestScheDuleService from '../../services/TestScheduleService'
function AdminRegisterSubjectComponent() {
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

    document.title = "Đăng ký môn học"
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

    const rows = seasons.map((season) => {
        return (
            createDataSeason(season.fullNameSeason, (<DialogMuiComponent
                nameAction="Xem chi tiết"
                nameSomething={season.fullNameSeason}
                number={2}
                interface={
                    <ListBoostrapComponent
                        columns={['Chuyên ngành', 'Các môn học', 'Tổng số tín', 'Mở đăng ký']}
                        rows={season.majorRegisterDTOS.length != 0 ? season.majorRegisterDTOS.map(majorRegister => {
                            return (
                                <tr>
                                    <td>{majorRegister.majorDTO != null ? majorRegister.majorDTO.name : ''}</td>
                                    <td>
                                        <DialogMuiComponent
                                            nameAction="Xem chi tiết"
                                            nameSomething={'Môn học'}
                                            number={3}
                                            interface={
                                                <ListBoostrapComponent
                                                    columns={['Mã', 'Tên', 'Số tín']}
                                                    rows={majorRegister.subjectDTOS != null && majorRegister.subjectDTOS.length != 0 ? majorRegister.subjectDTOS.map(subject => {
                                                        return (
                                                            <tr>
                                                                <td>{subject.subjectCode}</td>
                                                                <td>{subject.subjectName}</td>
                                                                <td>{subject.credit}</td>
                                                            </tr>
                                                        )
                                                    }) : []}
                                                />

                                            }

                                        />
                                    </td>
                                    <td>{majorRegister.totalCreditOfMajor}</td>

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
export default AdminRegisterSubjectComponent;