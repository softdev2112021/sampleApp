import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../../components/card/Card';

it('renders correctly', () => {
  const cardProps = { 
    id: 1,
    title: 'Dnipro',
    date: { weekDay: 'Mon', date: '17/Mar' },
    content: { data: 20, descr: 'Cloudly', icon: 'icon' },
    contentDetails: [],
  };

  const tree = renderer
    .create(<Card {...cardProps}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});