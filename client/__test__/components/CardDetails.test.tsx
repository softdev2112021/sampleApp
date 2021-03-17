import React from 'react';
import renderer from 'react-test-renderer';
import CardDetails from '../../components/card/cardDetails/CardDetails';

it('renders correctly', () => {
  const cardDetailsProps = { 
    date: { weekDay: 'Mon', date: '17/Mar' },
    content: {
      data: { min: 19, max: 20, pop: '0%' },
      descr: 'Cloudly',
      icon: 'icon',
    },
  };

  const tree = renderer
    .create(<CardDetails key={'key'} {...cardDetailsProps}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});