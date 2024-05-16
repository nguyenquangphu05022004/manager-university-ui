import React, { useEffect, useState } from "react";
import MajorService from "../../services/MajorService";
import RegisterSubjectForMajorService from "../../services/RegisterSubjectForMajorService";
import SelectMuiComponent from "../GenericComponent/SelectMuiComponent";
import ListBoostrapComponent from "../GenericComponent/ListBoostrapComponent";
import { MenuItem } from "@mui/material";
import SubjectService from "../../services/SubjectService";
function ListSubjectRegisterOfMajorComponent() {

    const [majors, setMajors] = useState([]);
    const [registerOfMajors, setRegisterOfMajors] = useState([])
    const [schoolYears, setSchoolYears] = useState([]);
    const [courses, setCourses] = useState([])
    const [majorId, setMajorId] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [schoolYearId, setSchoolYearId] = useState('');
    const [semesterId, setSemesterId] = useState('');
    const [courseId, setCourseId]   = useState('');
    useEffect(() => {
        getMajors();
    }, [])

    const getMajors = () => {
        MajorService.getAllMajors()
            .then((res) => { setMajors(res.data) })
            .catch(err => err.status)
    }
    const getRegisterOfMajors = (e) => {
        RegisterSubjectForMajorService.getListRegisterByMajorId(e.target.value)
            .then(res => {
                const years = res.data.map((register) => {
                    return register.schoolYearDTO;
                });
                setCourses(years.map(schoolYear => {
                    return {
                        courseId: schoolYear.courseId,
                        courseCode: schoolYear.courseCode
                    }
                }))
                setSchoolYears(years);
                setRegisterOfMajors(res.data)
            })
            .catch(err => console.log(err.status))
    }

    const functionOfSelectMajor = (e) => {
        setMajorId(e.target.value)
        getRegisterOfMajors(e);
    }

    const listSelectOfMajors = majors.map(major => {
        return (
            <MenuItem
                value={major.id}
                key={major.id}
            >
                {major.name}
            </MenuItem>
        )
    })

    // if (registerOfMajors.length > 0 && schoolYears.length == 0) {
    //     setSchoolYears(registerOfMajors.map((register) => {
    //         return register.schoolYearDTO;
    //     }));
    // }

    // if (schoolYears.length > 0 && courses.length == 0) {
    //     setCourses(schoolYears.map(schoolYear => {
    //         return {
    //             courseId: schoolYear.courseId,
    //             courseCode: schoolYear.courseCode
    //         }
    //     }))
    // }

    const functionSelectOfSchoolYear = (e) => {
        const arr = e.target.value.split('_');
        setSchoolYearId(arr[0]);
        setSemesterId(arr[1]);
    }


    const listSelectOfSchoolYear = schoolYears.map((schoolYear) => {
        return schoolYear.semesters.map((semester) => {
            return (
                <MenuItem
                    value={schoolYear.id + "_" + semester.id}
                    key={schoolYear.id + "_" + semester.id}
                >
                    Năm học {schoolYear.schoolYear} {semester.semester}
                </MenuItem>
            )
        })
    })
    const listSelectOfCourse = courses.map(course => {
        return (
            <MenuItem
                value={course.courseId}
                key={course.courseId}
            >
                Khóa {course.courseCode}
            </MenuItem>
        )
    })

    const functionSelectOfCourse = (e) => {
        setCourseId(e.target.value)
    }

    const searchSubjects = () => {
        SubjectService.getAllSubjectByMajorIdAndSchoolYearIdAndCourseIdAndSemesterId(majorId, schoolYearId, courseId, semesterId)
            .then((res) => {
                setSubjects(res.data);
            }).catch(err => console.log(err.status));
    }

    const columns = ['Mã môn học', 'Tên môn học', 'Số tín chỉ']
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
            </tr>
        )
    })

    console.log(subjects)

    return (
        <div className="container">
            <br />
            <SelectMuiComponent
                isDisable={majors.length === 0}
                title="Chuyên ngành"
                function={functionOfSelectMajor}
                selects={listSelectOfMajors}
            />
            <br />
            <SelectMuiComponent
                isDisable={schoolYears.length == 0}
                title="Năm học"
                function={functionSelectOfSchoolYear}
                selects={listSelectOfSchoolYear}
            />
            <br />
            <SelectMuiComponent
                isDisable={courses.length === 0}
                title="Khóa học"
                function={functionSelectOfCourse}
                selects={listSelectOfCourse}
            />
            <br />
            <button className="btn btn-primary" onClick={() => { searchSubjects() }}>Tìm kiếm</button>
            <br />
            <ListBoostrapComponent
                title="Môn học"
                columns={columns}
                rows={rows}
            />
        </div>
    )




}

export default ListSubjectRegisterOfMajorComponent;