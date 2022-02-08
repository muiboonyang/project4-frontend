import React, { useState, useContext, useEffect } from "react";
import styles from "./PurchaseHistory.module.css";
import useFetchGet from "../utils/useFetchGet";
import AuthContext from "../context/AuthContext";

const Purchase = () => {
  let { user } = useContext(AuthContext);
  const get = useFetchGet();
  const [transactions, setTansactions] = useState([]);

  const getTransactions = async () => {
    try {
      const { res, data } = await get(`/transactions/view/${user.user_id}`);

      if (res.status === 200) {
        setTansactions(data);
      } else {
        alert("Failed to retrieve profile!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  console.log("Purchase history: ", transactions);

  const renderTable = transactions.map((item, idx) => {
    return (
      <tr key={idx}>
        {/* <td>{item.id}</td> */}
        <td>{idx + 1}</td>
        <td>{item.classCredit}</td>
        <td>{item.classDebit}</td>
        <td>{item.transaction_type}</td>
        <td>{item.date}</td>
        <td>{item.time}</td>
      </tr>
    );
  });

  return (
    <div className={styles.purchaseContainer}>
      <br />
      <h2>Purchase History</h2>
      <br />

      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableHeaders}>
            <th className={styles.tableHeader1}>S/N</th>
            <th className={styles.tableHeader2}>Credit</th>
            <th className={styles.tableHeader3}>Debit</th>
            <th className={styles.tableHeader4}>Transaction Type</th>
            <th className={styles.tableHeader5}>Date</th>
            <th className={styles.tableHeader6}>Time</th>
          </tr>
        </thead>
        <tbody>{renderTable}</tbody>
      </table>
    </div>
  );
};

export default Purchase;
