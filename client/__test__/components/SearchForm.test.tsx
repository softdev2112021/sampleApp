import renderer from 'react-test-renderer';

import SearchForm from 'components/header/search-form';
import {ISearchForm} from 'interfaces';

it('renders correctly', () => {
  const searchFormProps: ISearchForm  = {
    onSubmit: () => {}
  }

  const tree = renderer
    .create(<SearchForm {...searchFormProps}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});