import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //////////////////////////////////
  // State: Auth Tokens
  //////////////////////////////////
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  // State: Current User
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  //////////////////////////////////
  // State: Loading, useHistory to redirect
  //////////////////////////////////
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  //////////////////////////////////
  // LOGIN user
  //////////////////////////////////
  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
    } else {
      alert("Login Failed!");
    }
  };

  //////////////////////////////////
  // LOGOUT user
  //////////////////////////////////
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/login");
  };

  //////////////////////////////////
  // UPDATE user
  //////////////////////////////////
  //   const updateUser = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const res = await fetch(
  //         `http://127.0.0.1:8000/personal-details/update/`,
  //         {
  //           method: "POST",
  //           mode: "cors",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             password: e.target.password.value,
  //             name: e.target.name.value,
  //             surname: e.target.surname.value,
  //           }),
  //         }
  //       );

  //       await res.json();

  //       if (res.status === 200) {
  //       } else {
  //         alert("Update Failed!");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //////////////////////////////////
  // Pass contextData into context provider
  //////////////////////////////////

  const contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  //////////////////////////////////
  // useEffect
  //////////////////////////////////

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  //////////////////////////////////
  // dont load child components until 'loading' is false
  // - to render everything out with data passed in
  //////////////////////////////////

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
