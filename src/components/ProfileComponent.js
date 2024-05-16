import React, { useEffect, useState } from "react";
import Util from "../utils/Util";
import DialogMuiComponent from '../components/GenericComponent/DialogMuiComponent'
import SelectMuiComponent from "./GenericComponent/SelectMuiComponent";
import SeasonService from "../services/SeasonService";
import MajorRegisterService from "../services/MajorRegisterService";
import Role from "../constant/Role";
import FileStorageService from "../services/FileStorageService";
import Token from "../services/Token";
const profile  = Token.info;
const imageUrl = profile != null && profile.avatarResponse != null ? profile.avatarResponse.url : '';
function ProfileComponent() {
    const [setting, setSetting] = useState(true)
    const [action, setAction] = useState("Sửa thông tin")
    const [seasons, setSeasons] = useState([])
    const [file, setFile] = useState({})
    const [img, setImg] = useState();
    const [changeAvatar, setChangeAvatar] = useState(true);

    useEffect(() => {
        fetchImage();
        SeasonService.getAllByCoursesId(Util.getProfile().courses.id)
        .then(res => setSeasons(res.data))
        .catch(err => console.log(err))
    }, [])


    const handleAction = () => {
        if (action === "Sửa thông tin") {
            setAction("Lưu thông tin")
            setSetting(false);
        } else {
            setAction("Sửa thông tin")
            setSetting(true);
        }
    }
    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
      };
    const handleSelectSeason = (seasonId) => {
        
    }
    const onChangeFileHandler = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);
    }
    const handleSubmitChangeFile = () => {
        const formData = new FormData();
        formData.append("file", file);
        FileStorageService.uploads(formData)
        .then(res => {
            profile.avatarResponse = res.data;
            window.localStorage.setItem('data', JSON.stringify(profile))
            window.location.reload();
        }).catch(err => console.log(err))
    }
    const handleChangeAvatar = () => {
        setChangeAvatar(!changeAvatar)
    }
    document.title = "Thông tin cá nhân";
  
        return (
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-5 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="200px" height={'200px'}
                                src={img} />
                            <span className="font-weight-bold">{profile.person.fullName}({profile.role})</span>
                            <span className="text-black-50">{profile.person.email}</span><span> </span>
                            {profile.role === Role.STUDENT && (
                                <div className="mt-4">
                                <DialogMuiComponent
                                    nameAction="Tiến trình học tập"
                                    nameSomething={
                                        <SelectMuiComponent
                                            title="Học kỳ"
                                            type={"SEASON"}
                                            data={seasons}
                                            width={'100%'}
                                            function={(e) => handleSelectSeason(e.target.value)}
                                        />
                                    }
                                    number={3}
                                    interface={null}
                                />
                            </div>
                            )}
                            <div  className="mt-4">
                                <input
                                    type="file"
                                    className="form-control"
                                    name="file"
                                    onChange={onChangeFileHandler}
                                />
                                <button disabled={!changeAvatar} className="mt-4 btn btn-primary w-100" onClick={handleChangeAvatar}>Thay đổi</button>
                                <button disabled={changeAvatar} className="mt-4 btn btn-primary w-100" onClick={handleSubmitChangeFile}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 border-right">
                        <div className="p-3 py-5">
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Số điện thoại</label>
                                    <input type="text" className="form-control" placeholder="Số điện thoại" value={profile.person.phoneNumber} disabled={setting} />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Địa chỉ</label>
                                    <input type="text" className="form-control" placeholder="Địa chỉ" value={profile.person.address} disabled={setting} />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Email</label>
                                    <input type="text" className="form-control" placeholder="Email" value={profile.person.email} disabled={setting} />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Đại học</label>
                                    <input type="text" className="form-control" placeholder="Đại học" value="Học viện công nghệ Bưu chính Viễn Thông" disabled />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Khóa học</label>
                                    <input type="text" className="form-control" placeholder="Khóa học" value={profile.person.courses != null ? profile.person.courses.name : ''} disabled />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label className="labels">Quốc gia</label>
                                    <input type="text" className="form-control" placeholder="Quốc gia" value="Việt Nam" disabled />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Tỉnh</label>
                                    <input type="text" className="form-control" value="" placeholder="Bắc Ninh" disabled />
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <button className="btn btn-primary" type="button" onClick={() => { handleAction() }}>{action}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}
export default ProfileComponent;