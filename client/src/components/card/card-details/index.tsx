/* eslint-disable @next/next/no-img-element */
import { ICardDetails } from 'interfaces';

const CardDetails: React.FC<ICardDetails> = ({
  day,
  date,
  minValue,
  maxValue,
  condition,
  icon,
}) => (
  <div className="col-4 mb-2 d-flex flex-column align-items-center">
    <div className="f-s-12 f-w-800 height-10">
      {day}/{date}
    </div>
    <div className="height-50">
      <img src={icon} alt="image" width="64" />
    </div>
    <div className="f-s-18 f-w-800 height-20">
      {maxValue}
      <sup>o</sup>C
    </div>
    <div className="f-s-14 f-w-800 mb-2">{minValue}</div>
    <i className="fa fa-umbrella">{` ${condition}`}</i>
  </div>
);

export default CardDetails;
