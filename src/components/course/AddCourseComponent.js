import { useState } from "react"
import CourseService from "../../services/CourseService";
import {Link, useNavigate} from "react-router-dom";
function AddCourseComponent() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const negative = useNavigate();
    const addCourse = () => {
        const course = {
            name, code
        }
        CourseService.addCourse(course).then((res) => {
            negative("/admin/courses")
        }).catch((err) => { alert(err.status) })
    }
    return (
        <div>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {/* {title()} */}
                        <div className="card-body">
                            <form method="post">
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Khóa sinh viên:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ví dụ: 2023-2024"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Mã khóa sinh viên:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ví dụ: D22"
                                        className="form-control"
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value);
                                        }}
                                    />
                                </div>
                                <button onClick={addCourse} className="btn btn-success">Đăng ký</button>
                                <Link to="/admin/courses" className="btn btn-danger">Hủy bỏ</Link>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default AddCourseComponent;
