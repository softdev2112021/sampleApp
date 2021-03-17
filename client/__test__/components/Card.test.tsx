import React from 'react';
import renderer from 'react-test-renderer';
import Card, { CardProps } from '../../components/card/Card';

it('renders correctly', () => {
  const cardProps: CardProps = {
    id: 1,
    title: "Dnipro",
    date: { weekDay: "Mon", date: "17/Mar" },
    content: {
      data: 20,
      descr: "descr",
      icon: "icon",
    },
    contentDetails: [
      {
        key: "key",
        date: { weekDay: "Mon", date: "17/Mar" },
        content: {
          data: { min: 19, max: 20, pop: "0%" },
          descr: "descr",
          icon: "icon",
        },
      },
    ],
    onDelete: () => {},
  };

  const tree = renderer
    .create(<Card {...cardProps}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});