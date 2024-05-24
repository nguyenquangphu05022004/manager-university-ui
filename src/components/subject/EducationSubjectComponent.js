import { React, useEffect, useState } from "react";
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import Util from "../../utils/Util";
import ListMuiComponent from "../GenericComponent/ListMuiComponent";
import Spinner from "../GenericComponent/Spinner";
import MajorRegisterService from "../../services/MajorRegisterService";
function ListGradeComponent() {
    const [majorRegisters, setMajorRegisters] = useState([])
    const [openSpinner, setOpenSpinner] = useState(true)
    document.title = "Chương trình đạo tạo"

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
    const columns = [
        { id: 'season', label: 'Mùa học', align: 'center',minWidth: 100 },
        { id: 'details', label: 'Xem chi tiết', align: 'center',minWidth: 170 }
    ];
    const createDataGrade = (season, details, seasonAverage) => {
        return {season, details, seasonAverage}
    }
    const rows = majorRegisters.map((majorRegister) => {
        const columnsSubject = [
            { id: 'subjectCode', label: 'Mã môn học', align: 'center',minWidth: 100 },
            { id: 'subjectName', label: 'Tên môn học', align: 'center',minWidth: 170 },
            { id: 'credit', label: 'Số tín chỉ', align: 'center',minWidth: 170 }

        ];
        const createDataSubject = (subjectCode, subjectName, credit) => {
            return {subjectCode, subjectName, credit}
        }
        const rowsSubject = majorRegister.subjectDTOS.length != 0 ?  majorRegister.subjectDTOS.map(subject => {
            return createDataSubject(subject.subjectCode, subject.subjectName, subject.credit)
        }) : [];
        return (
            createDataGrade(majorRegister.seasonDTO.nameSeason, (<DialogMuiComponent
                nameAction="Các môn học"
                nameSomething={'Điểm môn học'}
                number={2}
                interface={
                   <ListMuiComponent
                        columns={columnsSubject}
                        rows={rowsSubject}
                   />

                }

            />))
        )
    })
    if(openSpinner) {
        return <Spinner/>
    }
    return (
        <div className='container'
            style={{
                marginTop: '30px'
            }}>
            <ListMuiComponent
                title="Chương trình đào tạo"
                columns={columns}
                rows={rows}
            />
        </div>
    )
}
export default ListGradeComponent;