import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

const SearchForm = ({ onSubmit }) => {
  const [singleSelections, setSingleSelections] = useState([]);

  const options = [
    { name: "Dnipro", coord: { lat: 50.25, lon: 30.5 } },
    { name: "Kyiv", coord: { lat: 50.25, lon: 30.5 } },
    { name: "Lviv", coord: { lat: 50.25, lon: 30.5 } },
  ];

  return (
    <div className="navbar-form">
      <form
        action=""
        method="POST"
        name="search_form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(singleSelections);
        }}
      >
        <div className="form-group">
          <Typeahead
            id="basic-behaviors-example"
            labelKey="name"
            minLength="2"
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
