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
import Spinner from '../GenericComponent/Spinner';
import Process from '../GenericComponent/Process';

function ExchangeSubject() {

    const [registers, setRegisters] = useState([]);
    const [registerOpenedTransactions, setRegisterOpenedTransactions] = useState([])
    const [openSpinner, setOpenSpinner] = useState(true);
    const [openProcess, setOpenProcess]= useState(false);
    document.title = "Trao đổi môn học"


    const [majorRegister, setMajorRegister] = useState(null)
    const major = Util.getMajor();


    useEffect(() => {
        if (major != null) {
        MajorRegisterService.getMajoRegisterByStudentIdAndSeasonNotDisabledAndOpenRegisterAdCoursesId(Util.getProfile().id, true, Util.getProfile().courses.id)
                .then(res =>{ 
                    setMajorRegister(res.data)
                    RegisterService.getAllRegisterByStudentIdAndSeasonNotDisabled(Util.getProfile().id, false)
                    .then(res => {
                        setOpenSpinner(false);
                        setRegisters(res.data)
                    })
                    .catch(err => {
                        setOpenSpinner(false);
                        alert("error get registered")
                    })
                }
                )
                .catch(err => {
                    setOpenSpinner(false)
                    console.log("error get majorregister")
                })
            
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
    const removeTransaction = (targetRegister, subjectId) => {
        TransactionService.deleteByTargetRegisterAndStudentRequestId(targetRegister, Util.getProfile().id)
        .then(() => {
            getAllListRegisterOpenedBySubjectId(subjectId);
        })
        .catch(err => {
            getAllListRegisterOpenedBySubjectId(subjectId)
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
                            rows={register.transactionList != 0 ? register.transactionList.map(transaction => {
                                return (
                                    <tr>
                                        <td>{transaction.registerDTO.studentDTO.fullName}</td>
                                        <td>{transaction.registerDTO.subjectGroup.subject.subjectCode}</td>
                                        <td>{transaction.registerDTO.subjectGroup.subject.subjectName}</td>
                                        <td>{transaction.registerDTO.subjectGroup.subject.credit}</td>
                                        <td>
                                            <DialogMuiComponent
                                                nameAction="Xem"
                                                nameSomething={'Thời gian học'}
                                                number={2}
                                                interface={
                                                    <ListBoostrapComponent
                                                        columns={['Thứ', 'Ngày bắt đầu', 'Ngày kết thúc', 'Thời gian']}
                                                        rows={transaction.registerDTO.subjectGroup.times.length != 0 ? transaction.registerDTO.subjectGroup.times.map(time => {
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
                                        <td>{transaction.registerDTO.subjectGroup.groupName}</td>
                                        <td>{transaction.registerDTO.subjectGroup.teacher != null ? transaction.registerDTO.subjectGroup.teacher.fullName : ''}</td>
                                        <td>
                                            <Checkbox
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                value={transaction.registerDTO.id}
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

    const sendRequest = (tagetRegisterId, subjectId) => {
        TransactionService.createTransaction(tagetRegisterId, Util.getProfile().id)
            .then(res => {
                getAllListRegisterOpenedBySubjectId(subjectId)
            }).catch(err => {
                alert("Môn học bạn đổi không có trong danh sách đăng ký của bạn")
                getAllListRegisterOpenedBySubjectId(subjectId)
            })
    }


    const columns2 = [
        { id: 'avatarStudent', label: 'Sinh viên', align: 'center', minWidth: 130 },

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
    const createDataRegisterOpenedTransaction = (avatarStudent,subjectCode, subjectName,
        credit, time, group, teacher, register, cancel) => {
        return {avatarStudent, subjectCode, subjectName, credit, time, group, teacher, register, cancel }
    }
    const getRegisterOpenedTransaction = (list) => {
        return list.map(register => {
            let requestOfStudentCurrent = false;
            for(let i = 0; i <register.transactionList.length; i++) {
                const tran = register.transactionList[i];
                if(tran.studentRequest === Util.getProfile().id) {
                    requestOfStudentCurrent = true; break;
                }
            }
            return (
                createDataRegisterOpenedTransaction(
                    <div>
                        <img className='mb-2' width={130}
                            src={register.studentDTO.user.avatarResponse != null ? register.studentDTO.user.avatarResponse.url : ''} />
                        <h5>{register.studentDTO.user.username}</h5>
                    </div>,
                    register.subjectGroup.subject.subjectCode, register.subjectGroup.subject.subjectName,
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
                        checked={requestOfStudentCurrent}
                        disabled={requestOfStudentCurrent}
                        onClick={(e) => {
                            sendRequest(e.target.value, register.subjectGroup.subject.id);
                        }}
                    />), (<Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        value={register.id}
                        disabled={!requestOfStudentCurrent}
                        checked={false}
                        onClick={(e) => {
                            removeTransaction(e.target.value, register.subjectGroup.subject.id);
                        }}
                    />))
    
            )
        })
    }
    const rows2 = registerOpenedTransactions.length > 0 ? getRegisterOpenedTransaction(registerOpenedTransactions) : []
    const getAllListRegisterOpenedBySubjectId = (subjectId) => {
        setOpenProcess(true);
        RegisterService.getAllRegisterOpenedTransactionBySubjectIdAndNotOfStudentId(subjectId, Util.getProfile().id)
            .then(res => {
                setOpenProcess(false);
                setRegisterOpenedTransactions(res.data)
            })
            .catch(err => { alert("get register error"); setOpenProcess(false) })
    }

    if(openSpinner) {
        return <Spinner/>
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
                    {openProcess && <Process/>}
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