import React from "react";

const CardDetails = ({ date, content: { data, descr, icon } }) => {
  return (
    <div className="d-flex mb-2">
      {date}
      {data}
      {descr}
      {icon}
      <div className="d-flex align-items-center">Nextday forecast</div>
      <div className="d-flex align-items-center ml-auto">
        <div className="text-grey f-s-11"></div>
        <div className="width-50 text-right pl-2 f-w-600">3.79%</div>
      </div>
    </div>
  );
};

export default CardDetails;
