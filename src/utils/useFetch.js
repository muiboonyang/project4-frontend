import { useContext } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";

const useFetch = () => {
  const config = {};

  let { authTokens, setAuthTokens, setUser } = useContext(AuthContext);

  const baseURL = "http://127.0.0.1:8000";

  const originalRequest = async (url, config) => {
    url = `${baseURL}${url}`;
    let response = await fetch(url, config);
    let data = await response.json();
    console.log("REQUESTING:", data);
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
    return { response, data };
  };

  return callFetch;
};

export default useFetch;
