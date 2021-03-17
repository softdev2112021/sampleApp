import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../components/header/Header';

it('renders correctly', () => {
  const headerProps = {
    brandName: 'Forecastic',
    userName: 'username1',
    avatar: 'avatar',
    onSearchSubmit: () => {},
    onLogout: () => {},
  }

  const tree = renderer
    .create(<Header {...headerProps}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});