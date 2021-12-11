import { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { IDropdownProfile } from 'interfaces';

const DropdownProfile: React.FC<IDropdownProfile> = ({ userName, avatar, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((dropdownOpen) => !dropdownOpen);
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggleDropdown}
      className="dropdown navbar-user"
      tag="li"
    >
      <DropdownToggle tag="a">
        <img src={avatar} alt="profile" />
        <span className="d-none d-md-inline">{`${userName} `}</span>
        <b className="caret"></b>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu dropdown-menu-right" tag="ul">
        <DropdownItem onClick={onLogout}>Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownProfile;
