import React, { useEffect, useState } from 'react';
import AspirationOfStudentService from '../../services/AspirationOfStudentService';
import SubjectService from '../../services/SubjectService';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import ListMuiComponent from '../GenericComponent/ListMuiComponent';
import Spinner from '../GenericComponent/Spinner'

import Util from '../../utils/Util';
import SelectMuiComponent from '../GenericComponent/SelectMuiComponent';
import Process from '../GenericComponent/Process';
import AspirationRegisterService from '../../services/AspirationRegisterService';

function AspirationRegisterSubjectComponent() {
    const [subjects, setSubjects] = useState([])
    const [subjectCode, setSubjectCode] = useState('')
    const [aspirations, setAspirations] = useState([])
    const [openSpinner, setOpenSpinner] = useState(true)
    const [openProcessAspi, setOpenProcessAspi] = useState(false);
    const [aspirationRegisters, setAspirationRegisters] = useState([])
    const [aspirationRegistersIndex, setAspirationRegistersIndex] = useState(0)
    document.title = "Đăng ký nguyện vọng"
    useEffect(() => {
        AspirationRegisterService.getListAspirationRegisters()
            .then(res => {
                console.log("aspiration: ",res.data)
                setAspirationRegisters(res.data);
                if(res.data.length > 0) {
                    AspirationOfStudentService.getListByAspirationRegisterIdAndStudentId(res.data[0].id, Util.getProfile().id)
                    .then(response => setAspirations(response.data))
                    .catch(err => console.log(err))
                }
                setOpenSpinner(false)
            }).catch(err => {
                setOpenSpinner(false)
                console.log(err)
            })
        SubjectService.getAllSubjects()
            .then(res => setSubjects(res.data))
    }, [])
    const getAllAspirationOfStudentByAspirationRegister = (aspirationRegistersIndex) => {
        setAspirationRegistersIndex(aspirationRegistersIndex)
        setOpenProcessAspi(true)
        AspirationOfStudentService.getListByAspirationRegisterIdAndStudentId(aspirationRegisters[aspirationRegistersIndex].id, Util.getProfile().id)
            .then(res => {
                setOpenProcessAspi(false)
                setAspirations(res.data);
            }).catch(err => {
                setOpenProcessAspi(false)
            })
    }

    const handleRegisterAspiration = () => {
        const aspirationRequest = {
            "subjectCode": subjectCode,
            "aspirationRegisterId": aspirationRegisters[aspirationRegistersIndex].id
        }
        AspirationOfStudentService.createAspiration(aspirationRequest)
            .then(() => {
                getAllAspirationOfStudentByAspirationRegister(aspirationRegistersIndex)
            }).catch(() => {
                alert("Mã môn không hợp lệ hoặc bạn đã đăng ký nguyện vọng!!!")
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
        return { seasonExtra, subjectCode, subjectName, credit, status }
    }
    const rowAspiration = aspirations.length > 0 ? aspirations.map(aspiration => {
        return createDataAspiration(aspiration.aspirationRegister.season.nameSeason, aspiration.subject.subjectCode, aspiration.subject.subjectName,
            aspiration.subject.credit, aspiration.approval ? <h6 style={{ color: 'green' }}>Đã được duyệt để mở lớp</h6> : <h6 style={{ color: 'red' }}>Chưa được duyệt để mở lớp</h6>)
    }) : []
    if (openSpinner) {
        return <Spinner />
    }
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
            <h4 className='mb-4' style={{ color: 'black' }}>Thời gian đăng ký: { aspirationRegisters[aspirationRegistersIndex].openRegister ? aspirationRegisters[aspirationRegistersIndex].formatStart + ' đến ' + aspirationRegisters[aspirationRegistersIndex].formatEnd : 'Chưa có thời gian'}.</h4>
            <div className='form-group mb-3'>
                <SelectMuiComponent
                    title="Chọn mùa học"
                    type={"ASPIRATION-REGISTER"}
                    data={aspirationRegisters}
                    width={'100%'}
                    defaultValue={0}
                    function={(e) => { getAllAspirationOfStudentByAspirationRegister(e.target.value) }}
                />
            </div>
            {aspirationRegisters[aspirationRegistersIndex].openRegister ? (<div>
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
            </div>) : ''}
            <div className="form-group mb-3">
                <div className='mb-3'>
                    {openProcessAspi && <Process />}
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