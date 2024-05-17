import { React, useEffect, useState } from "react";
import SeasonService from '../../services/SeasonService'
import Util from "../../utils/Util";
import SelectMuiComponent from '../GenericComponent/SelectMuiComponent'
import TestScheduleService from "../../services/TestScheduleService";
import ListMuiComponent from "../GenericComponent/ListMuiComponent";
import Spinner from "../GenericComponent/Spinner";
import Process from "../GenericComponent/Process";

function TestSchedule() {
    const [seasons, setSeasons] = useState([])
    const [testSchedules, setTestSchedules] = useState([])
    const [seasonId, setSeasonId] = useState('');
    const [openSpinner, setOpenSpinner] = useState(true)
    const [openProcess, setOpenProcess] = useState(false);
    document.title = "Lịch thi"

    useEffect(() => {
        SeasonService.getAllByCoursesId(Util.getProfile().courses.id)
            .then(res => {
                if (res.data.length > 0) {
                    getTestScheduleBySeasonIdAndStudentId(res.data[0].id)
                }
                setOpenSpinner(false)
                setSeasonId(res.data[0].id)
                setSeasons(res.data);
            }).catch(err => {
                setOpenSpinner(false)
            })
    }, [])
    const columns = [
        { id: 'roomNumber', label: 'Nhóm thi', align: 'center', minWidth: 100 },
        { id: 'name', label: 'Phòng thi', align: 'center', minWidth: 170 },
        {
            id: 'numberOfStudent',
            label: 'Số lượng sinh viên',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'subject',
            label: 'Môn học',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'date',
            label: 'Ngày thi',
            minWidth: 150,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'startTime',
            label: 'Bắt đầu',
            minWidth: 100,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'endTime',
            label: 'Kết thúc',
            minWidth: 100,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'type',
            label: 'Hình thức',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
    ];
    const createDateTestSchedule = (roomNumber, name, numberOfStudent, subject, date, startTime, endTime, type) => {
        return { roomNumber, name, numberOfStudent, subject, date, startTime, endTime, type }
    }
    const rows = testSchedules.map((testSchedule) => {
        return (
            createDateTestSchedule(testSchedule.roomNumber, testSchedule.roomClass.name, testSchedule.numberOfStudent,
                testSchedule.subject.subjectName, testSchedule.startDate, testSchedule.startTime,
                testSchedule.endTime, testSchedule.testType === "QUIZ" ? "Trắc nghiệm" : "Tự luận")
        )
    })

    const getTestScheduleBySeasonIdAndStudentId = (seasonId) => {
        setOpenProcess(true);
        TestScheduleService.getListBySeasonIdAndStudentId(seasonId, Util.getProfile().id)
            .then(res => {
                setOpenProcess(false);
                setTestSchedules(res.data)
            }).catch(err => {
                setOpenProcess(false)
                console.log(err)
            })
    }
    if (openSpinner) {
        return (<Spinner />)
    }
    return (
        <div className='container'
            style={{
                marginTop: '30px'
            }}>
            <div className="form-group mb-3">
                <h3 class="text-center">Lịch thi</h3>
            </div>
            {seasonId && (
                <div className="form-group mb-3">
                    <SelectMuiComponent
                        title="Chọn môn học"
                        type={"SEASON"}
                        data={seasons}
                        width={'100%'}
                        defaultValue={seasonId}
                        function={(e) => { getTestScheduleBySeasonIdAndStudentId(e.target.value) }}
                    />
                    {openProcess && <Process/>}
                </div>
            )}
            <div className="form-group mb-3">
                <ListMuiComponent
                    columns={columns}
                    rows={rows}
                />
            </div>
        </div>
    )
}
export default TestSchedule;