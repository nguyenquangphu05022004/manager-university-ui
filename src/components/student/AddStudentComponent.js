import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import MajorService from "../../services/MajorService"
import StudentService from "../../services/StudentService";
const AddStudentComponent = () => {
    const [studentId, setStudentId] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthOfDate, setBirthOfDate] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [majorId, setMajorId] = useState('');
    const [majors, setMajors] = useState([]);
    const navigate = useNavigate();
    const select = useState(false);
    const { id } = useParams();

    const saveOrUpdateStudent = (e) => {
        e.preventDefault();
        const student = {
            studentId, fullName, birthOfDate, address,
            email, phoneNumber, majorId
        }
        if (id) {
            StudentService.updateStudent(student, id)
                .then((res) => {
                    console.log(res.data)
                    navigate('/students');
                })
                .catch((err) => { console.log(err.message) });
        } else {
            StudentService.createStudent(student)
                .then((res) => {
                    console.log(res.data)
                    navigate('/students');
                })
                .catch((err) => { console.log(err.message) });
        }
    }





    useEffect(() => {

        StudentService.getStudentById(id)
            .then(res => {
                const student = res.data;
                setStudentId(student.studentId);
                setFullName(student.fullName);
                setBirthOfDate(student.birthOfDate);
                setAddress(student.address);
                setEmail(student.email);
                setPhoneNumber(student.phoneNumber);
                setMajorId(student.majorId);
            }).catch(err => console.error(err));



        MajorService.getAllMajors().then(res => {
            setMajors(res.data);
        }).catch(err => console.error(err))
    }, [])


    const title = () => {
        if (id) {
            return <h2 className="text-center">Sửa thông tin sinh viên</h2>
        } else {
            return <h2 className="text-center">Thêm sinh viên</h2>
        }
    }



    return (
        <div>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {title()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Mã sinh viên:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Mã sinh viên"
                                        name="studentId"
                                        className="form-control"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Họ và tên:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Họ và tên"
                                        name="studentId"
                                        className="form-control"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Ngày tháng năm sinh:
                                    </label>
                                    <input
                                        type="date"
                                        placeholder="Ngày tháng năm sinh"
                                        name="studentId"
                                        className="form-control"
                                        value={birthOfDate}
                                        onChange={(e) => { setBirthOfDate(e.target.value); }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Địa chỉ:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ"
                                        name="address"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Số điện thoại:
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Chuyên ngành:
                                    </label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                            setMajorId(e.target.value);
                                            console.log(e.target.value);
                                        }}
                                        
                                    >
                                        <option value={null}>Chọn chuyên ngành của bạn</option>
                                        {
                                            majors.map((major) => {
                                                return (
                                                    <option
                                                        key={major.id}
                                                        value={major.id}
                                                        selected={majorId === major.id ? true : false}
                                                    >
                                                        {major.name}
                                                    </option>
                                                )

                                            })
                                        }
                                    </select>
                                </div>
                                {id ? <button className="btn btn-success" onClick={(e) => saveOrUpdateStudent(e)}>Sửa thông tin sinh viên</button>
                                    : <button className="btn btn-success" onClick={(e) => saveOrUpdateStudent(e)}>Thêm sinh viên</button>}
                                <Link to="/students" className="btn btn-danger">Hủy bỏ</Link>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default AddStudentComponent
