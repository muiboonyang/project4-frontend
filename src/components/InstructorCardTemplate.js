import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./InstructorCardTemplate.module.css";

const InstructorCardTemplate = (props) => {
  return (
    <div className={styles.container}>
      <NavLink to={`instructor/${props.cardData.name}`}>
        <div className={styles.detailsContainer}>
          <img src={props.cardData.cardImage} alt={`${props.cardData.name}`} />
          <div>
            <h2>{props.cardData.name}</h2>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default InstructorCardTemplate;
