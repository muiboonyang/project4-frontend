import React, { useContext } from "react";
import styles from "./ReviewCardTemplate.module.css";
import AuthContext from "../context/AuthContext";
import useFetchPost from "../utils/useFetchPost";

const ReviewCardTemplate = (props) => {
  let { user } = useContext(AuthContext);
  const post = useFetchPost();

  ///////////////////////////////
  // POST - Book class
  ///////////////////////////////

  const bookClass = async () => {
    const { res } = await post(`/class/create/`);
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

  ///////////////////////////////
  // Convert date format
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

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <h2>{props.schedule.class_type}</h2>
        <div className={styles.content}>
          <p>{capitalizeFirstLetter(props.schedule.class_instructor)}</p>
        </div>
        <div className={styles.postDetails}>
          <p>{convertTimeFormat(props.schedule.time)}</p>
          <p>{convertToDateFormat(props.schedule.date)}</p>
        </div>
      </div>
      {user.admin ? (
        <div className={styles.buy}>
          <button className={styles.button} onClick="">
            Book
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReviewCardTemplate;
