import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import { addLocation, deleteLocation, getLocations, logOut } from '../../lib/api/weatherApi/weatherApi';
import { CityProps, LocationCoords, Location } from '../../lib/api/weatherApi/interfaces/Location';
import config from '../../appConfig';
import { useRouter } from 'next/router';
import logger from '../../lib/logger/logger';
import { errorMessage, showErrorAlert, showWarningAlert } from '../../lib/ui/alerts/alerts';

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
        logger.debug(`Locations loaded: ${JSON.stringify(locations)}`);
      })
      .catch((e) => {
        setLocationsLoading(false);
        logger.error(`Locations loading: ${e.message}`);
        router.push('/auth/login');
      });
  }, []);
  
  const onLocationAdd = (props: [CityProps]): void => {
    const [{ name, coords }] = props;
    const locationsCoords: LocationCoords = {
      name,
      coords,
    };

    if (locations.length >= maxLocations) {
      showErrorAlert(errorMessage.maxLocations);
      return;
    }

    const locationExist = locations.find((location) => location.title === locationsCoords.name);

    if (locationExist) {
      showWarningAlert(errorMessage.locationExist);
      return;
    }
    
    addLocation(locationsCoords)
      .then((location: Location[]) => {
        setLocations((prevLocations: Location[]) => [...prevLocations, ...location]);
        logger.debug(`Location added: ${JSON.stringify(location)}`);
      })
      .catch((e) => {
        logger.error(`Location add: ${e.message}`);
      });
  };

  const onLocationDelete = (id: number): void => {
    setLocations((locations) => locations.filter((item) => item.id !== id));
    deleteLocation(id)
      .then(() => {
        logger.debug(`Location deleted: ${id}`);
      })
      .catch((e) => {
        logger.error(`Location delete: ${e.message}`);
      });
  };

  const onLogout = (): void => {
    logOut()
      .then(() => {
        setLoggedIn(false);
        router.push('/auth/login');
        logger.debug('Successfully logged out');
      })
      .catch((e) => {
        logger.error(`Logout: ${e.message}`);
      });
  };

  const locationElements = locations.map((locationProps) => {
    return <Card key={locationProps.id} onDelete={onLocationDelete} {...locationProps}/>
  });

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
