import { React, useEffect, useState } from "react";
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import SeasonService from '../../services/SeasonService'
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import Util from "../../utils/Util";
import ListMuiComponent from "../GenericComponent/ListMuiComponent";
import { Button } from '@mui/material';
import TuitionService from '../../services/TuitionService'
function TuitionAdminComponent() {
    const [seasons, setSeasons] = useState([])
    const [perMoneyCredit, setPerMoneyCredit] = useState('')
    document.title = "Học phí"
    useEffect(() => {
        SeasonService.getAllSeason()
            .then(res => {
                setSeasons(res.data);
            }).catch(err => alert("Error get infomation"))
    }, [])
    console.log(seasons)
    const columns = [
        { id: 'season', label: 'Mùa học', align: 'center', minWidth: 100 },
        { id: 'details', label: 'Xem chi tiết', align: 'center', minWidth: 170 },

    ];
    const createDataGrade = (season, details) => {
        return { season, details }
    }
    const handleSubmit = (majorRegisterId) => {
        const requestData = {
            "moneyPerCredit": perMoneyCredit,
            "majorRegisterDTO": {
                "id": majorRegisterId
            }
        }
        TuitionService.initTuition(requestData)
            .then(() => {
                window.location.reload();
            }).catch(err => console.log(err))
    }
    const rows = seasons.map((season) => {
        return (
            createDataGrade(season.nameSeason, (<DialogMuiComponent
                nameAction="Xem chi tiết"
                nameSomething={'Chuyên ngành'}
                number={2}
                interface={
                    <ListBoostrapComponent
                        columns={['Chuyên ngành', 'Các môn học', 'Tổng số tín', "Hành động", "Giá 1 tín"]}
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
                                    <td>
                                        <DialogMuiComponent
                                            nameAction="Khởi tạo"
                                            nameSomething={'Mẫu'}
                                            number={3}
                                            interface={
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="card col-md-6 offset-md-3 offset-md-3">
                                                            <div className="card-body">
                                                                <div className="form-group mb-2">
                                                                    <label className="form-label">
                                                                        Số tiền cho 1 tín chỉ:
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Số tiền cho 1 tín chỉ"
                                                                        className="form-control"
                                                                        value={perMoneyCredit}
                                                                        onChange={(e) => setPerMoneyCredit(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group mb-2">
                                                                    <label className="form-label">
                                                                        Học kỳ:
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={season.nameSeason}
                                                                        disabled={true}
                                                                    />
                                                                </div>
                                                                <div className="form-group mb-2">
                                                                    <button className="btn btn-primary"
                                                                        style={{ width: "100%" }}
                                                                        onClick={() => handleSubmit(majorRegister.id)}
                                                                    >Gửi</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            }
                                        />
                                    </td>
                                    <td>{majorRegister.tuitionDTO != null ? majorRegister.tuitionDTO.moneyPerCredit : "Chưa khởi tạo"}</td>
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
export default TuitionAdminComponent;