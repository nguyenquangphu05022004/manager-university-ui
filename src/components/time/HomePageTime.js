import React, { useEffect, useState } from "react";
import TimeService from "../../services/TimeService";
function HomePageTime() {

    const [times, setTimes] = useState([])
    document.title = "Thời gian"

    useEffect(() => {
        TimeService.getAllTimes()
        .then(res => {
            console.log(res.data);
            setTimes(res.data)
        })
    }, [])


    // const columns = [
    //     { id: 'season', label: 'Mùa học', align: 'center',minWidth: 100 },
    //     { id: 'subjects', label: 'Xem các môn', align: 'center',minWidth: 170 },
    //     {
    //         id: 'totalCredit',
    //         label: 'Tổng số tín',
    //         minWidth: 170,
    //         align: 'center',
    //     },
    //     {
    //         id: 'creditPrice',
    //         label: 'Giá 1 tín',
    //         minWidth: 170,
    //         align: 'center',
            
    //     },
    //     {
    //         id: 'totalPrice',
    //         label: 'Số tiền',
    //         minWidth: 170,
    //         align: 'center',
    //     },
    //     {
    //         id: 'paid',
    //         label: 'Đã đóng',
    //         minWidth: 170,
    //         align: 'center',
    //     },
        
    // ];
    // const createDataTuition = (season, subjects, totalCredit, creditPrice, totalPrice, paid) => {
    //     return {season, subjects, totalCredit, creditPrice, totalPrice, paid}
    // }
    // const rows = majorRegisters.map((majorRegister) => {
    //    return (
    //     createDataTuition(majorRegister.seasonDTO.nameSeason,(<DialogMuiComponent
    //         nameAction="Các môn học"
    //         nameSomething={'Thời gian học'}
    //         number={2}
    //         interface = {
    //             <ListBoostrapComponent
    //             columns={['Tên môn', 'Mã môn','Số tín']}
    //             rows={majorRegister.registerDTOS.length != 0 ? majorRegister.registerDTOS.map(register => {
    //                 return (
    //                     <tr>
    //                         <td>{register.subjectGroup.subject.subjectName}</td>
    //                         <td>{register.subjectGroup.subject.subjectCode}</td>
    //                         <td>{register.subjectGroup.subject.credit}</td>
    //                     </tr>
    //                 )
    //             }) : []}
    //             />

    //         }
        
    //     />), majorRegister.totalCreditOfStudent, majorRegister.tuitionDTO != null ? Util.formatNumber(majorRegister.tuitionDTO.moneyPerCredit) : null,
    //     majorRegister.totalPrice != null ? Util.formatNumber(majorRegister.totalPrice) : null, "Chưa thanh toán")
    //    )
    // })
    // return (
    //     <div className='container'
    //         style={{
    //             marginTop: '30px'
    //         }}>
    //         <ListMuiComponent
    //             title="Học phí"
    //             columns={columns}
    //             rows={rows}
    //         />
    //     </div>
    // )
    return null;
}

export default HomePageTime;