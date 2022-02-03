import { useContext } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";

let useFetch = () => {
  let config = {};

  let { authTokens, setAuthTokens, setUser } = useContext(AuthContext);

  let baseURL = "http://127.0.0.1:8000";

  let originalRequest = async (url, config) => {
    url = `${baseURL}${url}`;
    let response = await fetch(url, config);
    let data = await response.json();
    console.log("REQUESTING:", data);
    return { response, data };
  };

  let refreshToken = async (authTokens) => {
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

  let callFetch = async (url) => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) {
      authTokens = await refreshToken(authTokens);
    }

    //Proceed with request
    config["headers"] = {
      Authorization: `Bearer ${authTokens?.access}`,
    };

    let { response, data } = await originalRequest(url, config);

    if (response.statusText === "Unauthorized") {
      authTokens = await refreshToken(authTokens);

      config["headers"] = {
        Authorization: `Bearer ${authTokens?.access}`,
      };

      let newResponse = await originalRequest(url, config);
      response = newResponse.response;
      data = newResponse.data;
    }

    return { response, data };
  };

  return callFetch;
};

export default useFetch;
