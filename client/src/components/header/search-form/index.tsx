import { useState } from "react";
import { AsyncTypeahead, Highlighter, TypeaheadMenuProps } from "react-bootstrap-typeahead";

import { ISearchedLocation, ISearchForm } from 'interfaces';
import { errorMessage, showErrorAlert } from 'services/alerts';
import { searchLocations } from "api/weatherApi";
import logger from "services/logger";

const SearchForm: React.FC<ISearchForm> = ({onSubmit}) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchedLocations, setSearchedLocations] = useState<ISearchedLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);

    try {
      const searchedLocations = await searchLocations(searchQuery)
      setSearchedLocations(searchedLocations);
      setIsLoading(false);
    } catch(e) {
      logger.error(`Cities loading error: ${(e as Error).message}`);
      showErrorAlert(errorMessage.cities);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      selectedLocations.length && onSubmit({name: selectedLocations[0].name, coords: selectedLocations[0].coords});
  }

  return (
    <div className="navbar-form">
      <form
        name="search_form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <AsyncTypeahead
            id="city"
            labelKey="name"
            isLoading={isLoading}
            renderMenuItemChildren={({name, country}: ISearchedLocation, {text}: TypeaheadMenuProps<{text: string}>) => <>
                <Highlighter search={text}>
                  {name}
                </Highlighter>
                <div className="pull-right">[{country}]</div>
              </>
            }
            minLength={2}
            onChange={setSelectedLocations}
            options={searchedLocations}
            placeholder="Enter city name"
            selected={selectedLocations}
            onSearch={handleSearch}
          />
          <button type="submit" className="btn btn-search">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
