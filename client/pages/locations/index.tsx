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
    setLocations((location) => location.filter((item) => item.id !== id));
    deleteLocation({ accessToken: cache.read('token').accessToken, data: { id } })
      .then((data) => {
      //   logger.warn(`Server: ${data}`);
      // } else {
      //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
      // }
    });
    //   .catch((e) => {
    //     setLocationsLoading(false);
    //     // setOutput(error.network);
    //     // logger.error(`getOperators: ${e.message}`);
    //   });
  };

  const onLocationAdd = ([{ name, coord: { lat, lon } }]) => {
    const data = {
      name,
      coords: [lat, lon],
    }
      // const [{ coord: { lat, lon } }] = singleSelections;
  // const location = { name: 'Dnipro', coords: [50.35, 30.25] };

    if (locations.length >= 10) return;
    
    addLocation({ accessToken: cache.read('token').accessToken, data })
      .then((data) => {
      //   logger.warn(`Server: ${data}`);
      // } else {
      //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
      // }
    }).then()
    //   .catch((e) => {
    //     setLocationsLoading(false);
    //     // setOutput(error.network);
    //     // logger.error(`getOperators: ${e.message}`);
    //   });

    getLocations({ accessToken: cache.read('token').accessToken })
      .then((data) => {
        console.log(data);
        setLocationsLoading(false);
        setLocations(data);
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
    })
  //   .catch((e) => {
  //     setLocationsLoading(false);
  //     // setOutput(error.network); 
  //     // logger.error(`getOperators: ${e.message}`);
  //   });
  };

  useEffect(() => {
    getLocations({ accessToken: cache.read('token').accessToken })
      .then((data) => {
        console.log(data);
        setLocationsLoading(false);
        setLocations(data);
        // if (typeof(data) !== 'object') {
        //   logger.warn(`Server: ${data}`);
        // } else {
        //   logger.debug(`Operators loaded: ${JSON.stringify(data)}`);
        // }
    })
  //   .catch((e) => {
  //     setLocationsLoading(false);
  //     // setOutput(error.network); 
  //     // logger.error(`getOperators: ${e.message}`);
  //   });
  }, []);

  console.log(locations);

  const locationElements = locations.map((locationProps) => {
    return <Card key={locationProps.id} onDelete={onLocationDelete} {...locationProps}/>
  });

  //TODO create new request to load User data from server
  const headerProps = {
    brandName: 'Forecastic',
    userName: 'user',
    avatar: 'assets/img/user/user-13.jpg',
    onSearchSubmit: onLocationAdd
  }

  return (
    <Layout>
      <Header {...headerProps} />
      <div className="content">
        <div className="row">
          <div className="col-xl-6">
            <div className="row">
              <div className="col-sm-6">
                {!locationsLoading && locationElements}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Locations;
