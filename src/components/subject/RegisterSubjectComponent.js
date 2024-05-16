import React, { useEffect, useState } from 'react';
import RegisterSubjectService from '../../services/RegisterSubjectService';
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import SelectMuiComponent from '../GenericComponent/SelectMuiComponent';
import { Checkbox } from "@mui/material";
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import MajorRegisterService from '../../services/MajorRegisterService';
import SubjectGroupService from '../../services/SubjectGroupService';
import Util from '../../utils/Util';
import ListMuiComponent from '../GenericComponent/ListMuiComponent';
function RegisterSubjectComponent() {

    const [majorRegister, setMajorRegister] = useState(null)
    const [subjectGroups, setSubjectGroups] = useState([])
    const major = Util.getMajor();

    document.title = "Đăng ký môn học"
    useEffect(() => {
            if(major != null) {
                getMajorRegister();
            }
    }, [])


    const getMajorRegister = () => {
        MajorRegisterService.getMajoRegisterByStudentIdAndSeasonNotDisabledAndOpenRegister(Util.getProfile().id, true)
            .then(res => {
                console.log("cai deo gi vay")

                setMajorRegister(res.data)
            })
            .catch(err => console.log("error get major register"))
    }
    const getAllGroupSubjectBySubjectId = (subjectID) => {
        SubjectGroupService.getAllSubjectGroupBySubjectId(subjectID).then(res => {
            setSubjectGroups(res.data);
        }).catch(err => alert('error get subject group by subject Id'))
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
                getMajorRegister()
            }).catch((err) => console.log(err))
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
                            <ListBoostrapComponent
                                columns={['Thứ', 'Ngày bắt đầu', 'Ngày kết thúc', 'Thời gian']}
                                rows={subjectGroup.times.length != 0 ? subjectGroup.times.map(time => {
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
                    />), subjectGroup.groupName, subjectGroup.numberOfStudent + '/' + subjectGroup.numberOfStudentCurrent, (subjectGroup.teacher != null ? subjectGroup.teacher.fullName : ''),
                    (<Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        value={subjectGroup.id}
                        disabled={cookieSubject != null && cookieSubject.includes(subjectGroup.subject.id + '') || subjectGroup.numberOfStudent === subjectGroup.numberOfStudentCurrent}
                        checked={cookiesSubjectGroup != null && cookiesSubjectGroup.includes(subjectGroup.id + '')}
                        onClick={(e) => {
                            registerSubject(e.target.value);
                        }}
                    />))
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
                getMajorRegister();
            }).catch(err => alert("you catch error when delete register"))
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
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        value={register.id}
                        onClick={(e) => {
                            deleteRegister(e.target.value);
                        }}
                    />)

            )
        })
    }
    const rows2 = getRowsRegister(majorRegister != null && majorRegister.registerDTOS != null ? majorRegister.registerDTOS : []);
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
                            function={(e) => getAllGroupSubjectBySubjectId(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <ListMuiComponent
                            title='Danh sách các môn học'
                            columns={columns1}
                            rows={rows1}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <ListMuiComponent
                            title="Đăng ký thành công"
                            columns={columns2}
                            rows={rows2}
                        />
                    </div>
                </div>
            ) : (<div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control text-center"
                    value={"Thời gian đăng ký chưa có!"}
                    disabled
                />
            </div>)}

        </div>
    )
}

export default RegisterSubjectComponent;