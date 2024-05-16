import React, { useEffect, useState } from 'react';
import RegisterService from '../../services/RegisterSubjectService'
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import { Checkbox } from "@mui/material";
import SelectMuiComponent from '../GenericComponent/SelectMuiComponent';
import Util from '../../utils/Util';
import MajorRegisterService from '../../services/MajorRegisterService';
import TransactionService from '../../services/TransactionService';
import ListMuiComponent from '../GenericComponent/ListMuiComponent';
function ExchangeSubject() {

    const [registers, setRegisters] = useState([]);
    const [registerOpenedTransactions, setRegisterOpenedTransactions] = useState([])
    document.title = "Trao đổi môn học"


    const [majorRegister, setMajorRegister] = useState(null)
    const major = Util.getMajor();


    useEffect(() => {
        if (major != null) {
            MajorRegisterService.getMajoRegisterByStudentIdAndSeasonNotDisabledAndOpenRegister(Util.getProfile().id, true)
                .then(res =>{ 
                    setMajorRegister(res.data)
                    RegisterService.getAllRegisterByStudentIdAndSeasonNotDisabled(Util.getProfile().id, false)
                    .then(res => {
                        setRegisters(res.data)
                    })
                    .catch(err => alert("error get registered"))
                }
                )
                .catch(err => console.log("error get majorregister"))
            
        }
    }, [])



    const openTransaction = (registerId) => {
        RegisterService.transaction(registerId, true)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                alert("Mở cổng giao dịch thất bại")
            })
    }
    const closeTransaction = (registerId) => {
        RegisterService.transaction(registerId, false)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                alert("Đóng giao dịch thất bại")
            })
    }
    const removeTransaction = (targetRegister) => {
        TransactionService.deleteByTargetRegisterAndStudentRequestId(targetRegister, Util.getProfile().id)
        .then(() => {
            let cookie = Util.getCookie(Util.getProfile().id + "_transaction").split("_");
            console.log("cookie: ", cookie)
            let newValue = [];
            for(let i = 0; i < cookie.length; i++) {
                if(cookie[i] != (targetRegister + '')) {
                    newValue.push(cookie[i]);
                }
            }
            const dataCookie = newValue.join("_");
            Util.setCookie(Util.getProfile().id + "_transaction", dataCookie, 3);
            window.location.reload()
        })
        .catch(err => {
            console.log(err)

            alert("You catch error when delete transaction")
        })
    }

    const confirmTransaction = (targetRegisterId, requestRegisterId) => {
        TransactionService.confirmTransaction(targetRegisterId, requestRegisterId)
            .then(() => window.location.reload())
            .catch(() => alert("Xảy ra lỗi"))
    }
    const columns1 = [
        { id: 'subjectCode', label: 'Mã môn học', align: 'center', minWidth: 130 },
        { id: 'subjectName', label: 'Tên môn học', align: 'center', minWidth: 170 },
        {
            id: 'credit',
            label: 'Số tín chỉ',
            minWidth: 100,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'time',
            label: 'Thời gian',
            minWidth: 85,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'group',
            label: 'Nhóm',
            minWidth: 85,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'teacher',
            label: 'Giảng viên',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'listExchange',
            label: 'Danh sách trao đổi',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'openTransaction',
            label: 'Mở giao dịch',
            minWidth: 140,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'closeTransaction',
            label: 'Đóng giao dịch',
            minWidth: 140,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
    ];
    const createDataRegister = (subjectCode, subjectName, credit, time, group, teacher, listExchange, openTransaction, closeTransaction) => {
        return { subjectCode, subjectName, credit, time, group, teacher, listExchange, openTransaction, closeTransaction }
    }
    const rows1 = registers.map(register => {
        return (
            createDataRegister(register.subjectGroup.subject.subjectCode, register.subjectGroup.subject.subjectName,
                register.subjectGroup.subject.credit, (<DialogMuiComponent
                    nameAction="Xem"
                    nameSomething={'Thời gian học'}
                    number={2}
                    interface={
                        <ListBoostrapComponent
                            columns={['Thứ', 'Ngày bắt đầu', 'Ngày kết thúc', 'Thời gian']}
                            rows={register.subjectGroup.times.length != 0 ? register.subjectGroup.times.map(time => {
                                return (
                                    <tr>
                                        <td>{time.dayOfWeek}</td>
                                        <td>{time.startDate}</td>
                                        <td>{time.endDate}</td>
                                        <td>{time.startTime + " - " + time.endTime}</td>
                                    </tr>
                                )
                            }) : []}
                        />
                    }
                />), register.subjectGroup.groupName, register.subjectGroup.teacher != null ? register.subjectGroup.teacher.fullName : '',
                (<DialogMuiComponent
                    nameAction="Xem"
                    nameSomething={'Danh sách trao đổi'}
                    number={2}
                    interface={
                        <ListBoostrapComponent
                            columns={['Sinh viên', 'Mã môn', 'Tên môn', 'Tín chỉ', 'Khung giờ', 'Nhóm', 'Giảng viên', "Đồng ý"]}
                            rows={register.listRegisterRequest != 0 ? register.listRegisterRequest.map(registerRequest => {
                                return (
                                    <tr>
                                        <td>{registerRequest.studentDTO.fullName}</td>
                                        <td>{registerRequest.subjectGroup.subject.subjectCode}</td>
                                        <td>{registerRequest.subjectGroup.subject.subjectName}</td>
                                        <td>{registerRequest.subjectGroup.subject.credit}</td>
                                        <td>
                                            <DialogMuiComponent
                                                nameAction="Xem"
                                                nameSomething={'Thời gian học'}
                                                number={2}
                                                interface={
                                                    <ListBoostrapComponent
                                                        columns={['Thứ', 'Ngày bắt đầu', 'Ngày kết thúc', 'Thời gian']}
                                                        rows={registerRequest.subjectGroup.times.length != 0 ? registerRequest.subjectGroup.times.map(time => {
                                                            return (
                                                                <tr>
                                                                    <td>{time.dayOfWeek}</td>
                                                                    <td>{time.startDate}</td>
                                                                    <td>{time.endDate}</td>
                                                                    <td>{time.startTime + " - " + time.endTime}</td>
                                                                </tr>
                                                            )
                                                        }) : []}
                                                    />
                                                }
                                            />
                                        </td>
                                        <td>{registerRequest.subjectGroup.groupName}</td>
                                        <td>{registerRequest.subjectGroup.teacher != null ? registerRequest.subjectGroup.teacher.fullName : ''}</td>
                                        <td>
                                            <Checkbox
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                value={registerRequest.id}
                                                onClick={(e) => {
                                                    confirmTransaction(register.id, e.target.value);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                )
                            }) : []}
                        />
                    }
                />), (<Checkbox
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    value={register.id}
                    defaultChecked={register.openTransaction}
                    disabled={register.openTransaction}
                    onClick={(e) => {
                        openTransaction(e.target.value);
                    }}
                />), (<Checkbox
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    value={register.id}
                    disabled={!register.openTransaction}
                    onClick={(e) => {
                        closeTransaction(e.target.value);
                    }} />)
            )

        )
    })

    const sendRequest = (tagetRegisterId) => {
        TransactionService.createTransaction(tagetRegisterId, Util.getProfile().id)
            .then(res => {
                let cname = Util.getProfile().id + "_transaction";
                let cookie = Util.getCookie(cname);
                if(cookie == null) {
                    Util.setCookie(cname, tagetRegisterId, 3);
                } else {
                    Util.setCookie(cname, cookie + "_" + tagetRegisterId);
                }
                window.location.reload()
            }).catch(err => {
                alert("Môn học bạn đổi không có trong danh sách đăng ký của bạn")
                window.location.reload()
            })
    }


    const columns2 = [
        { id: 'subjectCode', label: 'Mã môn học', align: 'center', minWidth: 130 },
        { id: 'subjectName', label: 'Tên môn học', align: 'center', minWidth: 170 },
        {
            id: 'credit',
            label: 'Số tín chỉ',
            minWidth: 100,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'time',
            label: 'Thời gian',
            minWidth: 85,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'group',
            label: 'Nhóm',
            minWidth: 85,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'teacher',
            label: 'Giảng viên',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'register',
            label: 'Giao dịch',
            minWidth: 140,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'cancel',
            label: 'Xóa giao dịch',
            minWidth: 140,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
    ];
    const createDataRegisterOpenedTransaction = (subjectCode, subjectName,
        credit, time, group, teacher, register, cancel) => {
        return { subjectCode, subjectName, credit, time, group, teacher, register, cancel }
    }
    const getRegisterOpenedTransaction = (list) => {
        const valueCookie = Util.getCookie(Util.getProfile().id + "_transaction");
        const value = valueCookie != null ? valueCookie.split('_') : null;
        return registerOpenedTransactions.map(register => {
            return (
                createDataRegisterOpenedTransaction(register.subjectGroup.subject.subjectCode, register.subjectGroup.subject.subjectName,
                    register.subjectGroup.subject.credit, (<DialogMuiComponent
                        nameAction="Xem"
                        nameSomething={'Thời gian học'}
                        number={2}
                        interface={
                            <ListBoostrapComponent
                                columns={['Thứ', 'Ngày bắt đầu', 'Ngày kết thúc', 'Thời gian']}
                                rows={register.subjectGroup.times.length != 0 ? register.subjectGroup.times.map(time => {
                                    return (
                                        <tr>
                                            <td>{time.dayOfWeek}</td>
                                            <td>{time.startDate}</td>
                                            <td>{time.endDate}</td>
                                            <td>{time.startTime + " - " + time.endTime}</td>
                                        </tr>
                                    )
                                }) : []}
                            />
                        }
                    />), register.subjectGroup.groupName, register.subjectGroup.teacher != null ? register.subjectGroup.teacher.fullName : '',
                    (<Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        value={register.id}
                        checked={value != null && value.includes(register.id + '')}
                        disabled={value != null && value.includes(register.id + '')}
                        onClick={(e) => {
                            sendRequest(e.target.value);
                        }}
                    />), (<Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        value={register.id}
                        disabled={value == null || !value.includes(register.id + '')}
                        onClick={(e) => {
                            removeTransaction(e.target.value);
                        }}
                    />))
    
            )
        })
    }
    const rows2 = registerOpenedTransactions.length > 0 ? getRegisterOpenedTransaction(registerOpenedTransactions) : []
    const getAllListRegisterOpenedBySubjectId = (subjectId) => {
        RegisterService.getAllRegisterOpenedTransactionBySubjectIdAndNotOfStudentId(subjectId, Util.getProfile().id)
            .then(res => {
                setRegisterOpenedTransactions(res.data)
            })
            .catch(err => { alert("get register error") })
    }
    return (
        <div className='container'
            style={{
                marginTop: '50px'
            }}>

            {majorRegister != null && majorRegister.seasonDTO != null ? (
                <div>
                    <div className="form-group mb-3">
                        <label className="form-label">
                            Tên chuyên ngành:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={major != null ? major.name : ''}
                            disabled
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label">
                            Mùa học:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={majorRegister != null && majorRegister.seasonDTO != null ? majorRegister.seasonDTO.nameSeason : ''}
                            disabled
                        />
                    </div>
                    <div className="form-group mb-3">
                        <SelectMuiComponent
                            title="Chọn môn học"
                            type={"SUBJECT"}
                            data={majorRegister != null && majorRegister.subjectDTOS != null ? majorRegister.subjectDTOS : []}
                            width={'100%'}
                            function={(e) => { getAllListRegisterOpenedBySubjectId(e.target.value) }}
                        />
                    </div>
                    <ListMuiComponent
                        title="Môn học đã được đăng ký"
                        columns={columns1}
                        rows={rows1}
                    />
                    <br />
                    <ListMuiComponent
                        title="Các môn học đang được trao đổi"
                        columns={columns2}
                        rows={rows2}
                    />
                </div>
            ) : (<div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control text-center"
                    value={"Thời gian đăng ký chưa có!"}
                    disabled
                />
            </div>)}
        </div >
    )


}

export default ExchangeSubject;