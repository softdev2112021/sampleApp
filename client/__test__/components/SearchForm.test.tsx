import React from 'react';
import renderer from 'react-test-renderer';
import SearchForm from '../../components/header/searchForm/SearchForm';

it('renders correctly', () => {
  const tree = renderer
    .create(<SearchForm onSubmit={() => {}}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});