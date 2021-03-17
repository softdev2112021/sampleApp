import { useState } from "react";
import { Typeahead, Highlighter } from "react-bootstrap-typeahead";
import { Location } from '../../../lib/api/weatherApi/interfaces/Location';
import cities from '../../../lib/api/weatherApi/cityList.json';

interface SearchFormProps {
  onSubmit: (location: Location[]) => void;
}

const SearchForm = (props: SearchFormProps) => {
  const { onSubmit } = props;
  const [singleSelections, setSingleSelections] = useState([]);

  return (
    <div className="navbar-form">
      <form
        action=""
        method="POST"
        name="search_form"
        onSubmit={(e) => {
          e.preventDefault();
          singleSelections.length && onSubmit(singleSelections);
        }}
      >
        <div className="form-group">
          <Typeahead
            id="city"
            labelKey="name"
            renderMenuItemChildren={(option, props) => (
              <>
                <Highlighter search={props.text}>
                  {option[`${props.labelKey}`]}
                </Highlighter>
                <div className="pull-right">[{option.country}]</div>
              </>
            )}
            minLength={3}
            onChange={setSingleSelections}
            options={cities as any}
            placeholder="Enter city name"
            selected={singleSelections}
          />
          <button type="submit" className="btn btn-search">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
