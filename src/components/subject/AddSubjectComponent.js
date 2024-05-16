import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import MajorService from "../../services/MajorService"
import SubjectService from "../../services/SubjectService";

const AddSubjectComponent = () => {


    const [subjectName, setSubjectName] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [groupSubject, setGroupSubject] = useState('');
    const [timeFrame, setTimeFrame] = useState('');
    const [majorCode, setMajorCode] = useState([]);
    const [credit, setCredit] = useState('');
    const [majors, setMajors] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const saveOrUpdateMajor = (e) => {
        e.preventDefault();
        const major = {
            subjectName, subjectId,
            startDate,endDate, groupSubject,
            timeFrame, majorCode, credit
        }
        if (id) {
            SubjectService.updateSubject(major, id)
                .then((res) => {
                    navigate('/subjects');
                })
                .catch((err) => { console.log(err.message) });
        } else {
            SubjectService.createSubject(major)
                .then((res) => {
                    navigate('/subjects');
                })
                .catch((err) => { console.log(err.message) });
        }
    }





    useEffect(() => {
        MajorService.getAllMajors()
            .then(res => {
                setMajors(res.data);
                
            }).catch(err => console.error(err));
    }, [])


    const title = () => {
        if (id) {
            return <h2 className="text-center">Sửa thông tin môn học</h2>
        } else {
            return <h2 className="text-center">Thêm môn học học</h2>
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
                                       Mã môn học:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Mã môn học"
                                        className="form-control"
                                        value={subjectId}
                                        onChange={(e) => setSubjectId(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Tên môn học:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Tên môn học"
                                        className="form-control"
                                        value={subjectName}
                                        onChange={(e) => setSubjectName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Ngày bắt đầu:
                                    </label>
                                    <input
                                        type="date"
                                        placeholder="Ngày bắt đầu"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Ngày kết thúc:
                                    </label>
                                    <input
                                        type="date"
                                        placeholder="Ngày kết thúc"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Thời gian học:
                                    </label>
                                    <input
                                        type="time"
                                        placeholder="Thời gian học"
                                        className="form-control"
                                        value={timeFrame}
                                        onChange={(e) => setTimeFrame(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Số tín chỉ:
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Ngày bắt đầu"
                                        className="form-control"
                                        value={credit}
                                        onChange={(e) => setCredit(e.target.value)}
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
                                            console.log(e.target.value);
                                        }}
                                        multiple
                                    >
                                        <option value={null}>Chọn chuyên ngành môn học</option>
                                        {
                                            majors.map((major) => {
                                                return (
                                                    <option
                                                        key={major.id}
                                                        value={major.code}
                                                        selected = {majorCode.includes(major.code)}
                                                    >
                                                        {major.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                
                                {id ? <button className="btn btn-success" onClick={(e) => saveOrUpdateMajor(e)}>Sửa thông tin sinh viên</button>
                                    : <button className="btn btn-success" onClick={(e) => saveOrUpdateMajor(e)}>Thêm sinh viên</button>}
                                <Link to="/majors" className="btn btn-danger">Hủy bỏ</Link>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )


}

export default AddSubjectComponent