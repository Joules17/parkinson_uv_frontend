import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const styles = `
  .highlighted-date {
    background-color: blue;
    color: white;
  }

  .centered-calendar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function ActivityCalendar({ start_date, end_date }) {
  const [selectedDate, setSelectedDate] = useState(new Date(start_date));

  const dateIsInRange = (date) => {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    return date >= startDate && date <= endDate;
  };

  const tileClassName = ({ date }) => {
    if (dateIsInRange(date)) {
      return 'highlighted-date';
    }
    return '';
  };

  const onChange = (date) => {
    setSelectedDate(date);
  };

  const onViewChange = (view) => {
    if (view === 'month') {
      setSelectedDate(new Date(start_date));
    }
  };

  React.useEffect(() => {
    const styleNode = document.createElement('style');
    styleNode.innerHTML = styles;
    document.head.appendChild(styleNode);

    return () => {
      document.head.removeChild(styleNode);
    };
  }, []);

  return (
    <div className="centered-calendar">
      <Calendar
        tileClassName={tileClassName}
        value={selectedDate}
        onChange={onChange}
        onViewChange={onViewChange}
      />
    </div>
  );
}