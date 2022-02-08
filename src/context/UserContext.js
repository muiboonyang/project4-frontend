import React, { useContext, useState, useEffect } from "react";
import useFetchGet from "../utils/useFetchGet";
import AuthContext from "../context/AuthContext";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [transactions, setTransactions] = useState("");
  let credits = transactions.classesPurchased;
  let debits = transactions.classesUsed;
  let balance = credits - debits;
  console.log(transactions);
  console.log(`Current credits: ${credits}`);
  console.log(`Current debits: ${debits}`);
  console.log(`Current balance: ${balance}`);

  const get = useFetchGet();
  let { user } = useContext(AuthContext);

  const getUserTransactions = async () => {
    try {
      const { res, data } = await get(`/transactions/view/${user.user_id}`);

      if (res.status === 200) {
        setTransactions(data);
        // console.log(data);
      } else {
        alert("Failed to retrieve transactions!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserTransactions();
    // eslint-disable-next-line
  }, []);

  //////////////////////////////////
  // Pass contextData into context provider
  //////////////////////////////////

  const contextData = {
    transactions: transactions,
    credits: credits,
    debits: debits,
  };

  //////////////////////////////////
  // dont load child components until 'loading' is false (complete)
  // - to render everything out with data passed in
  //////////////////////////////////

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export default UserContext;
