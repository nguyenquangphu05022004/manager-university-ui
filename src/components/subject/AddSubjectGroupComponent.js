import React, { useEffect, useState } from "react"
import SubjectGroupService from "../../services/SubjectGroupService"
const AddSubjectGroupComponent = (props) => {
    const [groupName, setGroupName] = useState('')
    const [numberOfStudent, setNumberOfStudent] = useState(0)
    const handleSubmit = () => {
        const requestData = {
            "groupName": groupName,
            "subject": {
                "id": props.subjectId
            },
            "numberOfStudent": numberOfStudent
        }
        SubjectGroupService.createSubjectGroup(requestData)
        .then(() => window.location.reload())
        .catch(() => alert("Error create Subject Group"))
    }
    return (
        <div className="card-body">
                <div className="form-group mb-2">
                    <label className="form-label">
                        Tên môn học:
                    </label>
                    <input
                        type="text"
                        placeholder="Tên môn học"
                        className="form-control"
                        value={props.subjectName}
                        disabled
                    />
                </div>
                <div className="form-group mb-2">
                    <label className="form-label">
                        Tên nhóm:
                    </label>
                    <input
                        type="text"
                        placeholder="Tên nhóm học"
                        className="form-control"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                <div className="form-group mb-2">
                    <label className="form-label">
                        Số lượng sinh viên:
                    </label>
                    <input
                        type="number"
                        placeholder="Số lượng sinh viên"
                        className="form-control"
                        value={numberOfStudent}
                        onChange={(e) => setNumberOfStudent(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit} className="btn btn-success">Thêm</button>
        </div>

    )


}

export default AddSubjectGroupComponent