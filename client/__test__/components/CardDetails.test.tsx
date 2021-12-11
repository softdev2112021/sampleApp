import renderer from 'react-test-renderer';

import CardDetails from 'components/card/card-details';
import {ICardDetails} from 'interfaces';

it('renders correctly', () => {
  const cardDetailsProps: ICardDetails = { 
    day: 'Mon', 
    date: '17/Mar',
    minValue: 10,
    maxValue: 20,
    condition: 'rain',
    icon: 'icon',
  };

  const tree = renderer
    .create(<CardDetails {...cardDetailsProps}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});