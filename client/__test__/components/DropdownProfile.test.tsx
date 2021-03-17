import React from 'react';
import renderer from 'react-test-renderer';
import DropdownProfile from '../../components/header/dropdownProfile/DropdownProfile';

it('renders correctly', () => {
  const dropdownProfileProps = {
    userName: 'username1',
    avatar: 'avatar',
    onLogout: () => {},
  }

  const tree = renderer
    .create(<DropdownProfile {...dropdownProfileProps}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});