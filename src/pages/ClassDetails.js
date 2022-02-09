import React, { useContext, useEffect, useState } from "react";
import styles from "./ClassDetails.module.css";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import useFetchPost from "../utils/useFetchPost";
import useFetchGet from "../utils/useFetchGet";
import AuthContext from "../context/AuthContext";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

const ClassDetails = () => {
  let history = useHistory();
  const params = useParams();
  const post = useFetchPost();
  let { user } = useContext(AuthContext);

  ///////////////////////////////
  // Get Class Layout
  ///////////////////////////////

  const [classLayout, setClassLayout] = useState([]);
  const [classFormattedDate, setClassFormattedDate] = useState("");
  const [classFormattedTime, setClassFormattedTime] = useState("");
  const [classDay, setClassDay] = useState("");

  const get = useFetchGet();

  const getClassLayout = async () => {
    try {
      const { res, data } = await get(`/layout/view/${params.id}`);

      if (res.status === 200) {
        setClassLayout(data);
        setClassFormattedTime(convertTimeFormat(data.time));
        setClassFormattedDate(convertToDateFormat(data.date));
        setClassDay(
          new Intl.DateTimeFormat("en-US", {
            weekday: "long",
          }).format(new Date(data.date))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getClassLayout();
    // eslint-disable-next-line
  }, []);

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
  // POST - Book class
  // To-do: pass to custom route (ClassDetails)
  ///////////////////////////////

  const bookClassAndDeduct = async (e) => {
    e.preventDefault();
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
        class_type: classLayout.class_type,
        class_instructor: classLayout.class_instructor,
        date: classLayout.date,
        time: classLayout.time,
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
          {classLayout.class_type === "ride" ? (
            <p className={styles.classRide}>{classLayout.class_type}</p>
          ) : (
            <p className={styles.classResistance}>{classLayout.class_type}</p>
          )}
          <p className={styles.name}>
            {classDay}, {classFormattedDate}, {classFormattedTime}
          </p>
          <NavLink to={`/instructor/${classLayout.class_instructor}`}>
            <p className={styles.instructor}>{classLayout.class_instructor}</p>
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
