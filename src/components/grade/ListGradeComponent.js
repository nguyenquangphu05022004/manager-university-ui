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
    document.title = "Xem điểm"

    useEffect(() => {
        if(Util.getProfile()) {
            MajorRegisterService.getAllByStudentId(Util.getProfile().id)
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
        { id: 'details', label: 'Xem chi tiết', align: 'center',minWidth: 170 },
        {
            id: 'seasonAverage',
            label: 'Trung bình mùa học',
            minWidth: 170,
            align: 'center',
        },
    ];
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
                    <ListBoostrapComponent
                        columns={['Tên môn', 'Mã môn', 'Số tín', "Điểm trung bình môn"]}
                        rows={majorRegister.registerDTOS.length != 0 ? majorRegister.registerDTOS.map(register => {
                            return (
                                <tr>
                                    <td>{register.subjectGroup.subject.subjectName}</td>
                                    <td>{register.subjectGroup.subject.subjectCode}</td>
                                    <td>{register.subjectGroup.subject.credit}</td>
                                    <td>
                                        <DialogMuiComponent
                                            nameAction={register.grade != null ? register.grade.subjectAverage : 'Chưa tính'}
                                            nameSomething={'Điểm thành phần'}
                                            number={3}
                                            interface={
                                                <ListBoostrapComponent
                                                    columns={['Chuyên cần(Trọng số)', 'Kiểm tra(trọng số)', 'Giữa kỳ(trọng số)', "Cuối kỳ(trọng số)"]}
                                                    rows={register.grade != null && register.grade.componentGrade != null ? (
                                                        [<tr><td>{register.grade.attend + "(" + register.grade.componentGrade.attend + "%)"}</td><td>{register.grade.practiceTest +"("+register.grade.componentGrade.practiceTest + "%)"}</td><td>{register.grade.midtermTest +"("+register.grade.componentGrade.midtermTest + "%)"}</td><td>{register.grade.finalTest +"("+register.grade.componentGrade.finalTest +"% )"}</td></tr>]
                                                    ) : []}
                                                />

                                            }

                                        />
                                    </td>
                                </tr>
                            )
                        }) : []}
                    />

                }

            />), majorRegister.seasonGradeAverage)
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
                title="Kết quả học tập"
                columns={columns}
                rows={rows}
            />
        </div>
    )
}
export default ListGradeComponent;