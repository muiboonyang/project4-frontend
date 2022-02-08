import React from "react";
import styles from "./Purchase.module.css";

const Purchase = () => {
  return (
    <div className={styles.purchaseContainer}>
      <br />
      <h2>Purchase History</h2>
      <br />
      <p>
        Credit history, debit history, check if balance more than 0 before
        allowing users to book
      </p>
    </div>
  );
};

export default Purchase;
