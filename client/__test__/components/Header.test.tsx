import renderer from 'react-test-renderer';

import Header from 'components/header';
import { IHeader } from 'interfaces';

it('renders correctly', () => {
  const headerProps: IHeader = {
    brandName: 'Forecastic',
    userName: 'username1',
    avatar: 'avatar',
    onSearchSubmit: () => {},
    onLogout: () => {},
  };

  const tree = renderer.create(<Header {...headerProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
