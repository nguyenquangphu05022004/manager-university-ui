import { useEffect, useState } from "react"
import SelectMuiComponent from "../GenericComponent/SelectMuiComponent";
import SelectMultipleMUIComponent from "../GenericComponent/SelectMultipleMUIComponent";
import MajorService from "../../services/MajorService";
import SeasonService from "../../services/SeasonService";
import EventRegisterService from "../../services/EventRegisterService";
function EventRegister() {
    const [seasons, setSeasons] = useState([])
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [majors, setMajors] = useState([])
    const [infoMajors, setInfoMajors] = useState('');
    const [seasonId, setSeasonId] = useState('')
    useEffect(() => {
        SeasonService.getAllSeasonByDisabled(false)
            .then(res => setSeasons(res.data))
            .catch(err => console.log(err))
        MajorService.getAllMajors()
            .then(res => setMajors(res.data))
            .catch(err => console.log(err))
    }, [])
    const handleSelectSeasonId = (e) => {
        setSeasonId(e.target.value)
    }
    const handleCreateEvent = () => {
        const majorIds = infoMajors.map(info => {
            return info.substring(info.lastIndexOf("_") + 1)
        })
        const requestData = {
            "majorIds": majorIds,
            "seasonId": seasonId,
            "start": startTime,
            "end": endTime
        }
        console.log((requestData))
        console.log(JSON.stringify(requestData))
        EventRegisterService.createEventRegister(requestData)
            .then(res => {
                window.location.reload();
            }).catch(err => alert("Error create event"))
    }
    return (

        <div className="card col-md-6 offset-md-3 offset-md-3 mt-5">
            <h4 className="text-center mt-3">Tạo sự kiện đăng ký môn học</h4>
            <div className="card-body">
                <div className="form-group mb-2">
                    <label className="form-label">
                        Thời gian bắt đầu:
                    </label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={startTime}
                        onChange={(e) => {
                            setStartTime(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group mb-2">
                    <label className="form-label">
                        Thời gian kết thúc:
                    </label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={endTime}
                        onChange={(e) => {
                            setEndTime(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group mb-4">
                    <SelectMuiComponent
                        type={"SEASON"}
                        data={seasons}
                        width="100%"
                        choice={'FULL'}
                        title="Mùa học"
                        function={handleSelectSeasonId}
                    />
                </div>
                <div className="form-group mb-4">
                    <SelectMultipleMUIComponent
                        title="Chuyên ngành"
                        width='100%'
                        data={majors}
                        type={'MAJOR'}
                        changeName={(value) => {
                            setInfoMajors(value)
                        }}
                    />
                </div>
                <div className="form-group mb-2">
                    <button className="btn btn-primary w-100" onClick={handleCreateEvent}>Tạo</button>
                </div>
            </div>

        </div>
    )
}
export default EventRegister;
