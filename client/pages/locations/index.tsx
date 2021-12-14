import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  addLocation,
  deleteLocation,
  getLocations,
  logOut,
} from 'api/weatherApi';
import {
  errorMessage,
  showErrorAlert,
  showWarningAlert,
} from 'services/alerts';
import logger from 'services/logger';
import Header from 'components/header';
import Card from 'components/card';
import CardDetails from 'components/card/card-details';
import { ILocation, IForecast } from 'interfaces';
import config from 'config';

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [locationsLoading, setLocationsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    getLocations()
      .then((locations: ILocation[]) => {
        setLoggedIn(true);
        setLocationsLoading(false);
        setLocations(locations);
        logger.debug(
          `Successfully loaded locations: ${JSON.stringify(locations)}`,
        );
      })
      .catch((e: Error) => {
        setLocationsLoading(false);
        logger.error(`Locations loading error: ${e}`);
      });
  }, []);

  const handleLocationAdd = async ({
    name,
    coords,
  }: Pick<ILocation, 'name' | 'coords'>) => {
    if (locations.length >= config.maxLocations) {
      showErrorAlert(errorMessage.maxLocations);
      return;
    }

    const locationExist = locations.find(
      (location: ILocation) => location.name === name,
    );

    if (locationExist) {
      showWarningAlert(errorMessage.locationExist);
      return;
    }

    try {
      const newLocations: ILocation[] = await addLocation({ name, coords });

      setLocations((prevLocations: ILocation[]) => [
        ...prevLocations,
        ...newLocations,
      ]);

      logger.debug(`Successfully added location: ${JSON.stringify(location)}`);
    } catch (e) {
      logger.error(`Location add error: ${e}`);
    }
  };

  const handleLocationDelete = async (id: number) => {
    try {
      await deleteLocation(id);
      setLocations((locations: ILocation[]) =>
        locations.filter((location: ILocation) => location.id !== id),
      );
      logger.debug(`Successfully deleted location : ${id}`);
    } catch (e) {
      logger.error(`Location delete error: ${e}`);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      router.push('/auth/login');
      logger.debug('Successfully logged out');
    } catch (e) {
      logger.error(`Log out error: ${e}`);
    }
  };

  return (
    loggedIn && (
      <>
        <Header
          brandName="Forecastic"
          userName="User"
          avatar="/img/user/profile.jpg"
          onSearchSubmit={handleLocationAdd}
          onLogout={handleLogOut}
        />
        <div className="content-full-width p-20">
          <div className="row">
            {!locationsLoading &&
              locations.map(
                ({
                  name,
                  forecast,
                  currentWeather: { temperature, description, weatherIcon },
                  ...rest
                }: ILocation) => (
                  <Card
                    key={rest.id}
                    title={name}
                    content={{
                      description,
                      value: temperature,
                      icon: weatherIcon,
                    }}
                    onDelete={handleLocationDelete}
                    {...rest}
                  >
                    {forecast.map(
                      ({
                        weather: {
                          minTemperature,
                          maxTemperature,
                          rain,
                          weatherIcon,
                        },
                        ...rest
                      }: IForecast) => (
                        <CardDetails
                          key={rest.date}
                          minValue={minTemperature}
                          maxValue={maxTemperature}
                          condition={rain}
                          icon={weatherIcon}
                          {...rest}
                        />
                      ),
                    )}
                  </Card>
                ),
              )}
          </div>
        </div>
      </>
    )
  );
};

export default Locations;
