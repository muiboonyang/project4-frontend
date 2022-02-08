import React, { useContext } from "react";
import styles from "./ScheduleCardTemplate.module.css";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useFetchPost from "../utils/useFetchPost";

const ScheduleCardTemplate = (props) => {
  let { user } = useContext(AuthContext);
  let history = useHistory();
  const post = useFetchPost();

  ///////////////////////////////
  // POST - Book class
  // To-do: pass to custom route (ClassDetails)
  ///////////////////////////////

  const bookClass = async (e) => {
    e.preventDefault();
    let randomSpot = Math.floor(Math.random() * 30); // Random number from 0 to 29
    try {
      const { res } = await post(`/class/book/`, {
        class_type: props.schedule.class_type,
        class_instructor: props.schedule.class_instructor,
        date: props.schedule.date,
        time: props.schedule.time,
        spot: props.schedule.spot[randomSpot],
        name: user.name,
        user: user.user_id,
      });

      if (res.status === 200) {
        history.push("/classes");
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
  // Convert time format
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

  /////////////////////////////////
  // Formatted data
  /////////////////////////////////

  let instructor = capitalizeFirstLetter(props.schedule.class_instructor);
  let time = convertTimeFormat(props.schedule.time);
  let date = convertToDateFormat(props.schedule.date);
  let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(date)
  );

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {classRide ? (
          <p className={styles.classRide}>{classRide}</p>
        ) : (
          <p class={styles.classResistance}>{classResistance}</p>
        )}
        <div className={styles.content}>
          <NavLink to={`/instructor/${props.schedule.class_instructor}`}>
            <p className={styles.instructor}>{instructor}</p>
          </NavLink>
          <p>{time}</p>
          <p>{date}</p>
          <p>{day}</p>
        </div>
      </div>

      {user ? (
        <div className={styles.book}>
          <NavLink to={`/class/${props.schedule.id}`}>
            <button className={styles.button}>
              {/* <button className={styles.button} onClick={bookClass}> */}
              Book
            </button>
          </NavLink>
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

export default ScheduleCardTemplate;
