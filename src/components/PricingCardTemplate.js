import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./PricingCardTemplate.module.css";

import useFetchPost from "../utils/useFetchPost";
import AuthContext from "../context/AuthContext";

const PricingCardTemplate = (props) => {
  let { user } = useContext(AuthContext);
  const post = useFetchPost();

  ///////////////////////////////
  // POST - Purchase classes
  ///////////////////////////////

  const buyPackage = async (e) => {
    e.preventDefault();
    try {
      const { res } = await post(`/transactions/create/`, {
        classesPurchased: props.pricingData.credits,
        user: user.user_id,
        name: user.name,
      });

      if (res.status === 200) {
        window.location.reload(false);
      } else {
        alert("Purchase failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////////////////
  // Format price with commas
  ///////////////////////////////

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
          <button className={styles.button} onClick={buyPackage}>
            Buy
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default PricingCardTemplate;
