import React, { useState, useEffect, useRef } from 'react';
import Header from "../../components/header/Header";
import Card from "../../components/card/Card";
import Cache from '../../lib/cache/Cache';

const cache = new Cache();

const getResources = async (url, token) => {
  let res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
}

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(true);
  
  useEffect(() => {
    const tokenCache = cache.read('token');

    getResources('http://localhost:4000/locations', tokenCache.accessToken)
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

  const locationElements = locations.map(({id, name, forecast: {current: {dt, temp, description, icon}, daily}}) => {
    const contentDetails = daily.map(({dt, temp, description, pop, icon}) => {
      return {
        date: dt, 
        content: { 
          // data: {...temp, pop },
          data: 111,
          descr: description,
          icon: `http://openweathermap.org/img/wn/${icon}@2x.png`
        }
      }
    });
    
    const locationProps = {
      id,
      title: name,
      date: dt,
      content: { data: temp, descr: description, icon: `http://openweathermap.org/img/wn/${icon}@4x.png` },
      contentDetails,
      onDelete() {
        console.log('onDelete')
      }
    }
    return <Card key={id} {...locationProps}/>
  });

  const headerProps = {
    brandName: 'Forecastic',
    userName: 'user1',
    avatar: 1,
    onSearchSubmit() {
      console.log('Form Submit');
    }
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
