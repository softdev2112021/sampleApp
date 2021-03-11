import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import Cache from '../../lib/cache/Cache';
import { addLocation, deleteLocation, getLocations } from '../../lib/api/weatherApi/weatherApi';
import Layout from '../../components/layout/Layout';

const cache = new Cache();

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(true);
  
  const onLocationDelete = (id) => {
    const token = cache.read("token");

    setLocations((location) => location.filter((item) => item.id !== id));
    deleteLocation({ ...token, data: { id } })
      .then((data) => {
        //TODO Add logger
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
      })
      .catch((e) => {
        setLocationsLoading(false);
        //TODO Add logger
        // setOutput(error.network);
        // logger.error(`getOperators: ${e.message}`);
      });
  };

  const onLocationAdd = ([{ name, coord: { lat, lon } }]) => {
    if (locations.length >= 10) return;

    const data = {
      name,
      coords: [lat, lon],
    };

    const token = cache.read("token");

    addLocation({ ...token, data })
      .then((data) => {
        //TODO Add logger
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
        getLocations(token)
          .then((data) => {
            setLocationsLoading(false);
            setLocations(data);
            //TODO Add logger
            // if (typeof(data) !== 'object') {
            //   logger.warn(`Server: ${data}`);
            // } else {
            //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
            // }
          })
          .catch((e) => {
            setLocationsLoading(false);
            //TODO Add logger
            // setOutput(error.network);
            // logger.error(`getOperators: ${e.message}`);
          });

      })
      .catch((e) => {
        setLocationsLoading(false);
        //TODO Add logger
        // setOutput(error.network);
        // logger.error(`getOperators: ${e.message}`);
      });
  };

  useEffect(() => {
    getLocations(cache.read("token"))
      .then((data) => {
        setLocationsLoading(false);
        setLocations(data);
        //TODO Add logger
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
      })
      .catch((e) => {
        setLocationsLoading(false);
        //TODO Add logger
        // setOutput(error.network);
        // logger.error(`getOperators: ${e.message}`);
      });
  }, []);

  const locationElements = locations.map((locationProps) => {
    return <Card key={locationProps.id} onDelete={onLocationDelete} {...locationProps}/>
  });

  //TODO create new request to load User data from server
  const headerProps = {
    brandName: 'Forecastic',
    userName: 'user',
    avatar: '/user-13.jpg',
    onSearchSubmit: onLocationAdd
  }

  return (
    <Layout>
      <Header {...headerProps} />
      <div className="content-full-width p-20">
            <div className="row">

                {!locationsLoading && locationElements}
            </div>
          </div>
    </Layout>
  );
};

export default Locations;
