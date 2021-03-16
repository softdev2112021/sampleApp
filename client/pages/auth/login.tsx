import { useState } from "react";
import { useRouter } from "next/router";
import { LogIn } from "../../lib/api/weatherApi/interfaces/Auth";
import { logIn } from "../../lib/api/weatherApi/weatherApi";
import logger from "../../lib/logger/logger";
import { errorMessage, showErrorAlert } from "../../lib/alerts/alerts";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: LogIn = {
      login: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }

    logIn({ data })
      .then(() => {
        logger.debug('Successfully logged in');
        router.push("/locations");
      })
      .catch((e) => {
        if (e.message === "Failed to fetch") {
          showErrorAlert(errorMessage.fetch);
        } else {
          showErrorAlert(errorMessage.auth);
        }

        logger.error(`Login error: ${e.message}`);
      });
  }
  
  return (
    <>
      <div className="login-cover">
        <div
          className="login-cover-image"
          style={{ backgroundImage: "url(/img/background/login-bg.jpg)" }}
        ></div>
        <div className="login-cover-bg"></div>
      </div>

      <div className="login login-v2">
        <div className="login-header">
          <div className="brand">
            <span className="logo"><i className="fas fa-cloud"></i></span> <b>Forecastic</b> App
            <small>Weather forecast by Ivan</small>
          </div>
          <div className="icon">
            <i className="fa fa-lock"></i>
          </div>
        </div>
        <div className="login-content">
          <form className="margin-bottom-0" onSubmit={onSubmit}>
            <div className="form-group m-b-20">
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                className="form-control form-control-lg"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-group m-b-20">
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
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
