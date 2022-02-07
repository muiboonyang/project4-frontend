import React, { useContext } from "react";
import styles from "./ReviewCardTemplate.module.css";
import AuthContext from "../context/AuthContext";
import useFetchDelete from "../utils/useFetchDelete";

const ReviewCardTemplate = (props) => {
  let { user } = useContext(AuthContext);
  const del = useFetchDelete();

  ///////////////////////////////
  // DELETE - Delete specific review
  ///////////////////////////////

  const deleteReview = async () => {
    const { res } = await del(`/review/delete/${props.reviews.id}`);
    if (res.status === 200) {
      window.location.reload(false);
    }
  };

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
      {user.admin ? (
        <div className={styles.buy}>
          <button className={styles.button} onClick={deleteReview}>
            Delete
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReviewCardTemplate;
