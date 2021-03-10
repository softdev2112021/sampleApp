import React from 'react';

const SearchForm = ({ onSubmit }) => {
  return (
    <div className="navbar-form">
      <form
        action=""
        method="POST"
        name="search_form"
        onSubmit={() => onSubmit()}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
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
