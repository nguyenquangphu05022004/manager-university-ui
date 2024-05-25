import React, { useEffect, useState } from 'react';
import AspirationOfStudentService from '../../services/AspirationOfStudentService';
import SubjectService from '../../services/SubjectService';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import ListMuiComponent from '../GenericComponent/ListMuiComponent';
import Spinner from '../GenericComponent/Spinner'

import Util from '../../utils/Util';
import SeasonService from '../../services/SeasonService';
import SelectMuiComponent from '../GenericComponent/SelectMuiComponent';
import Process from '../GenericComponent/Process';


function AspirationRegisterSubjectComponent() {
    const [subjects, setSubjects] = useState([])
    const [studentCode, setStudentCode] = useState('')
    const [subjectCode, setSubjectCode] = useState('')
    const [aspirations, setAspirations] = useState([])
    const [seasons, setSeasons] = useState([])
    const [openSpinner, setOpenSpinner] = useState(true)
    const [openProcessAspi, setOpenProcessAspi] = useState(false);
    document.title = "Đăng ký nguyện vọng"
    useEffect(() => {
        SeasonService.getAllSeasonExtra()
            .then(res => {
                setSeasons(res.data);
                if (res.data.length > 0) {
                    setOpenProcessAspi(true)
                    AspirationOfStudentService.getListAspirationBySeasonIdAndStudentId(res.data[0].id, Util.getProfile().id)
                        .then(res => {
                            setOpenProcessAspi(false)
                            setAspirations(res.data);
                        }).catch(err => {
                            setOpenProcessAspi(false)
                        })
                }
                setOpenSpinner(false)
            }).catch(err => {
                setOpenSpinner(false)
                console.log(err)
            })
        SubjectService.getAllSubjects()
            .then(res => setSubjects(res.data))
    }, [])


    const handleRegisterAspiration = () => {
        const aspirationRequest = {
            "studentCode": studentCode,
            "subjectCode": subjectCode
        }
        AspirationOfStudentService.createAspiration(aspirationRequest)
            .then(() => {
                AspirationOfStudentService.getListAspirationOfStudent(Util.getProfile().id)
                    .then(res => {
                        setAspirations(res.data)
                    })
            }).catch(() => {
                alert("Mã sinh viên hoặc mã môn không hợp lệ!!!")
            })
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
        
    ];
    const createDataSubject = (subjectCode, subjectName, credit) => {
        return { subjectCode, subjectName, credit }
    }
    const getListSubject = (subjects) => {
        return subjects.map(subject => {
            return createDataSubject(subject.subjectCode, subject.subjectName,
                subject.credit)
        })
    }
    const rows1 = getListSubject(subjects);



    const colAspiration = [
        { id: 'seasonExtra', label: 'Học kỳ phụ', align: 'center', minWidth: 170 },
    
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
            id: 'status',
            label: 'Trạng thái',
            minWidth: 120,
            align: 'center',
        }
        
    ];
    const createDataAspiration = (seasonExtra, subjectCode, subjectName, credit, status) => {
        return {seasonExtra, subjectCode, subjectName, credit, status}
    }
    const rowAspiration = aspirations.length > 0 ? aspirations.map(aspiration => {
        return createDataAspiration(aspiration.season.nameSeason,aspiration.subject.subjectCode, aspiration.subject.subjectName,
            aspiration.subject.credit, aspiration.approval ? <h6 style={{color:'green'}}>Đã được duyệt để mở lớp</h6> :  <h6 style={{color:'red'}}>Chưa được duyệt để mở lớp</h6>)
    }) : []
    if (openSpinner) {
        return <Spinner />
    }

    console.log(aspirations)

    return (
        <div className='container'
            style={{
                marginTop: '50px'
            }}>
            <div className='form-group mb-3'> 
                <DialogMuiComponent
                    nameAction="Xem danh sách môn học"
                    nameSomething={'Môn học'}
                    number={1}
                    interface={
                        <ListMuiComponent
                            rows={rows1}
                            columns={columns1}
                        />
                    }
                />
            </div>
            <div className='form-group mb-3'>
                <SelectMuiComponent
                    title="Chọn mùa học"
                    type={"SEASON"}
                    data={seasons}
                    width={'100%'}
                    defaultValue={seasons[0].id}
                    function={(e) => {}}
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">
                    Mã sinh viên:
                </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setStudentCode(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">
                    Mã môn học:
                </label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setSubjectCode(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <button className='btn btn-primary w-100' onClick={handleRegisterAspiration}>Đăng ký nguyện vọng</button>
            </div>
            <div className="form-group mb-3">
                <div className='mb-3'>
                    {openProcessAspi && <Process/>}
                </div>
                <ListMuiComponent
                    title={"Nguyện vọng đã đăng ký"}
                    rows={rowAspiration}
                    columns={colAspiration}
                />
            </div>
        </div>
    )
}

export default AspirationRegisterSubjectComponent;