import { React, useEffect, useState } from "react";
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import ListMuiComponent from "../GenericComponent/ListMuiComponent";
import AspirationRegisterService from "../../services/AspirationRegisterService";
import AspirationOfStudentService from "../../services/AspirationOfStudentService";
function ListAspirationRegisterComponent() {
    const [aspirationRegisters, setAspirationRegisters] = useState([])

    useEffect(() => {
        AspirationRegisterService.getListAspirationRegisters()
        .then(res => {
            setAspirationRegisters(res.data);
        }).catch(err => console.log(err))
    }, [])
    const columns = [
        { id: 'season', label: 'Mùa học', align: 'center', minWidth: 100 },
        { id: 'listSubject', label: 'Danh sách môn học', align: 'center', minWidth: 170 },

    ];
    const createDateAspirationRegister = (season, listSubject) => {
        return { season, listSubject }
    }
    const handleApprovalSubject = (subjectId, aspirationRegisterId) => {
        AspirationOfStudentService.approvalAspirationBySubjectIdAndAspirationRegisterId(
            subjectId,
            aspirationRegisterId
        ).then(() => {
            alert("Đã chấp thuận")
            window.location.reload();
        }).catch(err => alert("Xảy ra lỗi trong quá trình update"))
    }
    const rows = aspirationRegisters.map((aspirationRegister) => {
        return (
            createDateAspirationRegister(aspirationRegister.season.fullNameSeason, (<DialogMuiComponent
                nameAction="Xem chi tiết"
                nameSomething={'Môn học'}
                number={2}
                interface={
                    <ListBoostrapComponent
                        columns={['Mã môn học', 'Tên môn học', 'Số tín', "Chấp thuận", "Xóa"]}
                        rows={aspirationRegister.subjectApprovals.length != 0 ? aspirationRegister.subjectApprovals.map(subjectApproval => {
                            return (
                                <tr>
                                    <td>{subjectApproval.subject.subjectCode}</td>
                                    <td>
                                        {subjectApproval.subject.subjectName}
                                    </td>
                                    <td>{subjectApproval.subject.credit}</td>
                                    <td>
                                       {subjectApproval.approval ? 'Đã chấp thuận' : <button onClick={() => handleApprovalSubject(subjectApproval.subject.id, aspirationRegister.id)} className="btn btn-primary">Chấp thuận</button>}
                                    </td>
                                    <td><button className="btn btn-primary">Xóa</button></td>
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
                title="Học phí"
                columns={columns}
                rows={rows}
            />
        </div>
    )
}
export default ListAspirationRegisterComponent;