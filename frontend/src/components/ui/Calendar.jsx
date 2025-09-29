import React, { useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const Calendar = ({ bookings, rooms }) => {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState('month')

  // Transform bookings to events for the calendar
  const events = bookings.map(booking => {
    const room = rooms.find(r => r._id === booking.room)
    return {
      id: booking._id,
      title: `${room ? room.name : 'Room'} - ${booking.user.name}`,
      start: new Date(booking.checkIn),
      end: new Date(booking.checkOut),
      allDay: true,
      resource: booking,
    }
  })

  const eventStyleGetter = (event) => {
    const backgroundColor = '#8B4513'
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
    return {
      style: style
    }
  }

  const dayPropGetter = (date) => {
    const dayBookings = bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn)
      const checkOut = new Date(booking.checkOut)
      return date >= checkIn && date <= checkOut
    })
    
    const totalRooms = rooms.length
    const bookedRooms = dayBookings.length
    const availableRooms = totalRooms - bookedRooms
    
    let style = {}
    
    if (availableRooms === 0) {
      style = {
        backgroundColor: '#f8d7da',
        color: '#721c24'
      }
    } else if (availableRooms < totalRooms / 2) {
      style = {
        backgroundColor: '#fff3cd',
        color: '#856404'
      }
    } else {
      style = {
        backgroundColor: '#d4edda',
        color: '#155724'
      }
    }
    
    return {
      className: 'rbc-day-bg',
      style
    }
  }

  return (
    <div className="calendar-container">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        date={date}
        onNavigate={setDate}
        view={view}
        onView={setView}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        views={['month', 'week', 'day']}
        popup
      />
      <div className="mt-3">
        <div className="d-flex align-items-center mb-2">
          <div className="available-indicator me-2"></div>
          <span>High Availability</span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="partially-available-indicator me-2"></div>
          <span>Limited Availability</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="unavailable-indicator me-2"></div>
          <span>Fully Booked</span>
        </div>
      </div>
    </div>
  )
}

export default Calendar