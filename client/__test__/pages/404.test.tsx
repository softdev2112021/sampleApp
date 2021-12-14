import renderer from 'react-test-renderer';

import NotFound from '../../pages/404';

it('renders correctly', () => {
  const tree = renderer.create(<NotFound />).toJSON();
  expect(tree).toMatchSnapshot();
});
