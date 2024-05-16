
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MajorService from '../../services/MajorService';
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import RegisterSubjectForMajorComponent from '../major/RegisterSubjectForMajorComponent';

const ListMajorComponent = () => {
    const [majors, setMajors] = useState([]);
    const [check, setCheck] = useState(true);
    const [ids, setIds] = useState([]);



    const getAllMajor = () => {
        MajorService.getAllMajors().then(res => {
            setMajors(res.data);
        }).catch(err => { console.error(err); });
    }

    useEffect(() => {
        getAllMajor();
    }, [])

    console.log(majors)

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
                                <button style={{border:'none', marginBottom:'15px', padding:'0 0'}}>
                                    <DialogMuiComponent
                                nameAction="Đăng ký môn học cho chuyên ngành"
                                number={2}
                                nameSomething={"Đăng ký môn học:"}
                                interface={<RegisterSubjectForMajorComponent majorName={major.name} majorId={major.id}/>}
                            /></button>
                            }
                            columns={['Khóa học', 'Năm học','Kỳ học', 'Môn học', 'Xóa']}
                            rows={major.majorRegisterDTOS.map(majorRegister => {
                                return majorRegister.subjectDTOS.map(subject => {
                                    return (
                                        <tr key={major.id + subject.id}>
                                            <td>{majorRegister.seasonDTO.courses.name} - {majorRegister.seasonDTO.courses.code}</td>
                                            <td>{majorRegister.seasonDTO.schoolYear.name}</td>
                                            <td>{majorRegister.seasonDTO.semester.semesterName}</td>
                                            <td>{subject.subjectName}</td>
                                            <td><button>Xóa</button></td>
                                        </tr>
                                    )
                                })
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
        title = "Danh sách các ngành học"
        rows = {rows}
        columns = {columns}
    />
    )
}
export default ListMajorComponent;