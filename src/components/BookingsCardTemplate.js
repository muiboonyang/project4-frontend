import React, { useContext } from "react";
import styles from "./BookingsCardTemplate.module.css";
import { NavLink } from "react-router-dom";
import useFetchDelete from "../utils/useFetchDelete";
import useFetchPost from "../utils/useFetchPost";
import AuthContext from "../context/AuthContext";

const BookingsCardTemplate = (props) => {
  let { user } = useContext(AuthContext);
  const post = useFetchPost();
  const del = useFetchDelete();

  ////////////////////////////////////
  // Cancel and refund
  ////////////////////////////////////

  const cancelAndRefund = async (e) => {
    e.preventDefault();
    try {
      ///////////////////////////////
      // POST - Refund credit
      ///////////////////////////////

      const { res } = await post(`/transactions/create/`, {
        classCredit: 1,
        transaction_type: "refund",
        user: user.user_id,
        name: user.name,
      });

      if (res.status === 200) {
        window.location.reload(false);
      } else {
        alert("Refund failed!");
      }

      ///////////////////////////////
      // POST - Cancel class
      ///////////////////////////////

      const { res2 } = await del(`/class/delete/${props.classDetails.id}`);
      if (res2.status === 200) {
        window.location.reload(false);
      } else {
        alert("Failed to drop class!");
      }

      ////////////////////////////////////
    } catch (err) {
      console.log(err);
    }
  };

  ////////////////////////////////////

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

  if (props.classDetails.class_type === "ride") {
    classRide = props.classDetails.class_type;
  } else {
    classResistance = props.classDetails.class_type;
  }

  /////////////////////////////////
  // Formatted data
  /////////////////////////////////

  let instructor = capitalizeFirstLetter(props.classDetails.class_instructor);
  let time = convertTimeFormat(props.classDetails.time);

  let date = convertToDateFormat(props.classDetails.date);
  let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(date)
  );

  ///////////////////////////
  // Combined function
  ///////////////////////////

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {classRide ? (
          <p className={styles.classRide}>{classRide}</p>
        ) : (
          <p class={styles.classResistance}>{classResistance}</p>
        )}
        <div className={styles.content}>
          <NavLink to={`/instructor/${props.classDetails.class_instructor}`}>
            <p className={styles.instructor}>{instructor}</p>
          </NavLink>
          <p>{time}</p>
          <p>{date}</p>
          <p>{day}</p>
          <p>Spot {props.classDetails.spot}</p>
        </div>
      </div>

      <div className={styles.cancel}>
        <button className={styles.button} onClick={cancelAndRefund}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingsCardTemplate;
