import React from 'react';
import renderer from 'react-test-renderer';
import DropdownProfile from '../../components/header/dropdownProfile/DropdownProfile';

it('renders correctly', () => {
  const tree = renderer
    .create(<DropdownProfile userName={'username1'} avatar={'avatar'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});