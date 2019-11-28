import React, { useState, useEffect } from 'react';
import '../css/calendar.css';
import '../App.css';

const Calendar = () => {
    const date = new Date();

    let [month, setMonth] = useState(date.getMonth());
    let [year, setYear] = useState(date.getFullYear());
    let [currentYear, setCurrentYear] = useState(date.getFullYear());
    let [displayYear, setDisplayYear] = useState(year);

    const date1 = new Date();
    let [forDisplayedMonth, setForDisplayedMonth] = useState(date1.getMonth() + 1);

    let setDatesForArrows = new Date(year, forDisplayedMonth, 0);
    let totalNumberOfDaysInDisplayedMonth = setDatesForArrows.getDate();;

    let date2 = new Date(year, month, 0);
    let totalNumberOfDaysInPreviousMonth = date2.getDate();
    let firstDayOfTheRequestedMonth = new Date(date2 + "1" + year).getDay();


    let arrayOfDays = [];
    let arrayOfPastMonth = [];

    const [months, setMonths] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    const [dayHeadings, setDayHeadings] = useState(['S', 'M', 'T', 'W', 'T', 'F', 'S'])

    let [currentMonth, setCurrentMonth] = useState(months[date.getMonth()]);
    let [displayMonth, setDisplayMonth] = useState(months[month]);

    let [showCalendar, setShowCalendar] = useState(false);
    let [displayedDay, setDisplayedDay] = useState(date.getDate());
    let [selectedDay, setSelectedDay] = useState();

    let daysGoneBy = totalNumberOfDaysInPreviousMonth - firstDayOfTheRequestedMonth;

    let displayDays = () => {
        for (let i = daysGoneBy; i <= totalNumberOfDaysInPreviousMonth; i++) {
            arrayOfPastMonth.push(i);
        }

        for (let j = 1; j <= totalNumberOfDaysInDisplayedMonth; j++) {
            arrayOfDays.push(j);
        }
        return arrayOfDays;
    }

    let previousMonth = () => {

        setSelectedDay('')
        arrayOfDays = [];
        arrayOfPastMonth = [];

        if (month === -1) {
            setMonth(month = 11);

            setYear(year--);
            setDisplayYear(year);
        }
        setForDisplayedMonth(forDisplayedMonth - 1)

        if (forDisplayedMonth === 1) {
            setForDisplayedMonth(forDisplayedMonth = 12);

        }
        setDisplayMonth(months[month])
        setYear(year);
        displayDays();
    }

    let nextMonth = () => {

        setSelectedDay('');

        if (month === 12) {

            setMonth(month = 0);
            setYear(year++);
            setDisplayYear(year);
        }
        setForDisplayedMonth(forDisplayedMonth + 1)
        if (forDisplayedMonth === 12) {
            setForDisplayedMonth(forDisplayedMonth = 1);

        }
        setDisplayMonth(months[month])
        setYear(year);
        displayDays();
    }

    displayDays();

    let showTheCalendar = () => {
        showCalendar ? setShowCalendar(false) : setShowCalendar(true); displayDays();
    };

    return (
        <div className="date-picker">
            <div className="selected-date" onClick={showTheCalendar}>{!selectedDay ? <span>{currentMonth} {displayedDay} {currentYear}</span> : <span>{displayMonth} {selectedDay} {year}</span>}</div>

            {showCalendar ?
                <><div className="dates">
                    <div className="month" >
                        <div className="arrows previous" onClick={previousMonth} onMouseUp={() => setMonth(month - 1)}>&lt;</div>
                        <div className="displayMonth"> {displayMonth} {displayYear}</div>
                        <div className="arrows nextMonth" onClick={nextMonth} onMouseUp={() => setMonth(month + 1)}>&gt;</div>
                    </div>
                    <div className="daysOfWeek">{dayHeadings.map((day, index) => <div key={index}>{day}</div>)}</div>
                    <div className="days">{arrayOfPastMonth.map((day, index) => <div key={index} className="previousMonth">{day}</div>)} {arrayOfDays.map((day, index) => <div key={index} className={selectedDay === index + 1 ? 'selected' : ''} onClick={() => setSelectedDay(day)}>{day}</div>)}</div>
                </div>
                </>
                : ''}
        </div>
    )
}

export default Calendar;