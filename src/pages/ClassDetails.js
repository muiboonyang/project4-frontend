import React from "react";
import styles from "./ClassDetails.module.css";
import scheduleData from "./ScheduleData";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const ClassDetails = () => {
  let history = useHistory();
  const params = useParams();

  let instructorName,
    classRide,
    classResistance,
    classDate,
    classTime,
    classDay;

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
  // useParams
  ///////////////////////////////

  scheduleData.forEach((data) => {
    if (parseInt(params.id) === data.id) {
      if (data.class_type === "ride") {
        classRide = data.class_type;
      } else {
        classResistance = data.class_type;
      }
      instructorName = data.class_instructor;
      classTime = convertTimeFormat(data.time);
      classDate = convertToDateFormat(data.date);
      classDay = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(new Date(classDate));
    }
  });

  return (
    <div className={styles.classDetailsContainer}>
      <br />
      <h2>Class Details</h2>

      <div className={styles.container}>
        <div className={styles.leftColumn}>Left Column</div>

        <div className={styles.rightColumn}>
          <p className={styles.name}>{instructorName}</p>
          {classRide ? (
            <p className={styles.classRide}>{classRide}</p>
          ) : (
            <p className={styles.classResistance}>{classResistance}</p>
          )}
          <div className={styles.description}>
            <p>{classDay}</p>
            <p>{classDate}</p>
            <p>{classTime}</p>
          </div>
        </div>

        <div>
          <button onClick={history.goBack} className={styles.backButton}>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={styles.backButton}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
