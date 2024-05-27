import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timegrid from '@fullcalendar/timegrid'
import scrollgrid from '@fullcalendar/scrollgrid'

import { Tooltip } from 'bootstrap'
import RegisterSubjectService from '../services/RegisterSubjectService'

import Util from '../utils/Util'
import Role from '../constant/Role'
import TeacherService from '../services/TeacherService'
import Token from '../services/Token'
import Spinner from '../components/GenericComponent/Spinner';
import MajorRegisterService from '../services/MajorRegisterService'
import SeasonService from '../services/SeasonService'
import SelectMuiComponent from './GenericComponent/SelectMuiComponent'
import Process from './GenericComponent/Process'
var seasonId = null;

function FullCalendarComponent() {

  let tooltipInstance = null;
  const [registerOfStudents, setRegisterOfStudents] = useState([]);
  const [teacher, setTeacher] = useState(null)
  const [openSpinner, setOpenSpinner] = useState(true);
  const [majorRegister, setMajorRegister] = useState(null)
  const [seasons, setSeasons] = useState([])
  const [openProcessMajorRegister, setOpenProcessMajorRegister] = useState(false)

  document.title = "Thời khóa biểu"

  useEffect(() => {
    if (Token.info == null ? [] : Token.info.role === Role.ADMIN) {
      setOpenSpinner(false)
    }
    if (Token.info == null ? [] : Token.info.role === Role.STUDENT) {
      SeasonService.getAllByCoursesId(Util.getProfile().courses.id)
            .then(res => {
                setOpenSpinner(false)
                setSeasons(res.data)
                if (res.data.length > 0) {
                    seasonId = res.data[0].id
                    getMajorRegisterBySeasonIdAndStudentId(res.data[0].id, Util.getProfile().id)
                }
            })
            .catch(() => {
                setOpenSpinner(false)
                setSeasons([])
            })
    }
    if (Token.info == null ? [] : Token.info.role === Role.TEACHER) {
      TeacherService.findById(Util.getProfile().id)
        .then(res => {
          setOpenSpinner(false);
          setTeacher(res.data)
        })
        .catch(err => {
          setOpenSpinner(false);
          alert("error when get info teacher")
        })
    }
  }, [])



  const handleMouseEnter = (info) => {
    if (info.event.extendedProps.description) {
      tooltipInstance = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        html: true,
        placement: "top",
        trigger: "hover",
        container: "body"
      });

      tooltipInstance.show();
    }
  };

  const handleMouseLeave = (info) => {
    if (tooltipInstance) {
      tooltipInstance.dispose();
      tooltipInstance = null;
    }
  };

  const dataThoiKhoaBieu = []

  const text = null;
  if (teacher === null) {
    majorRegister != null && majorRegister.registerDTOS.length > 0 &&  majorRegister.registerDTOS.forEach((register) => {
      register.subjectGroup.times.forEach(time => {
        const data = {
          groupId: 'blueEvents', // recurrent events in this group move together
          daysOfWeek: [time.dayOfWeek],
          startTime: time.startTime,
          endTime: time.endTime,
          endRecur: time.endDate,
          startRecur: time.startDate,
          title: `${register.subjectGroup.subject.subjectName}*${register.subjectGroup.groupName}*${time.roomClass != null ? time.roomClass.name : ''}*${register.subjectGroup.teacher != null ? register.subjectGroup.teacher.fullName : ''}`,
          extendedProps: {
            description: `<div class='tool custom-tool-tip' role='tooltip'>
                              <div class='arrow'></div>
                            <div class='tooltip-inner'>Tên môn học: ${register.subjectGroup.subject.subjectName}
                            <div class='tooltip-inner'>Nhóm học: ${register.subjectGroup.groupName}
                            <div class='tooltip-inner'>Phòng học: ${time.roomClass != null ? time.roomClass.name : ''}
                            <div class='tooltip-inner'>Giảng viên: ${register.subjectGroup.teacher != null ? register.subjectGroup.teacher.fullName : ''}
                          </div></div>`
          }
        }
        dataThoiKhoaBieu.push(data)
      })
    })
  } else {
    teacher.subjectGroupDTOS.forEach((subjectGroup) => {
      subjectGroup.times.forEach(time => {
        const data = {
          groupId: 'blueEvents', // recurrent events in this group move together
          daysOfWeek: [time.dayOfWeek],
          startTime: time.startTime,
          endTime: time.endTime,
          endRecur: time.endDate,
          startRecur: time.startDate,
          title: `${subjectGroup.subject.subjectName}*${subjectGroup.groupName}*${time.roomClass != null ? time.roomClass.name : ''}`,
          extendedProps: {
            description: `<div class='tool custom-tool-tip' role='tooltip'>
                              <div class='arrow'></div>
                            <div class='tooltip-inner'>Tên môn học: ${subjectGroup.subject.subjectName}</div>
                            <div class='tooltip-inner'>Nhóm học: ${subjectGroup.groupName}</div>
                            <div class='tooltip-inner'>Phòng học: ${time.roomClass != null ? time.roomClass.name : ''}</div>
                            <div class='tooltip-inner'>Giảng viên: ${subjectGroup.teacher != null ? subjectGroup.teacher.fullName : ''}
                          </div>
                          </div>`
          }
        }
        dataThoiKhoaBieu.push(data)
      })
    })
  }
  const getMajorRegisterBySeasonIdAndStudentId = (seaId, studentId) => {
    setOpenProcessMajorRegister(true)
    MajorRegisterService.getBySeasonIdAndStudentId(seaId, studentId)
        .then(res => {
            seasonId = seaId;
            setOpenProcessMajorRegister(false)
            setMajorRegister(res.data)
        }).catch(err => {
            setMajorRegister(null)
            setOpenProcessMajorRegister(false)
        })

}
  const getSeason = () => {
    setSeasons([])
    SeasonService.getAllByCoursesId(Util.getProfile().courses.id)
      .then(res => {
        setSeasons(res.data)
        if (res.data.length > 0) {
          seasonId = res.data[0].id
          getMajorRegisterBySeasonIdAndStudentId(res.data[0].id, Util.getProfile().id)
        }
      })
      .catch(() => {
        setSeasons([])
      })
  }
  const getSeasonExtra = () => {
    setSeasons([])
    SeasonService.getListSeasonExtraByStudent(Util.getProfile().id)
      .then(res => {
        setSeasons(res.data);
        if (res.data.length > 0) {
          seasonId = res.data[0].id
          getMajorRegisterBySeasonIdAndStudentId(res.data[0].id, Util.getProfile().id)
        }
      }).catch(err => {
        console.log(err)
      })
  }
  const handleSelectSemester = (e) => {
    const select = e.target.value;
    if (select == 1) {
      getSeason();
    } else {
      getSeasonExtra();
    }
  }

  if (openSpinner) {
    return <Spinner />
  }

  function renderEventContent(eventInfo) {
    const data = eventInfo.event.title.split('*')
    return (
      <div>
        <a className='text-size'>Thời gian: {eventInfo.timeText}</a>
        <br />
        <a className='text-size'>Môn học: {data[0]}</a>
        <br />
        <a className='text-size'>Nhóm: {data[1]}</a>
        <br />
        <a className='text-size'>Phòng: {data[2]}</a>
        <br/>
        <a className='text-size'>Giảng viên: {data[3]}</a>

      </div>
    )
  }
  return (
    <div className='container' style={{ marginTop: '55px' }}>
      <div className="form-group mb-3">
        <SelectMuiComponent
          title="Chọn học kỳ"
          type={"SEASON_EXTRA"}

          width={'100%'}
          defaultValue={1}
          function={handleSelectSemester}
        />
      </div>
      <div className="form-group mb-3">
        {seasons.length > 0 ? <div>
          <SelectMuiComponent
            title="Chọn mùa học"
            type={"SEASON"}
            data={seasons}
            width={'100%'}
            defaultValue={seasons[0].id}
            function={(e) => getMajorRegisterBySeasonIdAndStudentId(e.target.value, Util.getProfile().id)}
          />
          {openProcessMajorRegister && <Process />}
        </div>
          : ''}
      </div>
      <div className='mb-3'>
        <FullCalendar
          plugins={[timegrid, scrollgrid]}
          initialView="timeGridWeek"
          weekends={true}
          eventMouseEnter={handleMouseEnter}
          eventMouseLeave={handleMouseLeave}
          events={
            dataThoiKhoaBieu
          }
          eventContent={renderEventContent}
          headerToolbar={{
            left: 'next',
            center: 'title',
            right: 'today'
          }}
          buttonText={
            {
              today: 'Hôm nay',
              next: 'Tuần sau'

            }
          }
          allDaySlot={false}
          scrollTime={"07:00:00"}
          slotMinTime={"07:00:00"}
          slotMaxTime={"21:00:00"}
          timeFormat={'H(:mm)'}
          locale={'vi'}
          dayHeaderFormat={
            { weekday: 'long' }
          }
          height={650}
          dayMinWidth={180}
          stickyFooterScrollbar={true}
        />
      </div>
    </div>
  )
}
export default FullCalendarComponent;