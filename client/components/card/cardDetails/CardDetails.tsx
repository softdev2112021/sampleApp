import React from "react";

const CardDetails = ({
  date: { weekDay, date },
  content: {
    data: { min, max, pop },
    descr,
    icon,
  },
}) => {
  return (
    <div className="bg-grey d-flex mb-2">
      {date}
      {weekDay}
      {min}
      {max}
      
      {descr}
      <i className="fa fa-umbrella">{pop}</i>
      <div>
        <img src={icon} alt="image" width="64" />
      </div>
      <div className="d-flex align-items-center"></div>
      <div className="d-flex align-items-center ml-auto">
        <div className="text-grey f-s-11"></div>
        <div className="width-50 text-right pl-2 f-w-600"></div>
      </div>
    </div>
  );
};

export default CardDetails;
