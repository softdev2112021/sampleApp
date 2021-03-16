import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import { addLocation, deleteLocation, getLocations, logOut } from '../../lib/api/weatherApi/weatherApi';
import { CityProps, LocationCoords, Location } from '../../lib/api/weatherApi/interfaces/Location';
import config from '../../lib/api/weatherApi/weatherApiCfg';
import swal from "sweetalert";
import { useRouter } from 'next/router';

const { maxLocations } = config;

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getLocations()
      .then((locations: Location[]) => {
        setLoggedIn(true);
        setLocationsLoading(false);
        setLocations(locations);
        // TODO: Add logger
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
      })
      .catch((e) => {
        setLocationsLoading(false);
        router.push('/auth/login');
        // TODO: Add logger
        // redirect to login
        // add redirect to login
        // setOutput(error.network);
        // logger.error(`getOperators: ${e.message}`);
      });
  }, []);
  
  const onLocationAdd = (props: [CityProps]): void => {
    const [{ name, coord: { lat, lon } }] = props;
    const locationsCoords: LocationCoords = {
      name,
      coords: [lat, lon],
    };

    if (locations.length >= maxLocations) {
      swal({
        title: "Could not add :(",
        text: "Maximum locations exceeded",
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true,
          }
        },
      });
      return;
    }

    const locationExist = locations.find((location) => location.title === locationsCoords.name);

    if (locationExist) {
      swal({
        title: "Location has already been added",
        text: "Please choose another one",
        icon: 'warning',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-warning',
            closeModal: true,
          }
        },
      });
      return;
    }
    
    addLocation({ data: locationsCoords })
      .then((location: Location[]) => {
        setLocations((prevLocations: Location[]) => [...prevLocations, ...location]);
        // TODO: Add logger
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
      })
      .catch((e) => {
        // TODO: Add logger
        // setOutput(error.network);
        // logger.error(`getOperators: ${e.message}`);
      });
  };

  const onLocationDelete = (id: number): void => {
    setLocations((locations) => locations.filter((item) => item.id !== id));
    deleteLocation({ data: { id } })
      .then((data) => {
        // TODO: Add logger
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
      })
      .catch((e) => {
        // TODO: Add logger
        // setOutput(error.network);
        // logger.error(`getOperators: ${e.message}`);
      });
  };

  const onLogout = (): void => {
    logOut()
      .then(() => {
        // TODO: Add logger
        setLoggedIn(false);
        router.push('/auth/login');
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
      })
      .catch((e) => {
        // TODO: Add logger
        // setOutput(error.network);
        // logger.error(`getOperators: ${e.message}`);
      });
  };

  const locationElements = locations.map((locationProps) => {
    return <Card key={locationProps.id} onDelete={onLocationDelete} {...locationProps}/>
  });

  // TODO: create new request to load User data from DB
  const headerProps = {
    brandName: 'Forecastic',
    userName: 'username1',
    avatar: '/img/user/profile.jpg',
    onSearchSubmit: onLocationAdd,
    onLogout,
  }

  return loggedIn && (
    <>
      <Header {...headerProps} />
      <div className="content-full-width p-20">
        <div className="row">
          {!locationsLoading && locationElements}
        </div>
      </div>
    </>
  );
};

export default Locations;
