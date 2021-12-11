import { ICard } from 'interfaces';

const Card: React.FC<ICard> = ({ id, title, day, date, content: { value, description, icon }, onDelete, children }) => (
    <div className="col-sm-6 col-md-4 col-xl-3">
      <div className="panel panel-inverse">
        <div className="panel-heading bg-dark text-grey">
          <h4 className="panel-title">
            <b className="f-s-16">{title}</b>
          </h4>
          <div className="panel-date m-r-20">
            <b>{day}/</b>
            <b>{date}</b>
          </div>
          <div className="panel-heading-btn">
            <button
              className="btn btn-xs btn-icon btn-circle btn-danger"
              onClick={() => onDelete(id)}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>
        <div className="panel-body pt-0 pb-0">
          <div className="d-flex align-items-center">
            <h2 className="mb-0">
              {value}
              <sup>o</sup>C
            </h2>
            <img src={icon} alt="image" width="64" />
            <b>{description}</b>
          </div>
        </div>
        <div className="row row-space-0 p-t-10 p-b-10 bg-gradient-grey">
          {children}
        </div>
      </div>
    </div>
  );

export default Card;
