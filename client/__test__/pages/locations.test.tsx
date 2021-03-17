import React from 'react';
import renderer from 'react-test-renderer';
import Locations from '../../pages/locations/index';

it('renders correctly', () => {
  const tree = renderer
    .create(<Locations/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});