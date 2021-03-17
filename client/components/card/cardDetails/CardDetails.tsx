export interface CardDetailsProps {
  key: string;
  date: { weekDay: string; date: string };
  content: {
    data: { min: number; max: number; pop: string };
    descr: string;
    icon: string;
  };
}

const CardDetails = (props: CardDetailsProps) => {
  const {
    date: { weekDay, date },
    content: {
      data: { min, max, pop },
      descr,
      icon,
    },
  } = props;
  
  return (
    <div className="col-4 mb-2 d-flex flex-column align-items-center">
      <div className="f-s-12 f-w-800 height-10">{weekDay}/{date}</div>
      <div className="height-50">
        <img src={icon} alt="image" width="64" />
      </div>
      <div className="f-s-18 f-w-800 height-20">{max}<sup>o</sup>C</div>
      <div className="f-s-14 f-w-800 mb-2">{min}</div>
      <i className="fa fa-umbrella">{` ${pop}`}</i>
    </div>
  );
};

export default CardDetails;
