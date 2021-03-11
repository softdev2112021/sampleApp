import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

const SearchForm = ({ onSubmit }) => {
  const [singleSelections, setSingleSelections] = useState([]);

  const options = [
    { name: "Dnipro", coord: { lat: 48.450001, lon: 34.98333 } },
    { name: "Kyiv", coord: { lat: 50.433334, lon: 30.516666 } },
    { name: "Lviv", coord: { lat: 49.838261, lon: 24.023239 } },
  ];

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
            minLength={1}
            onChange={setSingleSelections}
            options={options}
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
