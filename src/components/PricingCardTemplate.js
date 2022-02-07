import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./PricingCardTemplate.module.css";

const PricingCardTemplate = (props) => {
  const price = props.pricingData.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <h2>{props.pricingData.name}</h2>
        {props.pricingData.name === "single" ? (
          <p className={styles.subtitle}>Class</p>
        ) : (
          <p className={styles.subtitle}>Classes</p>
        )}
        <h3>${price}</h3>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: props.pricingData.description,
          }}
        ></div>
      </div>
      <div className={styles.buy}>
        <NavLink to="/login">
          <button className={styles.button}>Buy</button>
        </NavLink>
      </div>
    </div>
  );
};

export default PricingCardTemplate;
