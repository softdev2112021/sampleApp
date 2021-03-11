import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
//TODO Make loading cityList from DB as it is too heavy to start on client
import cities from '../../../lib/api/weatherApi/cityList.json';

const SearchForm = ({ onSubmit }) => {
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
            minLength={3}
            onChange={setSingleSelections}
            options={cities}
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
