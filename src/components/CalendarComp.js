import React from "react";
import Calendar from "react-calendar";

const CalendarComp = ({ date, onChangeDate, isShowPopUp, passedClassName }) => {
  const _dateSelected = (value) => {
    onChangeDate(value);
    isShowPopUp(false);
  };

  return (
    <div className={passedClassName}>
      <Calendar
        className="calender-module"
        value={date}
        onClickDay={_dateSelected}
      />
    </div>
  );
};

export default CalendarComp;
