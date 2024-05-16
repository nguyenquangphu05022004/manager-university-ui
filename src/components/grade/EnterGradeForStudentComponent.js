import React, { useEffect, useState } from "react";
import GradeService from "../../services/GradeService";
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import ListMuiComponent from '../GenericComponent/ListMuiComponent'
function EnterGradeForStudentComponent(params) {
    const [subjectCode, setSubjectCode] = useState('')
    const [studentCode, setStudentCode] = useState('')
    const [gradeComponentId, setGradeComponentId] = useState('')
    const [components, setComponents] = useState([])
    const [attend, setAttend] = useState('0')
    const [midtermTest, setMidtermTest] = useState('0')
    const [finalTest, setFinalTest] = useState('0')
    const [practiceTest, setPracticeTest] = useState('0')
    document.title = "Nhập điểm"

    useEffect(() => {
        GradeService.getListComponentGrade()
        .then(res => setComponents(res.data))
        .catch(err => console.log(err))
    }, [])

    const columns = [
        { id: 'attend', label: 'Chuyên cần', align: 'center', minWidth: 170 },
        { id: 'practice', label: 'Bài tập/Thực hành', align: 'center', minWidth: 170 },
        {
            id: 'midterm',
            label: 'Giữa kỳ',
            minWidth: 170,
            align: 'center'
        },
        {
            id: 'final',
            label: 'Cuối kỳ',
            minWidth: 170,
            align: 'center'
        }
    ];
    const createDataComponent = (attend, practice, midterm, final) => {
        return {attend, practice, midterm, final}
    }
    const rows = components.map(com => {
        return createDataComponent(com.attend, com.practiceTest, com.midtermTest, com.finalTest)
    })
    const handleSubmit = () => {
        const requestData = {
            "attend": attend,
            "midtermTest": midtermTest,
            "finalTest": finalTest,
            "practiceTest": practiceTest,
            "componentGrade": {
                "id": gradeComponentId
            }
        }
        GradeService.submitEnterGrade(studentCode, subjectCode, requestData)
        .then(() => {
            alert("Ok")
            window.location.reload();
        }).catch(err => {
            alert("XẢY ra lỗi trong việc StudentCode sai hoặc SubjectCode sai hoặc nhập ĐIỂM sai")
        })
    }
    return (
        <div>
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <h3 className="text-center">Nhập điểm</h3>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                       Mã môn học:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Mã môn học"
                                        className="form-control"
                                        value={subjectCode}
                                        onChange={(e) => setSubjectCode(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                       Mã sinh viên:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Mã sinh viên"
                                        className="form-control"
                                        value={studentCode}
                                        onChange={(e) => setStudentCode(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                       Chọn điểm thành phần:
                                    </label>
                                    <div className="mb-3">
                                        <DialogMuiComponent
                                            nameAction="Bảng điểm thành phần"
                                            nameSomething={"Thành phần"}
                                            interface={
                                                <ListMuiComponent
                                                    columns={columns}
                                                    rows = {rows}
                                                />
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            type="text"
                                            className="form-control"    
                                            onChange={(e) => setGradeComponentId(e.target.value)}
                                        >
                                            <option value={null} >Chọn điểm thành phần</option>
                                            {components.map(component => {
                                                return (
                                                    <option value={component.id}>{component.details}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <h4>Chú ý:</h4>
                                    <p style={{color:"red"}}>Trong quá trình nhập điểm mà có thành phần bằng 0 thì nhập điểm của thành phần đó là 0</p>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                      Chuyên cần:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Chuyên cần"
                                        className="form-control"
                                        value={attend}
                                        onChange={(e) => setAttend(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="Bài tập">
                                      Bài tập:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Bài tập"
                                        className="form-control"
                                        value={practiceTest}
                                        onChange={(e) => setPracticeTest(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                      Giữa kỳ:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Giữa kỳ"
                                        className="form-control"
                                        value={midtermTest}
                                        onChange={(e) => setMidtermTest(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label">
                                      Cuối kỳ:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Cuối kỳ"
                                        className="form-control"
                                        value={finalTest}
                                        onChange={(e) => setFinalTest(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <button className="btn btn-primary" 
                                            style={{width:"100%"}}
                                            onClick={handleSubmit}
                                    >Gửi</button>
                                </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default EnterGradeForStudentComponent;