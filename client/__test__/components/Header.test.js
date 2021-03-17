import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../components/header/Header';

it('renders correctly', () => {
  const tree = renderer
    .create(<Header brandName={'Forecastic'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});