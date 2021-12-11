import renderer from 'react-test-renderer';

import Card from 'components/card';
import { ICard } from 'interfaces';

it('renders correctly', () => {
  const cardProps: ICard = {
    id: 1,
    title: "Dnipro",
    day: "Mon", 
    date: "17/Mar",
    content: {
      value: 20,
      description: "descr",
      icon: "icon",
    },
    onDelete: () => {},
  };

  const tree = renderer
    .create(<Card {...cardProps}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});