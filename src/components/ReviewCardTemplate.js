import React from "react";
import styles from "./ReviewCardTemplate.module.css";

const ReviewCardTemplate = (props) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <h2>{props.reviews.title}</h2>
        <div className={styles.content}>
          <p>{props.reviews.description}</p>
        </div>
        <div className={styles.postDetails}>
          <p>Submitted by: {props.reviews.name}</p>
          <p>Date: {convertToDateFormat(props.reviews.date)}</p>
        </div>
      </div>
      <div className={styles.buy}>
        <button className={styles.button} onSubmit="">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCardTemplate;
