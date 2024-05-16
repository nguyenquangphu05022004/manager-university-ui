
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentSerivce from '../../services/StudentService'
import ListBoostrapComponent from '../GenericComponent/ListBoostrapComponent';
const ListStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [check, setCheck] = useState(true);
    const [ids, setIds] = useState([]);
    useEffect(() => {
        StudentSerivce.getAllStudents()
            .then(response => {
                setStudents(response.data);
            })
            .catch(err => console.error(err))
    }, [])

    const getAllStudents = () => {
        StudentSerivce.getAllStudents()
            .then(response => {
                setStudents(response.data);
            })
            .catch(err => console.error(err))
    }

    const handleDelete = (ids) => {
        StudentSerivce.deleteStudent(ids).then(() => {
            getAllStudents();
        }).catch(error => console.error(error))
    }

    const checkIds = (ids) => {
        if (ids.length === 0) {
            setCheck(true);
        }
        else {
            setCheck(false);
        }
    }

    const columns = ["Mã sinh viên", "Họ và tên", "Địa chỉ", "Cập nhật", (
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

    const rows = students.map(student => {
        return (
            <tr key={student.id}>
                <td> {student.username} </td>
                <td>{student.fullName}</td>
                <td>{student.address}</td>
                <td>
                    <Link className='btn btn-info' to={`/edit-student/${student.id}`}>Cập nhật</Link>
                </td>
                <td>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type={"checkbox"}
                            value={student.id}
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
        <div>
            <ListBoostrapComponent
                title="Danh sách sinh viên"
                rows={rows}
                columns={columns}
            />
            <Link to={"/add-student"} className="btn btn-primary mb-2">Add Student</Link>
        </div>

    )
}
export default ListStudentComponent;