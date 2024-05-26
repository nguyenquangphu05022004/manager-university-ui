import { React, useEffect, useState } from "react";
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import Util from "../../utils/Util";
import ListMuiComponent from "../GenericComponent/ListMuiComponent";
import Spinner from "../GenericComponent/Spinner";
import MajorRegisterService from "../../services/MajorRegisterService";
import SelectMuiComponent from "../GenericComponent/SelectMuiComponent";
import Process from "../GenericComponent/Process";
function ListGradeComponent() {
    const [majorRegisters, setMajorRegisters] = useState([])
    const [processGetMajor,setProcessGetMajor] = useState(false)
    const [openSpinner, setOpenSpinner] = useState(true)
    document.title = "Xem điểm"

    useEffect(() => {
        if(Util.getProfile()) {
            MajorRegisterService.getAllByStudentIdAndCoursesId(Util.getProfile().id, Util.getProfile().courses.id)
            .then(res => {
                setOpenSpinner(false)
                setMajorRegisters(res.data);
            }).catch(err => {
                setOpenSpinner(false);
                console.log(err)
            })
        }
    }, [])

    const columsDetailGrade = [
        { id: 'attend', label: 'Chuyên cần(Trọng số)', align: 'center',minWidth: 100 },
        { id: 'practice', label: 'Kiểm tra(trọng số)', align: 'center',minWidth: 170 },
        {
            id: 'midterm',
            label: 'Giữa kỳ(trọng số)',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'final',
            label: 'Cuối kỳ(trọng số)',
            minWidth: 170,
            align: 'center',
        },
    ];

    const createDataGradeDetail = (attend, practice, midterm, final) => {
        return {attend, practice, midterm, final}
    }
    const columns = [
        { id: 'season', label: 'Mùa học', align: 'center',minWidth: 100 },
        { id: 'details', label: 'Xem chi tiết', align: 'center',minWidth: 170 },
        {
            id: 'seasonAverage',
            label: 'Trung bình mùa học',
            minWidth: 170,
            align: 'center',
        },
    ];
    const columnsSubject = [
        { id: 'name', label: 'Tên môn học', align: 'center', minWidth: 100 },
        { id: 'code', label: 'Mã môn học', align: 'center', minWidth: 170 },
        {
            id: 'credit',
            label: 'Số tín',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'averageSubject',
            label: 'Điểm trung bình',
            minWidth: 170,
            align: 'center',
        }
    ]
    const createDataSubject = (name, code, credit,averageSubject) => {
        return {name, code, credit, averageSubject}
    }
    const createDataGrade = (season, details, seasonAverage) => {
        return {season, details, seasonAverage}
    }
    const rows = majorRegisters.map((majorRegister) => {
        return (
            createDataGrade(majorRegister.seasonDTO.nameSeason, (<DialogMuiComponent
                nameAction="Các môn học"
                nameSomething={'Điểm môn học'}
                number={2}
                interface={
                    <ListMuiComponent
                        columns={columnsSubject}
                        rows={majorRegister.registerDTOS.length != 0 ? majorRegister.registerDTOS.map(register => {
                            return createDataSubject(register.subjectGroup.subject.subjectName,register.subjectGroup.subject.subjectCode,register.subjectGroup.subject.credit, (<DialogMuiComponent
                                nameAction={register.grade != null ? register.grade.subjectAverage : 'Chưa tính'}
                                nameSomething={'Điểm thành phần'}
                                number={3}
                                interface={
                                    <ListMuiComponent
                                        columns={columsDetailGrade}
                                        rows={register.grade != null && register.grade.componentGrade != null ? (
                                            [createDataGradeDetail(register.grade.attend + "(" + register.grade.componentGrade.attend + "%)", register.grade.practiceTest +"("+register.grade.componentGrade.practiceTest + "%)", register.grade.midtermTest +"("+register.grade.componentGrade.midtermTest + "%)", register.grade.finalTest +"("+register.grade.componentGrade.finalTest +"% )")]
                                        ) : []}
                                    />

                                }

                            />))
                            
                        }) : []}
                    />

                }

            />), majorRegister.seasonGradeAverage)
        )
    })
    const getAllMajorRegisterExtraOfStudent = () => {
        setMajorRegisters([])
        setProcessGetMajor(true)
        MajorRegisterService.getListExtraByStudentId(Util.getProfile().id)
            .then(res => {
                setProcessGetMajor(false)
                setMajorRegisters(res.data)
            })
            .catch((err) => {
                setProcessGetMajor(false)
                console.log(err)
            })
    }
    const getAllMajorRegisterOfStudent = () => {
        setMajorRegisters([])
        setProcessGetMajor(true)
        MajorRegisterService.getAllByStudentIdAndCoursesId(Util.getProfile().id, Util.getProfile().courses.id)
            .then(res => {
                setProcessGetMajor(false)
                setMajorRegisters(res.data)
            })
            .catch((err) => {
                setProcessGetMajor(false)
                console.log(err)
            })
    }
    const handleSelectSemester = (e) => {
        const select = e.target.value;
        if (select == 1) {
            getAllMajorRegisterOfStudent();
        } else {
            getAllMajorRegisterExtraOfStudent();
        }
    }
    if(openSpinner) {
        return <Spinner/>
    }
    return (
        <div className='container'
            style={{
                marginTop: '30px'
            }}>
            <div className="mt-3 mb-4">
                <h5 style={{color:'red'}}>Chú ý: Trong trường hợp điểm học lại/cải thiện thấp hơn điểm của học kỳ chính thì điểm của môn học đó được giữ nguyên.</h5>
            </div>
                <div className="form-group mb-3">
                    <SelectMuiComponent
                        title="Chọn học kỳ"
                        type={"SEASON_EXTRA"}
                        width={'100%'}
                        defaultValue={1}
                        function={handleSelectSemester}
                    />
                    {processGetMajor && <Process/>}
                </div>
            <div className="form-group mb-3">
            <ListMuiComponent
                title="Kết quả học tập"
                columns={columns}
                rows={rows}
            />

            </div>
        </div>
    )
}
export default ListGradeComponent;