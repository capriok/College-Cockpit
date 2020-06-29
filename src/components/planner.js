import React, { useState } from 'react'
import short from 'short-uuid'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { Modal, Input, Button } from 'godspeed'

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
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={toolbar}
        weekends={true}
        editable={true}
        selectable={true}
        eventContent={eventInfo => renderEventContent(eventInfo)}
        select={selectInfo => setPrompt({ ...prompt, state: true, selectInfo: selectInfo })}
        eventClick={clickInfo => setConfirm({ ...confirm, state: true, clickInfo: clickInfo })}
        initialEvents={[
          { title: 'event 1', date: '2020-06-15' }
        ]}
      />
      <Modal open={prompt.state} onClick={() => closePrompt()}>
        <h1>Create Event</h1>
        <br />
        <Input placeholder="Title" underlined autoFocus
          onChange={e => setPrompt({ ...prompt, title: e.target.value })} />
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100' }}>
          <Button
            text="Submit"
            size="xsm"
            onClick={e => handleEventSubmit(e)} />
          <Button
            text="Cancel"
            size="xsm"
            onClick={() => resetPrompt()} />
        </div>
      </Modal>
      <Modal open={confirm.state} onClick={() => closeConfirm()}>
        <h1>Delete Event?</h1>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100' }}>
          <Button
            text="Delete"
            size="xsm"
            onClick={() => handleEventDelete()} />
          <Button
            text="Cancel"
            size="xsm"
            onClick={() => resetConfirm()} />
        </div>
      </Modal>
    </div>
  )
}

export default Planner
