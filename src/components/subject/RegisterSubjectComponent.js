import React, { useEffect, useState } from 'react';
import RegisterSubjectService from '../../services/RegisterSubjectService';
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import SelectMuiComponent from '../GenericComponent/SelectMuiComponent';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import MajorRegisterService from '../../services/MajorRegisterService';
import SubjectGroupService from '../../services/SubjectGroupService';
import Util from '../../utils/Util';
import ListMuiComponent from '../GenericComponent/ListMuiComponent';
import Spinner from '../GenericComponent/Spinner'
import Process from '../GenericComponent/Process'
import SeasonService from '../../services/SeasonService';
import { Checkbox } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

var seasonId = null;
function RegisterSubjectComponent() {

    const [majorRegister, setMajorRegister] = useState(null)
    const [subjectGroups, setSubjectGroups] = useState([])
    const [openSpinner, setOpenSpinner] = useState(true)
    const major = Util.getMajor();

    const [openProcessMajorRegister, setOpenProcessMajorRegister] = useState(false)
    const [openProcessSubject, setOpenProcessSubject] = useState(false)
    const [seasons, setSeasons] = useState([])

    document.title = "Đăng ký môn học"
    useEffect(() => {
        SeasonService.getAllByCoursesId(Util.getProfile().courses.id)
            .then(res => {
                setOpenSpinner(false)
                setSeasons(res.data)
                if (res.data.length > 0) {
                    seasonId = res.data[0].id
                    getMajorRegisterBySeasonIdAndStudentId(res.data[0].id, Util.getProfile().id, true)
                }
            })
            .catch(() => {
                setOpenSpinner(false)
                setSeasons([])
            })
    }, [])

    console.log(seasons)
    const getSeason = () => {
        setSeasons([])
        setMajorRegister([])
        SeasonService.getAllByCoursesId(Util.getProfile().courses.id)
            .then(res => {
                setSeasons(res.data)
                if (res.data.length > 0) {
                    seasonId = res.data[0].id
                    getMajorRegisterBySeasonIdAndStudentId(res.data[0].id, Util.getProfile().id, true)
                }
            })
            .catch(() => {
                setSeasons([])
                setMajorRegister([])
            })
    }
    const getMajorRegisterBySeasonIdAndStudentId = (seaId, studentId, notRemoveSubjectGroup) => {
        setOpenProcessMajorRegister(true)
        if(!notRemoveSubjectGroup) {
            setSubjectGroups([])
        }
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

    const getAllGroupSubjectBySubjectId = (subjectID) => {
        setOpenProcessSubject(true)
        SubjectGroupService.getAllSubjectGroupBySubjectId(subjectID).then(res => {
            setOpenProcessSubject(false)
            setSubjectGroups(res.data);
        }).catch(err => {
            setOpenProcessSubject(false)
            alert('error get subject group by subject Id')
        })

    }


    const registerSubject = (subjectGroupId) => {
        const requestData = {
            "subjectGroup": {
                "id": subjectGroupId
            },
            "majorRegisterDTO": {
                "id": majorRegister != null ? majorRegister.id : '   '
            },
            "studentDTO": {
                "id": (Util.getProfile() != null ? Util.getProfile().id : '')
            },
            "openTransaction": false
        }
        RegisterSubjectService.registerSubject(requestData)
            .then(() => {
                getMajorRegisterBySeasonIdAndStudentId(seasonId, Util.getProfile().id, true)
            }).catch((err) => {
                console.log(err)
            })
    }

    const columTime = [
        { id: 'day', label: 'Thứ', align: 'center', minWidth: 170 },
        {
            id: 'start',
            label: 'Ngày bắt đầu',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'end',
            label: 'Ngày kết thúc',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'time',
            label: 'Thời gian',
            minWidth: 50,
            align: 'center',
            format: (value) => value.toFixed(2),
        }
    ];
    const createDataTime = (day, start, end, time) => {
        return { day, start, end, time };
    }

    const columns1 = [
        { id: 'subjectCode', label: 'Mã môn học', align: 'center', minWidth: 170 },
        { id: 'subjectName', label: 'Tên môn học', align: 'center', minWidth: 170 },
        {
            id: 'credit',
            label: 'Số tín chỉ',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'time',
            label: 'Thời gian',
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'group',
            label: 'Nhóm',
            minWidth: 50,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'quantity',
            label: 'Số lượng',
            minWidth: 50,
            align: 'center',
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
            label: 'Đăng ký',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
    ];
    const createDataSubject = (subjectCode, subjectName, credit, time, group, quantity, teacher, register) => {
        return { subjectCode, subjectName, credit, time, group, quantity, teacher, register }
    }
    const getListSubjectGroup = (listSubjectGroups) => {
        const cookiesSubjectGroup = Util.getCookie(Util.getProfile().id + "_subjectGroup") != null ? Util.getCookie(Util.getProfile().id + "_subjectGroup").split('_') : null;
        const cookieSubject = Util.getCookie(Util.getProfile().id + "_subject") != null ? Util.getCookie(Util.getProfile().id + "_subject").split('_') : null;
        return listSubjectGroups.map((subjectGroup) => {
            return (
                createDataSubject(subjectGroup.subject.subjectCode, subjectGroup.subject.subjectName, subjectGroup.subject.credit,
                    (<DialogMuiComponent
                        nameAction="Xem"
                        nameSomething={'Thời gian học'}
                        number={1}
                        interface={
                            <ListMuiComponent
                                columns={columTime}
                                rows={subjectGroup.times.length != 0 ? subjectGroup.times.map(time => {
                                    return createDataTime(time.dayOfWeek + 1 == 8 ? 'Chủ nhật' : time.dayOfWeek + 1, time.startDate, time.endDate, time.startTime + " - " + time.endTime)
                                }) : []}
                            />
                        }
                    />), subjectGroup.groupName, subjectGroup.numberOfStudent + '/' + subjectGroup.numberOfStudentCurrent, (subjectGroup.teacher != null ? subjectGroup.teacher.fullName : ''),
                    (
                        // <Tooltip title="Delete">
                            <Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                value={subjectGroup.id}
                                disabled={majorRegister != null && majorRegister.openRegister ? cookieSubject != null && cookieSubject.includes(subjectGroup.subject.id + '') || subjectGroup.numberOfStudent === subjectGroup.numberOfStudentCurrent : true}
                                checked={cookiesSubjectGroup != null && cookiesSubjectGroup.includes(subjectGroup.id + '')}
                                onClick={(e) => {
                                    registerSubject(e.target.value);
                                }}
                        />
                        //  </Tooltip>
                         ))
            )
        })
    }
    const rows1 = getListSubjectGroup(subjectGroups);
    const columns2 = [
        { id: 'subjectCode', label: 'Mã môn học', align: 'center', minWidth: 170 },
        { id: 'subjectName', label: 'Tên môn học', align: 'center', minWidth: 100 },
        {
            id: 'credit',
            label: 'Số tín chỉ',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'time',
            label: 'Thời gian',
            minWidth: 100,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'group',
            label: 'Nhóm',
            minWidth: 170,
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
            id: 'remove',
            label: 'Xóa',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
    ];
    const createDataRegister = (subjectCode, subjectName, credit, time, group, teacher, remove) => {
        return { subjectCode, subjectName, credit, time, group, teacher, remove }
    }
    const deleteRegister = (registerId) => {
        RegisterSubjectService.deleteRegister(registerId)
            .then(() => {
                getMajorRegisterBySeasonIdAndStudentId(seasonId, Util.getProfile().id, true)
            }).catch(err => {
                alert("Thời hạn đăng ký đã hết bạn không thể xóa môn học, hoặc server đang xảy ra lỗi")
            })

    }
    const getRowsRegister = (registersList) => {
        let nameCookie = Util.getProfile().id + "_subjectGroup";
        let nameCookieSubject = Util.getProfile().id + "_subject";
        let value = '';
        let value1 = ''
        for (let i = 0; i < registersList.length; i++) {
            if (i != registersList.length - 1) {
                value += registersList[i].subjectGroup.id + "_";
                value1 += registersList[i].subjectGroup.subject.id + "_"
            } else {
                value += registersList[i].subjectGroup.id;
                value1 += registersList[i].subjectGroup.subject.id;
            }
        }
        Util.setCookie(nameCookie, value, 3);
        Util.setCookie(nameCookieSubject, value1, 3);
        return registersList.map(register => {
            return (
                createDataRegister(register.subjectGroup.subject.subjectCode, register.subjectGroup.subject.subjectName,
                    register.subjectGroup.subject.credit, (<DialogMuiComponent
                        nameAction="Xem"
                        nameSomething={'Thời gian học'}
                        number={2}
                        interface={
                            <ListMuiComponent
                                columns={columTime}
                                rows={register.subjectGroup.times.length != 0 ? register.subjectGroup.times.map(time => {
                                    return createDataTime(time.dayOfWeek + 1 == 8 ? 'Chủ nhật' : time.dayOfWeek + 1, time.startDate, time.endDate, time.startTime + " - " + time.endTime)
                                }) : []}
                            />
                        }
                    />), register.subjectGroup.groupName, register.subjectGroup.teacher != null ? register.subjectGroup.teacher.fullName : '',
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        value={register.id}
                        disabled={majorRegister != null && !majorRegister.openRegister}
                        onClick={(e) => {
                            deleteRegister(e.target.value);
                        }}
                    />)

            )
        })
    }

    const rows2 = getRowsRegister(majorRegister != null && majorRegister.registerDTOS != null ? majorRegister.registerDTOS : []);

    const getSeasonExtra = () => {
        setSeasons([])
        setMajorRegister([])
        SeasonService.getListSeasonExtraByStudent(Util.getProfile().id)
            .then(res => {
                setSeasons(res.data);
                if (res.data.length > 0) {
                    seasonId = res.data[0].id
                    getMajorRegisterBySeasonIdAndStudentId(res.data[0].id, Util.getProfile().id, true)
                }
            }).catch(err => {
                setSeasons([])
                setMajorRegister([])
            })
    }
    const handleSelectSemester = (e) => {
        const select = e.target.value;
        if (select == 1) {
            getSeason();
        } else {
            getSeasonExtra();
        }
    }
    if (openSpinner) {
        return (
            <Spinner />
        )
    }
    console.log('MajorRegister: ', majorRegister)
    return (
        <div className='container'
            style={{
                marginTop: '50px'
            }}>

            <div>

                <div className="form-group mb-3">
                    <h4 style={{ color: 'red' }}>Khi đăng ký môn học lại/cải thiện của kỳ phụ cần đăng ký đúng môn đã đăng ký nguyện vọng và được duyệt trước đó.</h4>
                    <h4 style={{ color: 'black' }}>Thời gian đăng ký: {majorRegister != null && majorRegister.eventRegisterResponse != null ? majorRegister.eventRegisterResponse.formatStart + ' đến ' + majorRegister.eventRegisterResponse.formatEnd : 'Chưa có thời gian'}.</h4>
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
                <div className="form-group mb-3">
                    <SelectMuiComponent
                        title="Chọn học kỳ"
                        type={"SEASON_EXTRA"}

                        width={'100%'}
                        defaultValue={1}
                        function={handleSelectSemester}
                    />
                </div>
                <div className="form-group mb-3">
                    {seasons.length > 0 ? <div>
                        <SelectMuiComponent
                            title="Chọn mùa học"
                            type={"SEASON"}
                            data={seasons}
                            width={'100%'}
                            defaultValue={seasons[0].id}
                            function={(e) => getMajorRegisterBySeasonIdAndStudentId(e.target.value, Util.getProfile().id, true)}
                        />
                        {openProcessMajorRegister && <Process />}
                    </div>
                        : ''}
                </div>
                <div>
                    <div className="form-group mb-3">
                        <SelectMuiComponent
                            title="Chọn môn học"
                            type={"SUBJECT"}
                            data={majorRegister != null && majorRegister.subjectDTOS != null ? majorRegister.subjectDTOS : []}
                            width={'100%'}
                            function={(e) => getAllGroupSubjectBySubjectId(e.target.value)}
                        />
                        {openProcessSubject && <Process />}
                    </div>
                    <div className="form-group mb-3">
                        <ListMuiComponent
                            title='Danh sách các môn học'
                            columns={columns1}
                            rows={rows1}
                        />
                    </div>
                </div>
                <div className="form-group mb-3">
                    <ListMuiComponent
                        title="Đăng ký thành công"
                        columns={columns2}
                        rows={rows2}
                    />
                </div>
            </div>


        </div>
    )
}

export default RegisterSubjectComponent;