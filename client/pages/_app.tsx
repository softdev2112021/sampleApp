import '../styles/globals.scss';

type IPageProps = Record<string, unknown>;

interface IWeatherForecast {
  Component: React.FC<IPageProps>;
  pageProps: IPageProps;
}

const WeatherForecast: React.FC<IWeatherForecast> = ({
  Component,
  pageProps,
}) => <Component {...pageProps} />;

export default WeatherForecast;
