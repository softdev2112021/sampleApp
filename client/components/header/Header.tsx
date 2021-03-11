import React from "react";
import SearchForm from "./searchForm/SearchForm";

const Header = ({ brandName, userName, avatar, onSearchSubmit }) => {
  return (
    <div className="header navbar-default">
      <div className="navbar-brand">
        <span className="navbar-logo">
          <i className="fas fa-cloud"></i>
        </span>
        <b>{brandName}</b>&nbsp;App
      </div>
      <SearchForm onSubmit={onSearchSubmit} />
      <div className="navbar-user">
        <a className="p-r-20">
          <img src={avatar} alt="avatar" />
          <span className="text-inverse">{userName}</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
