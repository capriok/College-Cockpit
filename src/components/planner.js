import React, { useState, useEffect } from 'react'
import short from 'short-uuid'
import { Tooltip, } from 'react-tippy';
import { Modal, Input, Button } from 'godspeed'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-tippy/dist/tippy.css';


// https://fullcalendar.io/docs/event-source
// https://codesandbox.io/s/amazing-brattain-puwfq?file=/src/DemoApp.jsx:1206-1278

const Planner = () => {
  const [events, setEvents] = useState({})
  const [prompt, setPrompt] = useState({
    state: false,
    title: '',
    selectInfo: undefined
  })
  const [confirm, setConfirm] = useState({
    state: false,
    clickInfo: undefined
  })
  const toolbar = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }

  const closePrompt = () => setPrompt({ ...prompt, state: false })
  const resetPrompt = () => setPrompt({ state: false, title: '', selectInfo: undefined })
  const closeConfirm = () => setConfirm({ ...confirm, state: false })
  const resetConfirm = () => setConfirm({ state: false, clickInfo: undefined })

  const renderEventContent = (eventInfo) => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )

  const handleEventSubmit = (e) => {
    e.preventDefault()
    let { title, selectInfo } = prompt
    let calendarApi = selectInfo.view.calendar
    if (!title) return
    calendarApi.addEvent({
      id: short.generate(),
      title: title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
    calendarApi.unselect()
    resetPrompt()
  }

  const handleEventDelete = (e) => {
    const { clickInfo } = confirm
    clickInfo.event.remove();
    resetConfirm()
  };

  const handleEvents = (events) => {
    setEvents({ currentEvents: events })
  };

  return (
    <div className="planner">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
        themeSystem="sandstone"
        initialView="dayGridMonth"
        headerToolbar={toolbar}
        nowIndicator={true}
        weekends={true}
        selectMirror={true}
        editable={true}
        selectable={true}
        select={selectInfo => setPrompt({ ...prompt, state: true, selectInfo: selectInfo })}
        eventClick={clickInfo => setConfirm({ ...confirm, state: true, clickInfo: clickInfo })}
        eventsSet={events => handleEvents(events)}
        eventContent={eventInfo => renderEventContent(eventInfo)}
        initialEvents={[
          { title: 'event 1', date: '2020-06-15' }
        ]}
      />
      <Modal open={prompt.state} onClick={() => closePrompt()}>
        <h1>Create Event</h1>
        <br />
        <Input placeholder="Title" underlined autoFocus style={{ width: '100%' }}
          onChange={e => setPrompt({ ...prompt, title: e.target.value })} />
        <br />
        <br />
        <form id="promptForm" onSubmit={e => handleEventSubmit(e)}></form>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100' }}>
          <Button
            type="submit"
            form="promptForm"
            text="Submit"
            size="xsm" />
          <Button
            text="Cancel"
            size="xsm"
            onClick={() => resetPrompt()} />
        </div>
      </Modal>
      <Modal open={confirm.state} onClick={() => closeConfirm()}>
        <h1>Delete Event?</h1>
        <br />
        <form id="confirmForm">
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100' }}>
            <Button
              type="submit"
              form="confirmForm"
              text="Delete"
              size="xsm"
              onClick={e => handleEventDelete(e)} />
            <Button
              text="Cancel"
              size="xsm"
              onClick={() => resetConfirm()} />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Planner
