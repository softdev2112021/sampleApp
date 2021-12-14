import { useRouter } from 'next/router';

import { errorMessage, showErrorAlert } from 'services/alerts';
import logger from 'services/logger';
import { logIn } from 'api/weatherApi';

const Login: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    logIn({
      login: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    })
      .then(() => {
        logger.debug('Successfully logged in');
        router.push('/locations');
      })
      .catch(e => {
        if (e.message === 'Network Error') {
          showErrorAlert(errorMessage.fetch);
        } else if (e.response.data.message === 'Internal server error') {
          showErrorAlert(errorMessage.server);
        } else if (e.response.data.message === 'Unauthorized') {
          showErrorAlert(errorMessage.auth.password);
        } else if (
          e.response.data.message === 'User with this email does not exist'
        ) {
          showErrorAlert(errorMessage.auth.email);
        } else {
          showErrorAlert(errorMessage.unknown);
        }

        logger.error(`Log in error: ${e.message}`);
      });
  };

  return (
    <>
      <div className="login-cover">
        <div
          className="login-cover-image"
          style={{ backgroundImage: 'url(/img/background/login-bg.jpg)' }}
        ></div>
        <div className="login-cover-bg"></div>
      </div>

      <div className="login login-v2">
        <div className="login-header">
          <div className="brand">
            <span className="logo">
              <i className="fas fa-cloud"></i>
            </span>{' '}
            <b>Forecastic</b> App
            <small>Weather forecast by Ivan</small>
          </div>
          <div className="icon">
            <i className="fa fa-lock"></i>
          </div>
        </div>
        <div className="login-content">
          <form className="margin-bottom-0" onSubmit={handleSubmit}>
            <div className="form-group m-b-20">
              <input
                type="email"
                name="email"
                className="form-control form-control-lg"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-group m-b-20">
              <input
                type="password"
                name="password"
                className="form-control form-control-lg"
                placeholder="Password"
                required
              />
            </div>
            <div className="login-buttons">
              <button
                type="submit"
                className="btn btn-success btn-block btn-lg"
              >
                Sign me in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
