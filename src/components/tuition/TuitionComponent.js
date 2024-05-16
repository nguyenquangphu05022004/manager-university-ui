import React, { useEffect, useState } from "react";
import RegisterSubjectService from "../../services/RegisterSubjectService";
import ListBoostrapComponent from "../GenericComponent/ListBoostrapComponent"
import Util from "../../utils/Util";
import SeasonService from '../../services/SeasonService';
import DialogMuiComponent from '../GenericComponent/DialogMuiComponent'
import ListMuiComponent from "../GenericComponent/ListMuiComponent";
import MajorRegisterService from "../../services/MajorRegisterService";
import PaymentService from "../../payment/PaymentService";
function TuitionComponent() {

    const [majorRegisters, setMajorRegisters] = useState([])
    document.title = "Học phí"

    useEffect(() => {
        MajorRegisterService.getAllByStudentId(Util.getProfile().id)
            .then(res => setMajorRegisters(res.data))
            .catch((err) => console.log(err))
    }, [])


    console.log(majorRegisters)

    const columns = [
        { id: 'season', label: 'Mùa học', align: 'center', minWidth: 100 },
        { id: 'subjects', label: 'Xem các môn', align: 'center', minWidth: 170 },
        {
            id: 'totalCredit',
            label: 'Tổng số tín',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'creditPrice',
            label: 'Giá 1 tín',
            minWidth: 170,
            align: 'center',

        },
        {
            id: 'totalPrice',
            label: 'Số tiền',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'paid',
            label: 'Số tiền đã thanh toán',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'status',
            label: 'Trạng thái',
            minWidth: 170,
            align: 'center',
        },

    ];
    const createDataTuition = (season, subjects, totalCredit, creditPrice, totalPrice, paid, status) => {
        return { season, subjects, totalCredit, creditPrice, totalPrice, paid,status }
    }
    const handlePayment = (amount, content) => {
        PaymentService.redirectToPaymentPage(amount, content)
            .then(res => {
                window.open(res.data, "_blank")
            }).catch(err => alert("Xảy ra lỗi thanh toán"))
    }
    const rows = majorRegisters.map((majorRegister) => {
        return (
            createDataTuition(majorRegister.seasonDTO.nameSeason, (<DialogMuiComponent
                nameAction="Các môn học"
                nameSomething={'Thời gian học'}
                number={2}
                interface={
                    <ListBoostrapComponent
                        columns={['Tên môn', 'Mã môn', 'Số tín']}
                        rows={majorRegister.registerDTOS.length != 0 ? majorRegister.registerDTOS.map(register => {
                            return (
                                <tr>
                                    <td>{register.subjectGroup.subject.subjectName}</td>
                                    <td>{register.subjectGroup.subject.subjectCode}</td>
                                    <td>{register.subjectGroup.subject.credit}</td>
                                </tr>
                            )
                        }) : []}
                    />

                }

            />), majorRegister.totalCreditOfStudent, majorRegister.tuitionDTO != null ? Util.formatNumber(majorRegister.tuitionDTO.moneyPerCredit) : null,
                majorRegister.totalPrice != null ? Util.formatNumber(majorRegister.totalPrice) : null,
                majorRegister.paymentOfPerStudentAtCurrentSeason == null ? '0' : Util.formatNumber(majorRegister.paymentOfPerStudentAtCurrentSeason.amountPaid),
                majorRegister.paymentOfPerStudentAtCurrentSeason == null || majorRegister.paymentOfPerStudentAtCurrentSeason.complete == false ? (<button className="btn btn-primary" onClick={() => { handlePayment(majorRegister.totalPrice, Util.getProfile().id + " " + majorRegister.id)}}>Thanh toán</button>) : "Thanh toán đầy đủ")
        )
    })
    return (
        <div className='container'
            style={{
                marginTop: '30px'
            }}>
                <div  className="table">
                <table className="table-bordered border-primary">
                    <thead>
                        <tr>
                            <td colSpan={'2'}><h3>Thẻ test</h3></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ngân hàng</td>
                            <td><h5>NCB</h5></td>
                        </tr>
                        <tr>
                            <td>Số thẻ</td>
                            <td><h5>9704198526191432198</h5></td>
                        </tr>
                        <tr>
                            <td>Tên chủ thẻ</td>
                            <td><h5>NGUYEN VAN A</h5></td>
                        </tr>
                        <tr>
                            <td>Ngày phát hành</td>
                            <td><h5>07/15</h5></td>
                        </tr>
                        <tr>
                            <td>Mật khẩu OTP</td>
                            <td><h5>123456</h5></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <ListMuiComponent
                    title="Học phí"
                    columns={columns}
                    rows={rows}
                />
            </div>
    )
}

export default TuitionComponent;