import { useContext } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";

////////////////////////////////////////////////////////////
// Custom hook (useFetchGet) to check token expiry during each 'GET' request and initiate token refresh
///////////////////////////////////////////////////////////

const useFetchGet = () => {
  const config = {};

  let { authTokens, setAuthTokens, setUser } = useContext(AuthContext);

  const baseURL = "http://127.0.0.1:8000";

  const originalRequest = async (url, config) => {
    url = `${baseURL}${url}`;
    let response = await fetch(url, config);
    let data = await response.json();
    console.log("GETTING:", data);
    return { response, data };
  };

  const refreshToken = async (authTokens) => {
    let response = await fetch("http://127.0.0.1:8000/auth/refreshtoken/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });
    let data = await response.json();
    localStorage.setItem("authTokens", JSON.stringify(data));
    setAuthTokens(data);
    setUser(jwt_decode(data.access));
    return data;
  };

  const callFetch = async (url) => {
    // get access token expiry date
    const user = jwt_decode(authTokens.access);
    // compare access token expiry date and current date (<1 -> expired)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    // Token expiry details
    // console.log(`Access Token expiring on: ${dayjs.unix(user.exp)}`);
    // console.log(`Time now: ${dayjs()}`);
    // console.log(
    //   `Access Token remaining validity: ${
    //     dayjs.unix(user.exp).diff(dayjs()) / 1000
    //   } seconds`
    // );

    // Initiate token refresh when access token has expired, to get new access token
    if (isExpired) {
      authTokens = await refreshToken(authTokens);
    }

    //Proceed with request
    config["headers"] = {
      Authorization: `Bearer ${authTokens?.access}`,
    };

    let { response, data } = await originalRequest(url, config);
    return { response, data };
  };

  return callFetch;
};

export default useFetchGet;