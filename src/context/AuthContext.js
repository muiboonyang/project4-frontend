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
  // State: Loading / useHistory to redirect
  //////////////////////////////////
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  //////////////////////////////////
  // LOGIN user
  //////////////////////////////////
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await res.json();

    if (res.status === 200) {
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
  //   const logoutUser = () => {
  //     setAuthTokens(null);
  //     setUser(null);
  //     localStorage.removeItem("authTokens");
  //     history.push("/login");
  //   };

  //////////////////////////////////
  // LOGOUT user + BLACKLIST token
  //////////////////////////////////

  const logoutUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 200) {
      history.push("/");
      setUser(null);
      localStorage.removeItem("authTokens");
    } else {
      alert("Logout Failed!");
    }
  };

  //////////////////////////////////
  // Pass contextData into context provider
  //////////////////////////////////

  const contextData = {
    user: user,
    setUser: setUser,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  //////////////////////////////////
  // useEffect
  // - re-render when there is change in authToken / loading state
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
