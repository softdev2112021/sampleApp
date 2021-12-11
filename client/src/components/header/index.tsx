import SearchForm from "components/header/search-form";
import DropdownProfile from "components/header/dropdown-profile";
import { IHeader } from "interfaces";

const Header: React.FC<IHeader> = ({
  brandName,
  onSearchSubmit,
  ...dropdownProfileProps
}) => (
  <div className="header navbar-default">
    <div className="navbar-brand">
      <span className="navbar-logo">
        <i className="fas fa-cloud"></i>
      </span>
      <b>{brandName}</b>&nbsp;App
    </div>
    <SearchForm onSubmit={onSearchSubmit} />
    <ul className="navbar-nav">
      <DropdownProfile {...dropdownProfileProps} />
    </ul>
  </div>
);

export default Header;
