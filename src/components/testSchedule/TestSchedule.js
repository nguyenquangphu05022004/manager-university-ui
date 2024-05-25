import { React, useEffect, useState } from "react";
import SeasonService from '../../services/SeasonService'
import Util from "../../utils/Util";
import SelectMuiComponent from '../GenericComponent/SelectMuiComponent'
import TestScheduleService from "../../services/TestScheduleService";
import ListMuiComponent from "../GenericComponent/ListMuiComponent";
import Spinner from "../GenericComponent/Spinner";
import Process from "../GenericComponent/Process";
var seasonId = null
function TestSchedule() {
    const [seasons, setSeasons] = useState([])
    const [testSchedules, setTestSchedules] = useState([])
    const [openSpinner, setOpenSpinner] = useState(true)
    const [openProcess, setOpenProcess] = useState(false);
    const [openProcessSeason, setOpenProcessSeason] = useState(false)
    document.title = "Lịch thi"

    useEffect(() => {
        SeasonService.getAllByCoursesId(Util.getProfile().courses.id)
            .then(res => {
                setSeasons(res.data);
                setOpenSpinner(false)     
                if (res.data.length > 0) {
                    seasonId = res.data[0].id
                    getTestScheduleBySeasonIdAndStudentId(res.data[0].id)
                }
                   
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
                setTestSchedules(res.data)
                setOpenProcess(false);
            }).catch(err => {
                setOpenProcess(false)
                console.log(err)
            })
    }
    const getAllSeasonByCoursesId = () => {
        setSeasons([])
        setOpenProcessSeason(true)
        SeasonService.getAllByCoursesId(Util.getProfile().courses.id)
            .then(res => {
                setSeasons(res.data)
                setOpenProcessSeason(false)
                if (res.data.length > 0) {
                    seasonId = res.data[0].id
                    getTestScheduleBySeasonIdAndStudentId(res.data[0].id)
                }
            }).catch(err => {
                setOpenProcessSeason(false)
                setSeasons([])
            })
    }
    const getAllSeasonExtraByStudentId = () => {
        setSeasons([])
        SeasonService.getListSeasonExtraByStudent(Util.getProfile().id)
            .then(res => {
                setSeasons(res.data);
                setOpenProcessSeason(false)
                if (res.data.length > 0) {
                    seasonId = res.data[0].id
                    getTestScheduleBySeasonIdAndStudentId(res.data[0].id)
                }
            }).catch(err => {
                setOpenProcessSeason(false)
                setSeasons([])
            })
    }
    const handleSelectSemester = (e) => {
        const select = e.target.value;
        if (select == 1) {
            getAllSeasonByCoursesId();
        } else {
            getAllSeasonExtraByStudentId();
        }
    }
    if (openSpinner) {
        return (<Spinner />)
    }
    return (
        <div className='container'
            style={{
                marginTop: '30px'
            }}>
            <div className="form-group mb-4">
                <h3 class="text-center">Lịch thi</h3>
            </div>
            <div className='form-group mb-4'>
                <SelectMuiComponent
                    title="Chọn học kỳ"
                    type={"SEASON_EXTRA"}
                    width={'100%'}
                    defaultValue={1}
                    function={handleSelectSemester}
                />
                {openProcessSeason && <Process />}
            </div>
            <div className="form-group mb-3">
                {seasons.length > 0 ? <div>
                    <SelectMuiComponent
                        title="Chọn mùa học"
                        type={"SEASON"}
                        data={seasons}
                        width={'100%'}
                        defaultValue={seasons[0].id}
                        function={e => getTestScheduleBySeasonIdAndStudentId(e.target.value)}
                    />
                    {openProcess && <Process />}
                </div>
                    : ''}
            </div>
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