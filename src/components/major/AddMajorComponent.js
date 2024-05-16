import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import MajorService from "../../services/MajorService"
const AddMajorComponent = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const saveOrUpdateMajor = (e) => {
        e.preventDefault();
        const major = {
            code, name
        }
        if (id) {
            MajorService.updateMajor(major, id)
                .then((res) => {
                    console.log(res.data)
                    navigate('/majors');
                })
                .catch((err) => { console.log(err.message) });
        } else {
            MajorService.createMajor(major)
                .then((res) => {
                    navigate('/majors');
                })
                .catch((err) => { console.log(err.message) });
        }
    }





    useEffect(() => {
        MajorService.getMajorById(id)
            .then(res => {
                const major = res.data;
                setCode(major.code);
                setName(major.name);
            }).catch(err => console.error(err));
    }, [])


    const title = () => {
        if (id) {
            return <h2 className="text-center">Sửa thông tin ngành học</h2>
        } else {
            return <h2 className="text-center">Thêm ngành học</h2>
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
                                        Mã ngành:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Mã ngành"
                                        name="code"
                                        className="form-control"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Tên ngành:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Tên ngành"
                                        name="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
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
export default AddMajorComponent
