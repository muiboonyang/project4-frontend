import { useContext } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

////////////////////////////////////////////////////////////
// Custom hook (useFetchGet) to check token expiry during each 'GET' request and initiate token refresh
///////////////////////////////////////////////////////////

const useFetchGet = () => {
  let history = useHistory();
  const config = {};

  let { authTokens, setAuthTokens, setUser } = useContext(AuthContext);

  const baseURL = "http://127.0.0.1:8000";

  const originalRequest = async (url, config) => {
    url = `${baseURL}${url}`;
    let res = await fetch(url, config);
    let data = await res.json();
    console.log("GETTING:", data); // Console Log
    return { res, data };
  };

  const refreshToken = async (authTokens) => {
    let res = await fetch("http://127.0.0.1:8000/auth/refreshtoken/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });
    let data = await res.json();
    localStorage.setItem("authTokens", JSON.stringify(data));
    setAuthTokens(data);
    setUser(jwt_decode(data.access));
    return data;
  };

  const callFetchGet = async (url) => {
    // get current access token's expiry date by decoding access token
    const user = jwt_decode(authTokens.access);

    // compare access token expiry date and current date (<1 -> expired)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    // Display token expiry details
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

    //Proceed with request
    config["headers"] = {
      Authorization: `Bearer ${authTokens?.access}`,
    };
    config["mode"] = "cors";

    let { res, data } = await originalRequest(url, config);
    return { res, data };
  };

  return callFetchGet;
};

export default useFetchGet;
