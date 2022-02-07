import React from "react";
import styles from "./Pricing.module.css";
import { v4 as uuidv4 } from "uuid";

import PricingCardTemplate from "../components/PricingCardTemplate";
import pricingData from "./PricingData";

const Pricing = () => {
  return (
    <div className={styles.pricingContainer}>
      <br />
      <h2>Pricing</h2>
      <div className={styles.container}>
        {pricingData.map((pricingData) => {
          return (
            <div key={uuidv4()}>
              <PricingCardTemplate pricingData={pricingData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
