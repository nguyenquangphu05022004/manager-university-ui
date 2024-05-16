import { React, useEffect, useState } from "react";
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import SeasonService from '../../services/SeasonService'
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import Util from "../../utils/Util";
import ListMuiComponent from "../GenericComponent/ListMuiComponent";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import GradeService from "../../services/GradeService";
import MajorRegisterService from "../../services/MajorRegisterService";
function AdminGradeComponent() {
    const [majorRegisters, setMajorRegisters] = useState([])
    const [seasons, setSeasons] = useState([])
    document.title = "Xem điểm"
    useEffect(() => {
        SeasonService.getAllSeason()
            .then(res => setSeasons(res.data))
            .catch(err => console.log(err))
        MajorRegisterService.getAllMajorRegister()
            .then(res => {
                setMajorRegisters(res.data);
            }).catch(err => console.log(err))
    }, [])
    const columns = [
        { id: 'season', label: 'Mùa học', align: 'center', minWidth: 100 },
        { id: 'details', label: 'Xem chi tiết', align: 'center', minWidth: 170 }

    ];
    const createDataGrade = (season, details) => {
        return { season, details }
    }
    const handleInitGrade = (majorRegisterId) => {
        GradeService.initGradeByMajorRegister(majorRegisterId)
            .then(() => {
                alert("ok")
                window.location.reload();
            }).catch(err => console.log(err))
    }
    const rows = seasons.map((season) => {
        return (
            createDataGrade(season.nameSeason, <DialogMuiComponent
                nameAction="Xem chi tiết"
                nameSomething={'Chuyên ngành'}
                number={2}
                interface={
                    <ListBoostrapComponent
                        columns={['Chuyên ngành', 'Các môn học', 'Nhập điểm', "Khởi tạo", "Chú ý"]}
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
                                    <td>
                                        <Button variant="contained" component={Link} to={`/admin/grades/enter-grade-for-student`}>Nhập điểm</Button>
                                    </td>
                                    <td>
                                        <Button variant="contained" onClick={() => handleInitGrade(majorRegister.id)}>Khởi tạo</Button>
                                    </td>
                                    <td>
                                        Cần khởi tạo trước khi nhập điểm
                                    </td>
                                </tr>
                            )
                        }) : []}
                    />}
            />
            )
        )
    })
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
export default AdminGradeComponent;