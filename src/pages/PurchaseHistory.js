import React, { useState, useContext, useEffect } from "react";
import styles from "./PurchaseHistory.module.css";
import useFetchGet from "../utils/useFetchGet";
import AuthContext from "../context/AuthContext";
import Table from "react-bootstrap/Table";

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

  ///////////////////////////////
  // Convert date format
  ///////////////////////////////

  const convertToDateFormat = (string) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const year = string.slice(0, 4);
    const month = months[string.slice(5, 7) - 1];
    const day = string.slice(8, 10);
    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
  };

  ///////////////////////////////
  // Convert time format
  ///////////////////////////////

  const convertTimeFormat = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };

  ///////////////////////////////
  // Capitalize instructor name
  ///////////////////////////////

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  /////////////////////////////////
  // Formatted data
  /////////////////////////////////

  const renderTable = transactions.map((item, idx) => {
    return (
      <tr key={idx}>
        {/* <td>{item.id}</td> */}
        <td>{idx + 1}</td>
        <td>{item.classCredit}</td>
        <td>{item.classDebit}</td>
        <td>{capitalizeFirstLetter(item.transaction_type)}</td>
        <td>{convertToDateFormat(item.date)}</td>
        <td>{convertTimeFormat(item.time)}</td>
      </tr>
    );
  });

  return (
    <div className={styles.purchaseContainer}>
      <br />
      <h2>Purchase History</h2>
      <br />

      <Table striped bordered hover variant="dark" className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableHeaders}>
            <th className={styles.tableHeader1}>S/N</th>
            <th className={styles.tableHeader2}>Class Credits</th>
            <th className={styles.tableHeader3}>Used</th>
            <th className={styles.tableHeader4}>Transaction Type</th>
            <th className={styles.tableHeader5}>Date</th>
            <th className={styles.tableHeader6}>Time</th>
          </tr>
        </thead>
        <tbody>{renderTable}</tbody>
      </Table>
    </div>
  );
};

export default Purchase;
