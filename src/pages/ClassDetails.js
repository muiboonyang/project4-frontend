import React, { useContext, useEffect, useState } from "react";
import styles from "./ClassDetails.module.css";
import scheduleData from "./ScheduleData";
import { useParams } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
import useFetchPost from "../utils/useFetchPost";
import AuthContext from "../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

const ClassDetails = () => {
  let history = useHistory();
  const params = useParams();
  const post = useFetchPost();
  let { user } = useContext(AuthContext);

  const [instructorName, setInstructorName] = useState("");
  const [classType, setClassType] = useState("");
  const [classDate, setClassDate] = useState("");
  const [classFormattedDate, setClassFormattedDate] = useState("");
  const [classTime, setClassTime] = useState("");
  const [classFormattedTime, setClassFormattedTime] = useState("");
  const [classDay, setClassDay] = useState("");

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

  const populateData = () => {
    scheduleData.forEach((data) => {
      if (parseInt(params.id) === data.id) {
        if (data.class_type === "ride") {
          setClassType(data.class_type);
        } else {
          setClassType(data.class_type);
        }
        setInstructorName(data.class_instructor);
        setClassFormattedTime(convertTimeFormat(data.time));
        setClassFormattedDate(convertToDateFormat(data.date));
        setClassTime(data.time);
        setClassDate(data.date);
        setClassDay("Tuesday");
        setClassDay(
          new Intl.DateTimeFormat("en-US", {
            weekday: "long",
          }).format(new Date(data.date))
        );
      }
    });
  };

  useEffect(() => {
    populateData();
    // eslint-disable-next-line
  }, []);

  ///////////////////////////////
  // POST - Book class
  // To-do: pass to custom route (ClassDetails)
  ///////////////////////////////

  const bookClassAndDeduct = async (e) => {
    e.preventDefault();

    let randomSpot = Math.floor(Math.random() * 30) + 1; // Random number from 1 to 30
    try {
      ///////////////////////////////
      // POST - Deduct credit
      ///////////////////////////////

      const { res } = await post(`/transactions/create/`, {
        classDebit: 1,
        transaction_type: "booking",
        user: user.user_id,
        name: user.name,
      });

      ///////////////////////////////
      // POST - Add class to bookings
      ///////////////////////////////

      const { res2 } = await post(`/class/book/`, {
        class_type: classType,
        class_instructor: instructorName,
        date: classDate,
        time: classTime,
        spot: e.target.value,
        name: user.name,
        user: user.user_id,
      });

      if (res.status || res2.status === 200) {
        history.push("/bookings");
        window.location.reload(false);
      } else {
        alert("Booking failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.classDetailsContainer}>
      <br />
      <h2>Class Details</h2>
      <div className={styles.classHeader}>
        <div className={styles.backButton}>
          <button onClick={history.goBack} className={styles.backButton}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className={styles.backButton}
            />
          </button>
        </div>

        <div className={styles.title}>
          {classType === "ride" ? (
            <p className={styles.classRide}>{classType}</p>
          ) : (
            <p className={styles.classResistance}>{classType}</p>
          )}
          <p className={styles.name}>
            {classDay}, {classFormattedDate}, {classFormattedTime}
          </p>
          <p className={styles.name}>{instructorName}</p>

          <NavLink to="/bookings">
            <button className={styles.button} onClick={bookClassAndDeduct}>
              Book
            </button>
          </NavLink>
        </div>
      </div>

      <div className={styles.layoutContainer}>
        <div className={styles.gymRow0}>
          <p>Instructor</p>
        </div>

        <div className={styles.gymRow1}>
          <button value="1" onClick={bookClassAndDeduct}>
            1
          </button>
          <button value="2" onClick={bookClassAndDeduct}>
            2
          </button>
          <button value="3" onClick={bookClassAndDeduct}>
            3
          </button>
          <button value="4" onClick={bookClassAndDeduct}>
            4
          </button>
          <button value="5" onClick={bookClassAndDeduct}>
            5
          </button>
        </div>

        <div className={styles.gymRow2}>
          <button value="6" onClick={bookClassAndDeduct}>
            6
          </button>
          <button value="7" onClick={bookClassAndDeduct}>
            7
          </button>
          <button value="8" onClick={bookClassAndDeduct}>
            8
          </button>
          <button value="9" onClick={bookClassAndDeduct}>
            9
          </button>
          <button value="10" onClick={bookClassAndDeduct}>
            10
          </button>
        </div>

        <div className={styles.gymRow3}>
          <button value="11" onClick={bookClassAndDeduct}>
            11
          </button>
          <button value="12" onClick={bookClassAndDeduct}>
            12
          </button>
          <button value="13" onClick={bookClassAndDeduct}>
            13
          </button>
          <button value="14" onClick={bookClassAndDeduct}>
            14
          </button>
          <button value="15" onClick={bookClassAndDeduct}>
            15
          </button>
        </div>

        <div className={styles.gymRow4}>
          <button value="16" onClick={bookClassAndDeduct}>
            16
          </button>
          <button value="17" onClick={bookClassAndDeduct}>
            17
          </button>
          <button value="18" onClick={bookClassAndDeduct}>
            18
          </button>
          <button value="19" onClick={bookClassAndDeduct}>
            19
          </button>
          <button value="20" onClick={bookClassAndDeduct}>
            20
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
