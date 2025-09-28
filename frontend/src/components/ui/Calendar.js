import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CustomCalendar = ({ roomId, onDateSelect }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        setLoading(true);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        // This would be replaced with an actual API call
        // const response = await fetchRoomAvailability(roomId, year, month);
        // setBookedDates(response.data.bookedDates);
        
        // Mock data for demonstration
        setBookedDates(['2023-06-15', '2023-06-16', '2023-06-20', '2023-06-21']);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchBookedDates();
    }
  }, [roomId, date]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (bookedDates.includes(dateStr)) {
        return 'unavailable';
      }
    }
    return null;
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      return bookedDates.includes(dateStr) || date < new Date().setHours(0, 0, 0, 0);
    }
    return false;
  };

  const onChange = (value) => {
    setDate(value);
    if (onDateSelect) {
      onDateSelect(value);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading calendar...</div>;
  }

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        minDate={new Date()}
      />
      <div className="calendar-legend mt-3">
        <div className="d-flex align-items-center mb-2">
          <div className="calendar-legend-available me-2"></div>
          <span>Available</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="calendar-legend-unavailable me-2"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;