import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import { addLocation, deleteLocation, getLocations } from '../../lib/api/weatherApi/weatherApi';
import Location from '../../lib/api/weatherApi/interfaces/Location';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(true);
  
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

  const onLocationAdd = ([{ name, coord: { lat, lon } }]: Location[]): void => {
    if (locations.length >= 10) return;

    const data = {
      name,
      coords: [lat, lon],
    };

    addLocation({ data })
      .then((data) => {
        console.log(data)
        setLocations((locations) => [...locations, ...data]);
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


  useEffect(() => {
    getLocations()
      .then((data) => {
        setLocationsLoading(false);
        setLocations(data);
        // TODO: Add logger
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
      })
      .catch((e) => {
        setLocationsLoading(false);
        // TODO: Add logger
        // redirect to login
        // add redirect to login
        // setOutput(error.network);
        // logger.error(`getOperators: ${e.message}`);
      });
  }, []);

  const locationElements = locations.map((locationProps) => {
    return <Card key={locationProps.id} onDelete={onLocationDelete} {...locationProps}/>
  });

  // TODO: create new request to load User data from DB
  const headerProps = {
    brandName: 'Forecastic',
    userName: 'user',
    avatar: '/img/user/profile.jpg',
    onSearchSubmit: onLocationAdd
  }

  return !locationsLoading && (
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
