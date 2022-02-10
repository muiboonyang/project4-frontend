import { useContext } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

////////////////////////////////////////////////////////////
// Custom hook (useFetchPost) to check token expiry during each 'Post' request and initiate token refresh
///////////////////////////////////////////////////////////

const useFetchPost = () => {
  let history = useHistory();
  let config = {};

  let { authTokens, setAuthTokens, setUser } = useContext(AuthContext);

  const baseURL = "https://anywhere-fitness-first.herokuapp.com";

  const originalRequest = async (url, config) => {
    url = `${baseURL}${url}`;
    let res = await fetch(url, config);
    let data = await res.json();
    console.log("POSTING:", data); // Console Log
    return { res, data };
  };

  // Token refresh process
  const refreshToken = async (authTokens) => {
    let res = await fetch(
      "https://anywhere-fitness-first.herokuapp.com/auth/refreshtoken/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      }
    );
    let data = await res.json();
    localStorage.setItem("authTokens", JSON.stringify(data));
    setAuthTokens(data);
    setUser(jwt_decode(data.access));
    return data;
  };

  ///////////////////////////////////
  // Check token expiry everytime we use useFetch, run originalRequest function
  ///////////////////////////////////

  const callFetchPost = async (url, input) => {
    // get access token expiry date
    const user = jwt_decode(authTokens.access);
    // compare access token expiry date and current date (<1 -> expired)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    // // Token expiry details
    // console.log(`Access Token expiring on: ${dayjs.unix(user.exp)}`);
    // console.log(`Time now: ${dayjs()}`);
    console.log(
      `Access Token remaining validity: ${
        dayjs.unix(user.exp).diff(dayjs()) / 1000
      } seconds`
    );

    // Initiate token refresh when access token has expired, to get new access token
    let refreshTokenExists = authTokens.refresh;

    if (isExpired && refreshTokenExists) {
      authTokens = await refreshToken(authTokens);
    } else if (isExpired && !refreshTokenExists) {
      history.push("/login");
      setUser(null);
      localStorage.removeItem("authTokens");
    }

    //Configures for each request

    config["headers"] = {
      Authorization: `Bearer ${authTokens?.access}`,
      "Content-Type": "application/json",
    };
    config["method"] = "POST";
    config["mode"] = "cors";
    config["body"] = JSON.stringify(input);

    let { res, data } = await originalRequest(url, config);
    return { res, data };
  };

  return callFetchPost;
};

export default useFetchPost;
