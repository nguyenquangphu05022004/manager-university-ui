
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MajorService from '../../services/MajorService';
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import RegisterSubjectForMajorComponent from '../major/RegisterSubjectForMajorComponent';
import SubjectService from '../../services/SubjectService';
import SelectMuiComponent from '../GenericComponent/SelectMuiComponent';
import MajorRegisterService from '../../services/MajorRegisterService';

const ListMajorComponent = () => {
    const [majors, setMajors] = useState([]);
    const [check, setCheck] = useState(true);
    const [ids, setIds] = useState([]);
    const [subjects, setSubjects] = useState([])
    const [subjectId, setSubjectId] = useState('')

    const getAllMajor = () => {
        MajorService.getAllMajors().then(res => {
            setMajors(res.data);
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getAllMajor();
        SubjectService.getAllSubjects()
            .then(res => setSubjects(res.data))
    }, [])

    const updateSubject = (majorRegisterId, subjectId, actionType) => {
        MajorRegisterService.updateSubject(majorRegisterId, subjectId, actionType)
            .then(() => {
               if(actionType) {
                 alert("Add successfully")
               } else {
                alert("Delete successfully")
               }
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (ids) => {
        MajorService.deleteMajor(ids).then(() => {
            getAllMajor();
        }).catch(err => { console.error(err); });
    }

    const checkIds = (ids) => {
        if (ids.length === 0) {
            setCheck(true);
        }
        else {
            setCheck(false);
        }
        console.log(check)
    }

    const columns = ["Tên ngành", "Viết tắt", 'Môn học theo kỳ', "Cập nhật", (
        <button
            className='btn btn-info'
            onClick={() => {
                handleDelete(ids);
                setCheck(true);
                setIds([])
            }}
            disabled={check}
        >Xóa</button>
    )]
    const rows = majors.map(major => {
        return (
            <tr key={major.id}>
                <td>
                    {major.name}
                </td>
                <td>
                    {major.sub}
                </td>
                <td>
                    <DialogMuiComponent nameAction="Môn học"
                        nameSomething={major.name}
                        number={1}
                        interface={
                            <ListBoostrapComponent
                                actionAdd={
                                    <button style={{ border: 'none', marginBottom: '15px', padding: '0 0' }}>
                                        <DialogMuiComponent
                                            nameAction="Đăng ký môn học cho chuyên ngành"
                                            number={2}
                                            nameSomething={"Đăng ký môn học:"}
                                            interface={<RegisterSubjectForMajorComponent majorName={major.name} majorId={major.id} />}
                                        /></button>
                                }
                                columns={['Mùa học', , 'Môn học']}
                                rows={major.majorRegisterDTOS.map(majorRegister => {
                                    return (
                                        <tr>
                                            <td>{majorRegister.seasonDTO.fullNameSeason}</td>
                                            <td>
                                                <DialogMuiComponent
                                                    nameAction="Xem chi tiết"
                                                    number={4}
                                                    nameSomething={<div>
                                                        <h4>{majorRegister.seasonDTO.fullNameSeason + ' ngành ' + major.name}</h4>
                                                        <DialogMuiComponent
                                                            nameAction="Thêm môn học"
                                                            number={5}
                                                            nameSomething={'Môn học'}
                                                            interface={
                                                                <div className='card'>
                                                                    <div className=' mb-3'>
                                                                        <SelectMuiComponent
                                                                            title="Chọn môn học"
                                                                            type={"SUBJECT"}
                                                                            data={subjects}
                                                                            width={'100%'}
                                                                            function={(e) => setSubjectId(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className=' mb-3'>
                                                                        <button className='btn btn-primary w-100' onClick={() => updateSubject(majorRegister.id,subjectId, true)}>Thêm</button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        />
                                                    </div>}
                                                    interface={
                                                        <ListBoostrapComponent
                                                            columns={['Mã môn học', 'Tên môn học', 'Số tín chỉ', "Xóa môn học"]}
                                                            rows={majorRegister.subjectDTOS.length > 0 ?
                                                                majorRegister.subjectDTOS.map((subject) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{subject.subjectCode}</td>
                                                                            <td>{subject.subjectName}</td>
                                                                            <td>{subject.credit}</td>
                                                                            <td><button className='w-100 btn btn-primary' onClick={() => updateSubject(majorRegister.id,subject.id, false)}>Xóa</button></td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                : []}
                                                        />
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                            />
                        }
                    />
                </td>
                <td>
                    <Link className='btn btn-info' to={`/edit-major/${major.id}`}>Cập nhật</Link>
                </td>
                <td>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type={"checkbox"}
                            value={major.id}
                            onChange={(e) => {
                                if (ids.includes(Number(e.target.value))) {
                                    for (let i = 0; i < ids.length; i++) {
                                        if (ids[i] === Number(e.target.value)) {
                                            ids.splice(i, 1);
                                            break;
                                        }
                                    }
                                } else {
                                    ids.push(Number(e.target.value));
                                }
                                setIds(ids);
                                checkIds(ids);
                            }}

                        />
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <ListBoostrapComponent
            title="Danh sách các ngành học"
            rows={rows}
            columns={columns}
        />
    )
}
export default ListMajorComponent;