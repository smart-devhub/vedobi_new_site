import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { baseUrl } from "../../utils/global";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

function Login(props) {
  const checkExpiry = () => {
    const key = "vedobi_login";
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return false
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return false;
    }
    return item.data;
  };
  let dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    const checkIfUserExpired = checkExpiry();
    if (checkIfUserExpired) {
      dispatch({ type: "login", payload: checkIfUserExpired });
      history.push("/my-account");
    }
  }, [dispatch, history]);
  const { loggedin } = useSelector((state) => state.products);
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [ErrorEmail, setErrorEmail] = useState("");
  const [Errorpassword, setErrorpassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [isRememberMeSelected, setIsRememberMeSelected] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "") {
      setErrorEmail("Please enter your Email/Mobile Number");
    }
    if (password === "") {
      setErrorpassword("Please enter your password");
    }

    if (email !== "" && password !== "") {
      const Api = "api/login";
      const url = baseUrl + Api;
      setError(null);
      axios.post(url, { email: email, password: password }).then((response) => {
        const status = response.data.status;
        if (status === true) {
          // console.log("==========================>", response.data.shippingAddress);
          if (isRememberMeSelected) {
            const now = new Date();
            const expiration = 1000000;
            const item = {
              email: email,
              expiry: now.getTime() + expiration,
              data: response.data.data,
            };
            localStorage.setItem("vedobi_login", JSON.stringify(item));
          }
          setLoading(true);
          // setUserSession(response.data.token, response.data.data);
          dispatch({ type: "login", payload: response.data.data });
          dispatch({
            type: "shippingAddress",
            payload: response.data.shippingAddress,
          });
          history.push("/my-account");
        } else {
          setError(response.data.message);
          setLoading(false);
          setErrorEmail("");
          setErrorpassword("");
        }
      });
    }
  };

  const ForgotPassword = () => {
    if (email === "") {
      setErrorEmail("Please enter your Email/Mobile Number");
    }

    if (email !== "") {
      const Api = "api/forgot";
      const url = baseUrl + Api;
      axios.post(url, { email: email }).then((response) => {
        const status = response.data.status;
        if (status === true) {
          localStorage.setItem("forgotpassowrd", email);
          history.push("/forgot-passowrd");
        } else {
          setError(response.data.message);
          setErrorEmail("");
          setErrorpassword("");
        }
      });
    }

    //forgot-passowrd
  };

  if (loggedin) {
    return <Redirect to="/my-account" />;
  }

  const responseFacebook = (res) => {
    if(res!=='' || res!==null)
    {
    const name = res.name;
    const email = res.email;
    const grapid = res.id;
    const Api = "api/facebookLogin";
    const url = baseUrl + Api;
    setError(null);
    axios
      .post(url, { name: name, email: email, grapid: grapid })
      .then((response) => {
        // console.log(response);
        dispatch({ type: "login", payload: response.data.data });
        history.push("/my-account");
      });
    }
    else {
      history.push("/login");
    }
  };

  const responseGoogle = (response) => {

    if(response!=='' || response!==null)
    {
     const grapid = response.profileObj.googleId;
    const v_f_name = response.profileObj.givenName;
    const v_l_name = response.profileObj.familyName;
    const name = response.profileObj.name;
    const email = response.profileObj.email;
    const Api = "api/googleLogin";
    const url = baseUrl + Api;
    setError(null);
    axios
      .post(url, {
        name: name,
        email: email,
        grapid: grapid,
        v_f_name: v_f_name,
        v_l_name: v_l_name,
      })
      .then((responseResults) => {
        dispatch({ type: "login", payload: responseResults.data.data });
        history.push("/my-account");
      });
    }
    else {
      history.push("/login");
    }
  };

  return (
      <>
        {/* Breadcrumb Start */}
        <div className="breadcrumb-area bg-white">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Breadcrumb>
                  <Breadcrumb.Item href="/">
                    <i className="fa fa-home" />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Login</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb Ends */}

        {/* Login and Register Wrapper Start */}
        <div className="login-register-area login pt-50 pb-50 my-2 bg-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 mx-auto">
                {/* Login Wrapper Start */}
                <div className="wrapper">
                  {/* Form Title Start */}
                  <h4 className="login-h1">Login</h4>
                  <p className="sprt-txt">
                    Please Enter your Email & Password to Login..
                  </p>
                  {/* Form Title End */}

                  {error && (
                    <>
                      <small className="text-red">{error}</small>
                      <br />
                    </>
                  )}

                  {/* Form Wrapper Start */}
                  <div className="form-wrapper">
                    {/* Email Input Start */}
                    <div className="form-group mb-3">
                      <div className="login-pass">
                        <span className="prepend">
                          <i className="fa fa-user" />
                        </span>
                        <input
                          type="text"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="new-password"
                          placeholder="Email/Mobile Number"
                          className="form-control"
                        />
                      </div>
                      {ErrorEmail && (
                        <>
                          <small className="text-red">{ErrorEmail}</small>
                          <br />
                        </>
                      )}
                    </div>
                    {/* Email Input End */}

                    {/* Password Input Start */}
                    <div className="form-group mb-3">
                      <div className="login-pass">
                        <span className="prepend">
                          <i className="fa fa-key" />
                        </span>
                        <input
                          type={passwordShown ? "text" : "password"}
                          onChange={(e) => setPassword(e.target.value)}
                          name="password"
                          autoComplete="new-password"
                          placeholder="Password"
                          className="form-control"
                        />

                        <button
                          className="eye-toggle"
                          onClick={togglePasswordVisiblity}
                        >
                          {passwordShown ? (
                            <i className="fa fa-eye-slash" />
                          ) : (
                            <i className="fa fa-eye" />
                          )}
                        </button>
                      </div>
                      {Errorpassword && (
                        <>
                          <small style={{ color: "red" }}>
                            {Errorpassword}
                          </small>
                          <br />
                        </>
                      )}
                    </div>
                    {/* Password Input End */}

                    {/* Remember me and Forgot Password Bar Start */}
                    <div className="form-group mb-3">
                      <div className="form-content-line">
                        <div className="custom-form-check">
                          <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            onClick={(e) => {
                              setIsRememberMeSelected((prev) => !prev);
                            }}
                          />{" "}
                          <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <div className="for-link">
                          <button onClick={ForgotPassword}>
                            Forgot Password.?
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Remember me and Forgot Password Bar End */}

                    {/* Login Button Start */}
                    <div className="form-group mb-3">
                      <div className="login-btn">
                        <input
                          type="button"
                          value={loading ? "Loading..." : "Login"}
                          onClick={handleLogin}
                          disabled={loading}
                          className="btn btn-login"
                        />
                      </div>
                    </div>
                    {/* Login Button End */}

                    <div className="or-line-1">
                      <hr />
                      <span>Or Login With</span>
                    </div>

                    {/* Social Login Bar Start */}
                    <div className="social-login">
                      <ul>
                        <li>
                          <button className="facebook">
                            <i className="fa fa-facebook" />
                            <span>Facebook</span>
                          </button>
                          <FacebookLogin
                            cssClass="btn-def-fb"
                            appId="948430236093132"
                            fields="name,email,picture"
                            callback={responseFacebook}
                            textButton="facebook"
                          />
                        </li>
                        <li>
                          <button className="g-plus">
                            <i className="fa fa-google" />
                            <span>Google</span>
                          </button>
                          <GoogleLogin
                            clientId="966058840815-iog1fukmuk94iuq7li6o7k5nh1o8evsa.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            className="btn-def-gplus"
                          />
                        </li>
                      </ul>
                    </div>
                    {/* Social Login Bar End */}

                    {/* Sign Up Bar Start */}
                    <div className="form-group mb-3 mt-5 mb-0">
                      <div className="signup-link">
                        Not a Member.? <Link to="/signup">Signup Here</Link>
                      </div>
                    </div>
                    {/* Sign Up Bar End */}
                  </div>
                  {/* Form Wrapper End */}
                </div>
                {/* Login Wrapper End */}
              </div>
            </div>
          </div>
        </div>
        {/* Login and Register Wrapper End */}
      </>

  );
}

export default React.memo(Login);