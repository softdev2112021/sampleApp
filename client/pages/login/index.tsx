const Login = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // props.history.push("/dashboard/v3");
  };

  return (
    <>
      <div className="login-cover">
        <div
          className="login-cover-image"
          style={{ backgroundImage: "url(/assets/img/login-bg/login-bg-17.jpg)" }}
        ></div>
        <div className="login-cover-bg"></div>
      </div>

      <div className="login login-v2">
        <div className="login-header">
          <div className="brand">
            <span className="logo"></span> <b>Forecastic</b> App
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
                className="form-control form-control-lg"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-group m-b-20">
              <input
                type="password"
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
