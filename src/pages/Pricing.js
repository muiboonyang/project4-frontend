import React, { useContext } from "react";
import styles from "./Pricing.module.css";
import { v4 as uuidv4 } from "uuid";
import PricingCardTemplate from "../components/PricingCardTemplate";
import pricingData from "./PricingData";
import useFetchPost from "../utils/useFetchPost";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

const Pricing = () => {
  let { user } = useContext(AuthContext);
  let { transactions } = useContext(UserContext);

  const post = useFetchPost();
  ///////////////////////////////
  // POST - Purchase classes
  ///////////////////////////////

  const createReview = async (e) => {
    e.preventDefault();

    try {
      const { res, data } = await post(`/review/create/`, {
        title: e.target.title.value,
        description: e.target.description.value,
        user: user.user_id,
        name: user.name,
      });

      if (res.status === 200) {
        console.log(data);
        window.location.reload(false);
      } else {
        alert("Failed to create review!");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
