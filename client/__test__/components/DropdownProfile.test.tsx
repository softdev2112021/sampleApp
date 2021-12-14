import renderer from 'react-test-renderer';

import DropdownProfile from 'components/header/dropdown-profile';
import { IDropdownProfile } from 'interfaces';

it('renders correctly', () => {
  const dropdownProfileProps: IDropdownProfile = {
    userName: 'username1',
    avatar: 'avatar',
    onLogout: () => {},
  };

  const tree = renderer
    .create(<DropdownProfile {...dropdownProfileProps} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
