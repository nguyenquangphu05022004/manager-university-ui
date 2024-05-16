import { useEffect, useState } from "react"
import SelectMuiComponent from "../GenericComponent/SelectMuiComponent";
import SelectMultipleMUIComponent from "../GenericComponent/SelectMultipleMUIComponent";
import MajorService from "../../services/MajorService";
import SeasonService from "../../services/SeasonService";
import EventRegisterService from "../../services/EventRegisterService";
function EventRegister() {
    const [seasons, setSeasons] = useState([])
    const [dateTime, setDateTime] = useState('');
    const [intervalDay, setIntervalDay] = useState('');
    const [majors, setMajors] = useState([])
    const [infoMajors, setInfoMajors] = useState('');
    const [seasonId, setSeasonId] = useState('')
    const [eventName, setEventName] = useState('')
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
            return {
                "id": info.substring(info.lastIndexOf("_") + 1)
            }
        })
        const requestData = {
            "eventName": eventName,
            "start": dateTime,
            "intervalDay": intervalDay,
            "seasonDTO" : {
                "id": seasonId
            },
            "majorDTOS": majorIds
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
                        <h4 className="text-center mt-3">Event Register Subject</h4>
                        <div className="card-body">
                        <div className="form-group mb-2">
                                <label className="form-label">
                                    Tên sự kiện:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={eventName}
                                    onChange={(e) => {
                                        setEventName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">
                                    Thời gian bắt đầu:
                                </label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={dateTime}
                                    onChange={(e) => {
                                        setDateTime(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">
                                    Thời gian hết hạn(Tính theo ngày):
                                </label>
                                <input
                                    type="number"
                                    placeholder="Ví dụ: hết hạn sau 5 ngày kể từ thời gian bắt đầu"
                                    className="form-control"
                                    value={intervalDay}
                                    onChange={(e) => {
                                        setIntervalDay(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <SelectMuiComponent
                                    type={"SEASON"}
                                    data={seasons}
                                    width="100%"
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
