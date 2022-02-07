import React, { useContext } from "react";
import styles from "./ScheduleCardTemplate.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useFetchPost from "../utils/useFetchPost";

const ReviewCardTemplate = (props) => {
  let { user } = useContext(AuthContext);
  const post = useFetchPost();

  ///////////////////////////////
  // POST - Book class
  ///////////////////////////////

  const bookClass = async (e) => {
    e.preventDefault();

    try {
      const { res, data } = await post(`/class/book/`, {
        class_type: props.schedule.class_type,
        class_instructor: props.schedule.class_instructor,
        date: props.schedule.date,
        time: props.schedule.time,
        spot: props.schedule.spot[0],
        name: user.name,
        user: user.user_id,
      });

      if (res.status === 200) {
        console.log(data);
        window.location.reload(false);
      } else {
        alert("Failed to book class!");
      }
    } catch (err) {
      console.log(err);
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

  ////////////////////////////////
  // Conditional formatting
  ////////////////////////////////

  let classRide, classResistance;

  if (props.schedule.class_type === "ride") {
    classRide = props.schedule.class_type;
  } else {
    classResistance = props.schedule.class_type;
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {classRide ? (
          <p className={styles.classRide}>{classRide}</p>
        ) : (
          <p class={styles.classResistance}>{classResistance}</p>
        )}
        <div className={styles.content}>
          <p>{capitalizeFirstLetter(props.schedule.class_instructor)}</p>
          <p>{convertTimeFormat(props.schedule.time)}</p>
          <p>{convertToDateFormat(props.schedule.date)}</p>
        </div>
      </div>

      {user.admin ? (
        <div className={styles.book}>
          <button className={styles.button} onClick={bookClass}>
            Book
          </button>
        </div>
      ) : (
        <div className={styles.book}>
          <NavLink to="/login">
            <button className={styles.button}>Book</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ReviewCardTemplate;
