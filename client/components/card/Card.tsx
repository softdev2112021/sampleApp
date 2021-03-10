import React from "react";
import CardDetails from './cardDetails/CardDetails';

const Card = ({ id, title, date, content: { data, descr, icon }, contentDetails, onDelete, }) => {
  
  const cardDetails = contentDetails.map((content) => {
    return <CardDetails key={content.date} {...content}/>
  });

  return (
    <div className="card border-0 bg-dark text-white text-truncate mb-3">
      <div className="card-body">
        <button
          className="btn btn-xs btn-icon btn-circle btn-danger"
          onClick={() => onDelete(id)}
        >
          <i className="fa fa-times"></i>
        </button>
        <div className="d-flex justify-content-between text-grey">
          <b>{title}</b>
          <b>{date}</b>
        </div>
        <div className="d-flex align-items-center">
          <h2 className="text-white mb-0">
            {data}<sup>o</sup>C
          </h2>
          <div className="forecast-icon">
            <img
              src={icon}
              alt="image"
              width="64"
            />
          </div>
          <div className="ml-auto"></div>
        </div>
        <div className="text-grey">{descr}</div>
        {cardDetails}
      </div>
    </div>
  );
};

export default Card;
