import { React, useEffect, useState } from "react";
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import SeasonService from '../../services/SeasonService'
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import CourseService from '../../services/CourseService'
import SchoolYearService from '../../services/SchoolYearService'
import SemesterSerivce from '../../services/SemesterSerivce'
import SelectMuiComponent from "../GenericComponent/SelectMuiComponent";

function SeasonComponent() {
    const [seasons, setSeasons] = useState([])
    const [courses, setCourses] = useState([])
    const [schoolYears, setSchoolYears] = useState([])
    const [semesters, setSemesters] = useState([])

    document.title = "Quản lý mùa học"
    useEffect(() => {
        CourseService.getAllCourses()
            .then(res => setCourses(res.data)).catch(err => alert("Xảy ra lỗi khi lấy khóa học"))
        SchoolYearService.getAllSchoolYear()
            .then(res => setSchoolYears(res.data)).catch(err => alert("Xảy ra lỗi khi lấy năm học"))
        SemesterSerivce.getAllSemesters()
            .then(res => setSemesters(res.data)).catch(() => alert("Xảy ra lỗi khi lấy kỳ học"))
        SeasonService.getAllSeason()
            .then(res => {
                setSeasons(res.data);
            }).catch(err => alert("Error get infomation"))
    }, [])

    /**
     * ben duoi la thong tin tao school year, semester va season
     */

    const [coursesId, setCoursesId] = useState('')
    const [schoolYearId, setSchoolYearId] = useState('')
    const [semesterId, setSemesterId] = useState('')
    const handleSelectCourses = (e) => setCoursesId(e.target.value)
    const handleSelectSchoolYear = (e) => setSchoolYearId(e.target.value)
    const handleSelectSemester = (e) => setSemesterId(e.target.value);
    const [schoolYearName, setSchoolYearName] = useState('')
    const submitCreateSeason = () => {
        const season = {
            'semester': { 'id': semesterId },
            'schoolYear': { 'id': schoolYearId },
            'courses': { 'id': coursesId }
        }
        SeasonService.createSeason(season)
            .then(() => window.location.reload())
            .catch(() => alert('Xảy ra lỗi tạo season'))
    }
    const submitCreateSchoolYear = () => {
        const schoolYear = {
            "name": schoolYearName
        };
        SchoolYearService.createSchoolYear(schoolYear)
            .then(res => { alert("Đã tạo năm học: " + schoolYear); window.location.reload() })
            .catch(() => alert("Xảy ra lỗi khi tạo năm học"))
    }


    return (
        <div className='container'
            style={{
                marginTop: '30px'
            }}>
            <div className="mb-3">
                <DialogMuiComponent
                    nameAction="Mùa học"
                    nameSomething={
                        <button style={{ border: 'none' }}><DialogMuiComponent
                            nameAction="Tạo mùa học"
                            nameSomething={''}
                            number={5}
                            interface={
                                <div className="card-body">
                                    <div className="form-group mb-3">
                                        <SelectMuiComponent
                                            title="Chọn khóa học"
                                            type={"COURSE"}
                                            data={courses}
                                            width={'100%'}
                                            function={handleSelectCourses}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <SelectMuiComponent
                                            title="Chọn năm học"
                                            type={"SCHOOL_YEAR"}
                                            data={schoolYears}
                                            width={'100%'}
                                            function={handleSelectSchoolYear}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <SelectMuiComponent
                                            title="Chọn kỳ học"
                                            type={"SEMESTER"}
                                            data={semesters}
                                            width={'100%'}
                                            function={handleSelectSemester}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button className="btn btn-primary w-100" onClick={submitCreateSeason}>Tạo</button>
                                    </div>
                                </div>
                            }
                        /></button>
                    }
                    number={4}
                    interface={
                        <ListBoostrapComponent
                            columns={['Tên mùa học', 'Sửa']}
                            rows={seasons.length > 0 ? seasons.map(season => {
                                return (<tr>
                                    <td>{season.fullNameSeason}</td>
                                    <td><button>Sửa</button></td>
                                </tr>)
                            }) : []}
                        />
                    }
                />

            </div>
            <div className="mb-3">
                <DialogMuiComponent
                    nameAction="Năm học"
                    nameSomething={
                        <button style={{ border: 'none' }}><DialogMuiComponent
                            nameAction="Tạo năm học"
                            nameSomething={''}
                            number={6}
                            interface={
                                <div className="card-body">
                                    <div className="form-group mb-3">
                                        <label className="form-label">
                                            Năm học:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ví dụ: 2023-2024"
                                            value={schoolYearName}
                                            onChange={(e) => setSchoolYearName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button className="btn btn-primary w-100" onClick={submitCreateSchoolYear}>Tạo</button>
                                    </div>
                                </div>
                            }
                        /></button>
                    }
                    number={6}
                    interface={
                        <ListBoostrapComponent
                            columns={['Tên năm học', 'Sửa']}
                            rows={schoolYears.length > 0 ? schoolYears.map(s => {
                                return (<tr>
                                    <td>{s.name}</td>
                                    <td><button>Sửa</button></td>
                                </tr>);
                            }) : []}
                        />
                    }
                />

            </div>

        </div>
    )
}
export default SeasonComponent;