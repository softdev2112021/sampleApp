import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import Cache from '../../lib/cache/Cache';
import { addLocation, deleteLocation, getLocations } from '../../lib/api/weatherApi/weatherApi';

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

  const onLocationAdd = () => {
    const location = { name: 'Dnipro', coords: [50.35, 30.25] };

    addLocation({ accessToken: cache.read('token').accessToken, data: location })
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

  const headerProps = {
    brandName: 'Forecastic',
    userName: 'user1',
    avatar: 1,
    onSearchSubmit: onLocationAdd
  }

  return (
    <div>
      <div>
        <Header {...headerProps} />
      </div>
      <div className="content">
        <div>
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
      </div>
    </div>
  );
};

export default Locations;
