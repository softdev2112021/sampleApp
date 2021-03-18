import { useState } from "react";
import { AsyncTypeahead, Highlighter } from "react-bootstrap-typeahead";
import { Location } from '../../../lib/api/weatherApi/interfaces/Location';
import config from "../../../lib/api/weatherApi/weatherApiCfg";
import logger from "../../../lib/logger/logger";
import { errorMessage, showErrorAlert } from '../../../lib/alerts/alerts';

const { citiesURL } = config;

interface SearchFormProps {
  onSubmit: (location: Location[]) => void;
}

const SearchForm = (props: SearchFormProps) => {
  const { onSubmit } = props;
  const [singleSelections, setSingleSelections] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="navbar-form">
      <form
        action=""
        method="POST"
        name="search_form"
        onSubmit={(e) => {
          e.preventDefault();
          singleSelections.length && onSubmit(singleSelections);
        }}
      >
        <div className="form-group">
          <AsyncTypeahead
            id="city"
            labelKey="name"
            isLoading={isLoading}
            renderMenuItemChildren={(option, props) => (
              <>
                <Highlighter search={props.text}>
                  {option[`${props.labelKey}`]}
                </Highlighter>
                <div className="pull-right">[{option.country}]</div>
              </>
            )}
            minLength={2}
            onChange={setSingleSelections}
            options={options}
            placeholder="Enter city name"
            selected={singleSelections}
            onSearch={(query) => {
              setIsLoading(true);
              fetch(`${citiesURL}/${query}`, { credentials: 'include' })
                .then((res) => res.json())
                .then((res) => {
                  setOptions(res);
                  setIsLoading(false);
                })
                .catch((e) => {
                  logger.error(`Cities loading error: ${e.message}`);
                  showErrorAlert(errorMessage.cities);
                });
            }}
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
