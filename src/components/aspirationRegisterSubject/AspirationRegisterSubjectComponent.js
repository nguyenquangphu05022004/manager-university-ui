import React, { useEffect, useState } from 'react';
import AspirationOfStudentService from '../../services/AspirationOfStudentService';
import SubjectService from '../../services/SubjectService';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import ListMuiComponent from '../GenericComponent/ListMuiComponent';
import Spinner from '../GenericComponent/Spinner'

import Util from '../../utils/Util';

var openSpinner = true
function AspirationRegisterSubjectComponent() {
    const [subjects, setSubjects] = useState([])
    const [studentCode, setStudentCode] = useState('')
    const [subjectCode, setSubjectCode] = useState('')
    const [aspirations, setAspirations] = useState([])
    document.title = "Đăng ký nguyện vọng"
    useEffect(() => {
        AspirationOfStudentService.getListAspirationOfStudent(Util.getProfile().id)
            .then(res => {
                console.log(res)
                setAspirations(res.data)
                openSpinner = false;
            }).catch((err) => {
                openSpinner = false
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
        }
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

    const rowAspiration = aspirations.length > 0 ? aspirations.map(aspiration => {
        return createDataSubject(aspiration.subject.subjectCode, aspiration.subject.subjectName,
            aspiration.subject.credit)
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
                <ListMuiComponent
                    title={"Nguyện vọng đã đăng ký"}
                    rows={rowAspiration}
                    columns={columns1}
                />
            </div>
        </div>
    )
}

export default AspirationRegisterSubjectComponent;