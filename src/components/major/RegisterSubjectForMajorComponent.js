import React, { useEffect, useState } from "react"
import SelectMultipleMUIComponent from "../GenericComponent/SelectMultipleMUIComponent";
import SelectMuiComponent from "../GenericComponent/SelectMuiComponent";
import SubjectService from "../../services/SubjectService";
import SeasonService from "../../services/SeasonService";
import MajorRegisterService from '../../services/MajorRegisterService'
function AddSubjectForMajorComponent(props) {
    const [seasons, setSeasons] = useState([])
    const [subjects, setSubjects] = useState([]);

    const [infoSubjects, setInfoSubjects] = useState('');
    const [seasonId, setSeasonId] = useState('')


    useEffect(() => {
        SeasonService.getAllSeasonByDisabled(false).then(res=> {
            setSeasons(res.data)
        }).catch(err => console.log(err))
        SubjectService.getAllSubjects().then(res=> {
            setSubjects(res.data);
        }).catch(err => console.log(err))
        
    }, [])



    const handleSubmit = () => {
        const ids = infoSubjects.map(info => {
            return {
                "id": info.substring(info.lastIndexOf("_") + 1)
            }
        })
        const requestData = {
            "majorDTO": {
                id: props.majorId
            },
            "seasonDTO": {
                "id": seasonId
            },
            "subjectDTOS": ids,
            
        }
        MajorRegisterService.registerSubejct(requestData)
        .then(res => {
            window.location.reload();
        }).catch(err => console.log(err))
    }
    return (
        <div className="card-body">
                <div className="form-group mb-3">
                    <label className="form-label">
                        Tên chuyên ngành:
                    </label>
                    <input
                        type="text"
                        placeholder="Tên môn học"
                        className="form-control"
                        value={props.majorName}
                        disabled
                    />
                </div>
                <div className="form-group mb-3">
                    <SelectMuiComponent
                        title="Mùa học"
                        width='100%'
                        data={seasons}
                        type="SEASON"
                        function = {(e) => setSeasonId(e.target.value)}
                    />
                </div>            
                <div className="form-group mb-3">
                    <SelectMultipleMUIComponent  
                    title="Môn học"
                    width='100%'
                    data={subjects}
                    type={'SUBJECT'}
                    changeName={(value) => {
                        setInfoSubjects(value)
                    }}
                    />
                </div>
                <button onClick={handleSubmit} className="btn btn-success">Thêm</button>
        </div>
    )
}

export default AddSubjectForMajorComponent;