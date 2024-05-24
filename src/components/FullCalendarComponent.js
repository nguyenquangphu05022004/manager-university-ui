import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timegrid from '@fullcalendar/timegrid'
import listGridView from '@fullcalendar/list'
import { Tooltip } from 'bootstrap'
import RegisterSubjectService from '../services/RegisterSubjectService'

import Util from '../utils/Util'
import Role from '../constant/Role'
import TeacherService from '../services/TeacherService'
import Token from '../services/Token'
import Spinner from '../components/GenericComponent/Spinner';
function FullCalendarComponent() {

  let tooltipInstance = null;
  const [registerOfStudents, setRegisterOfStudents] = useState([]);
  const [teacher, setTeacher] = useState(null)
  const [openSpinner, setOpenSpinner] = useState(true);
  document.title = "Thời khóa biểu"

  useEffect(() => {
    if (Token.info == null ? [] : Token.info.role === Role.ADMIN) {
      setOpenSpinner(false)
    }
    if (Token.info == null ? [] : Token.info.role === Role.STUDENT) {
      RegisterSubjectService.getAllRegisterByStudentIdAndSeasonNotDisabled(Util.getProfile().id, false)
        .then(res => {
          setOpenSpinner(false);
          setRegisterOfStudents(res.data)
        })
        .catch(err => {
          setOpenSpinner(false);
          alert("get failed register subject")
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
    console.log(registerOfStudents)
    registerOfStudents.forEach((register) => {
      register.subjectGroup.times.forEach(time => {
        const data = {
          groupId: 'blueEvents', // recurrent events in this group move together
          daysOfWeek: [time.dayOfWeek],
          startTime: time.startTime,
          endTime: time.endTime,
          endRecur: time.endDate,
          startRecur: time.startDate,
          title: `${register.subjectGroup.subject.subjectName}*${register.subjectGroup.groupName}*${time.roomClass != null ? time.roomClass.name : ''}`,
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
  console.log(dataThoiKhoaBieu)

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
      </div>
    )
  }
  return (
    <div className='container' style={{ marginTop: '55px' }}>
      <FullCalendar
        plugins={[timegrid, listGridView]}
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
      />
    </div>
  )
}
export default FullCalendarComponent;