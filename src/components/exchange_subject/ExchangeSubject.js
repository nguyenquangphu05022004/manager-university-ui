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
import SeasonService from '../../services/SeasonService';
import SubjectGroupService from '../../services/SubjectGroupService';
import Semester from '../../constant/Semester';
var seasonId = null;

function ExchangeSubject() {

    const [registerOpenedTransactions, setRegisterOpenedTransactions] = useState([])
    const [openSpinner, setOpenSpinner] = useState(true);
    const [openProcess, setOpenProcess] = useState(false);
    const [openProcessSubject, setOpenProcessSubject] = useState(false)

    document.title = "Trao đổi môn học"


    const [majorRegister, setMajorRegister] = useState(null)
    const major = Util.getMajor();
    const [seasons, setSeasons] = useState([])
    const [openProcessMajorRegister, setOpenProcessMajorRegister] = useState(false)

    useEffect(() => {
        SeasonService.getAllByCoursesId(Util.getProfile().courses.id)
            .then(res => {
                setOpenSpinner(false)
                setSeasons(res.data)
                if (res.data.length > 0) {
                    seasonId = res.data[0].id
                    getMajorRegisterBySeasonIdAndStudentId(res.data[0].id, Util.getProfile().id)
                }
            })
            .catch(() => {
                setOpenSpinner(false)
                setSeasons([])
            })
    }, [])

    const getMajorRegisterBySeasonIdAndStudentId = (seaId, studentId) => {
        setOpenProcessMajorRegister(true)
        MajorRegisterService.getBySeasonIdAndStudentId(seaId, studentId)
            .then(res => {
                seasonId = seaId;
                setOpenProcessMajorRegister(false)
                setMajorRegister(res.data)
            }).catch(err => {
                setMajorRegister(null)
                setOpenProcessMajorRegister(false)
            })

    }


    const columnsTimeTable = [
        { id: 'day', label: 'Thứ', align: 'center', minWidth: 130 },
        { id: 'start', label: 'Ngày bắt đầu', align: 'center', minWidth: 170 },
        {
            id: 'end',
            label: 'Ngày kết thúc',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'time',
            label: 'Thời gian',
            minWidth: 100,
            align: 'center',
        },
    ]
    const createDataTimeTable = (day, start, end, time) => {
        day += 1;
        return {day, start, end, time }
    }



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
    const createListTransactionOfStudent = (student, subjectCode, subjectName, credit, time, group, teacher, action) => {
        return { student, subjectCode, subjectName, credit, time, group, teacher, action };
    }
    const columnsListTransaction = [
        {
            id: 'student',
            label: 'Sinh viên',
            minWidth: 140,
            align: 'center',
        },
        {
            id: 'subjectCode',
            label: 'Mã môn',
            minWidth: 140,
            align: 'center',
        },
        {
            id: 'subjectName',
            label: 'Tên môn',
            minWidth: 140,
            align: 'center',
        },
        {
            id: 'credit',
            label: 'Tín chỉ',
            minWidth: 140,
            align: 'center',
        },
        {
            id: 'time',
            label: 'Khung giờ',
            minWidth: 140,
            align: 'center',
        },
        {
            id: 'group',
            label: 'Nhóm',
            minWidth: 140,
            align: 'center',
        },
        {
            id: 'teacher',
            label: 'Giảng viên',
            minWidth: 140,
            align: 'center'
        },
        {
            id: 'action',
            label: 'Đồng ý',
            minWidth: 140,
            align: 'center'
        }
    ]



    const rows1 = majorRegister != null && majorRegister.registerDTOS.length > 0 ? majorRegister.registerDTOS.map(register => {
        return (
            createDataRegister(register.subjectGroup.subject.subjectCode, register.subjectGroup.subject.subjectName,
                register.subjectGroup.subject.credit, (<DialogMuiComponent
                    nameAction="Xem"
                    nameSomething={'Thời gian học'}
                    number={2}
                    interface={
                        <ListMuiComponent
                            columns={columnsTimeTable}
                            rows={register.subjectGroup.times.length != 0 ? register.subjectGroup.times.map(time => {
                                return (
                                    createDataTimeTable(time.dayOfWeek, time.startDate, time.endDate, time.startTime + " - " + time.endTime)
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
                        <ListMuiComponent
                            columns={columnsListTransaction}
                            rows={register.transactionList != 0 ? register.transactionList.map(transaction => {
                                return (
                                    createListTransactionOfStudent(transaction.registerDTO.studentDTO.fullName, transaction.registerDTO.subjectGroup.subject.subjectCode,
                                        transaction.registerDTO.subjectGroup.subject.subjectName, transaction.registerDTO.subjectGroup.subject.credit,
                                        <DialogMuiComponent
                                            nameAction="Xem"
                                            nameSomething={'Thời gian học'}
                                            number={2}
                                            interface={
                                                <ListMuiComponent
                                                    columns={columnsTimeTable}
                                                    rows={transaction.registerDTO.subjectGroup.times.length != 0 ? transaction.registerDTO.subjectGroup.times.map(time => {
                                                        return (
                                                            createDataTimeTable(time.dayOfWeek, time.startDate, time.endDate, time.startTime + " - " + time.endTime)
                                                        )
                                                    }) : []}
                                                />
                                            }
                                        />, transaction.registerDTO.subjectGroup.groupName, transaction.registerDTO.subjectGroup.teacher != null ? transaction.registerDTO.subjectGroup.teacher.fullName : '',
                                        <Checkbox
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                            value={transaction.registerDTO.id}
                                            onClick={(e) => {
                                                confirmTransaction(register.id, e.target.value);
                                            }}
                                        />
                                    )

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
    }) : []

    const sendRequest = (tagetRegisterId, subjectId) => {
        TransactionService.createTransaction(tagetRegisterId, Util.getProfile().id)
            .then(res => {
                getAllListRegisterOpenedBySubjectId(subjectId)
            }).catch(err => {
                alert("Môn học bạn đổi không có trong danh sách đăng ký của bạn hoặc bị trùng môn học")
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
    const createDataRegisterOpenedTransaction = (avatarStudent, subjectCode, subjectName,
        credit, time, group, teacher, register, cancel) => {
        return { avatarStudent, subjectCode, subjectName, credit, time, group, teacher, register, cancel }
    }
    const getRegisterOpenedTransaction = (list) => {
        return list.map(register => {
            let requestOfStudentCurrent = false;
            for (let i = 0; i < register.transactionList.length; i++) {
                const tran = register.transactionList[i];
                if (tran.studentRequest === Util.getProfile().id) {
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
                            <ListMuiComponent
                                columns={columnsTimeTable}
                                rows={register.subjectGroup.times.length != 0 ? register.subjectGroup.times.map(time => {
                                    return (
                                        createDataTimeTable(time.dayOfWeek, time.startDate, time.endDate, time.startTime + " - " + time.endTime)
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
        setOpenProcessSubject(true);
        RegisterService.getAllRegisterOpenedTransactionBySubjectIdAndNotOfStudentId(subjectId, Util.getProfile().id)
            .then(res => {
                setOpenProcessSubject(false);
                setRegisterOpenedTransactions(res.data)
            })
            .catch(err => { alert("get register error"); setOpenProcessSubject(false) })
    }



    if (openSpinner) {
        return <Spinner />
    }

    return (
        <div className='container'
            style={{
                marginTop: '50px'
            }}>

            <div>
                <div className='row'>
                    <h4 style={{ color: 'red' }}>Khi đăng ký môn học lại/cải thiện của kỳ phụ cần đăng ký đúng môn đã đăng ký nguyện vọng và được duyệt trước đó.</h4>
                    <h4 style={{ color: 'black' }}>Thời gian trao đổi: {majorRegister != null && majorRegister.eventRegisterResponse != null ? majorRegister.eventRegisterResponse.formatStart + ' đến ' + majorRegister.eventRegisterResponse.formatEnd : 'Chưa có thời gian'}.</h4>
                    <div className='col-6'>
                        <div className="form-group mb-3">
                            <label className="form-label">
                                Tên ngành:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={major != null ? major.name : ''}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="form-group mb-3">
                            <label className="form-label">
                                Học kỳ:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={Semester.MAIN_SEMESTER}
                                disabled
                            />
                        </div>
                    </div>
                </div>


                <div className="form-group mb-3">
                    {seasons.length > 0 ? <div>
                        <SelectMuiComponent
                            title="Chọn mùa học"
                            type={"SEASON"}
                            data={seasons}
                            width={'100%'}
                            defaultValue={seasons[0].id}
                            function={(e) => getMajorRegisterBySeasonIdAndStudentId(e.target.value, Util.getProfile().id)}
                        />
                        {openProcessMajorRegister && <Process />}
                    </div>
                        : ''}
                </div>
                {majorRegister != null && majorRegister.openRegister ? (<div>
                    <div className="form-group mb-3">
                        <SelectMuiComponent
                            title="Chọn môn học"
                            type={"SUBJECT"}
                            data={majorRegister != null && majorRegister.subjectDTOS != null ? majorRegister.subjectDTOS : []}
                            width={'100%'}
                            function={(e) => getAllListRegisterOpenedBySubjectId(e.target.value)}
                        />
                        {openProcessSubject && <Process />}
                    </div>
                </div>) :
                    ''}
                {majorRegister != null && majorRegister.openRegister && <div className='form-group mb-3'>
                    <ListMuiComponent
                        title="Môn học đã được đăng ký"
                        columns={columns1}
                        rows={rows1}
                    />
                </div>}

                <ListMuiComponent
                    title="Các môn học đang được trao đổi"
                    columns={columns2}
                    rows={rows2}
                />
                {openProcess && <Process />}
            </div>

        </div >
    )


}

export default ExchangeSubject;