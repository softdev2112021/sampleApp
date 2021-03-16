import SearchForm from "./searchForm/SearchForm";
import DropdownProfile from "./dropdownProfile/DropdownProfile";

interface HeaderProps {
  brandName: string;
  userName: string;
  avatar: string;
  onSearchSubmit: any;
  onLogout: () => void;
}

const Header = (props: HeaderProps) => {
  const { brandName, onSearchSubmit, ...dropdownProfileProps } = props;
  
  return (
    <div className="header navbar-default">
      <div className="navbar-brand">
        <span className="navbar-logo">
          <i className="fas fa-cloud"></i>
        </span>
        <b>{brandName}</b>&nbsp;App
      </div>
      <SearchForm onSubmit={onSearchSubmit} />
      <ul className="navbar-nav">
        <DropdownProfile {...dropdownProfileProps}/>
      </ul>
    </div>
  );
};

export default Header;
