import renderer from 'react-test-renderer';

import Locations from '../../pages/locations';

it('renders correctly', () => {
  const tree = renderer.create(<Locations />).toJSON();
  expect(tree).toMatchSnapshot();
});
