import React, { useContext, useEffect, useState } from "react";
import styles from "./ClassDetails.module.css";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import useFetchPost from "../utils/useFetchPost";
import useFetchGet from "../utils/useFetchGet";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

const ClassDetails = () => {
  let history = useHistory();
  const params = useParams();
  const post = useFetchPost();
  let { user } = useContext(AuthContext);
  let { balance } = useContext(UserContext);

  ///////////////////////////////
  // Get Class Layout
  ///////////////////////////////

  const [classLayout, setClassLayout] = useState([]);
  const [classFormattedDate, setClassFormattedDate] = useState("");
  const [classFormattedTime, setClassFormattedTime] = useState("");
  const [classDay, setClassDay] = useState("");

  const [spotOne, setSpotOne] = useState("");
  const [spotTwo, setSpotTwo] = useState("");
  const [spotThree, setSpotThree] = useState("");
  const [spotFour, setSpotFour] = useState("");
  const [spotFive, setSpotFive] = useState("");
  const [spotSix, setSpotSix] = useState("");
  const [spotSeven, setSpotSeven] = useState("");
  const [spotEight, setSpotEight] = useState("");
  const [spotNine, setSpotNine] = useState("");
  const [spotTen, setSpotTen] = useState("");
  const [spotEleven, setSpotEleven] = useState("");
  const [spotTwelve, setSpotTwelve] = useState("");
  const [spotThirteen, setSpotThirteen] = useState("");
  const [spotFourteen, setSpotFourteen] = useState("");
  const [spotFifteen, setSpotFifteen] = useState("");
  const [spotSixteen, setSpotSixteen] = useState("");
  const [spotSeventeen, setSeventeen] = useState("");
  const [spotEighteen, setSpotEighteen] = useState("");
  const [spotNinteen, setSpotNineteen] = useState("");
  const [spotTwenty, setSpotTwenty] = useState("");

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

        setSpotOne(data.spot_one_booked);
        setSpotTwo(data.spot_two_booked);
        setSpotThree(data.spot_three_booked);
        setSpotFour(data.spot_four_booked);
        setSpotFive(data.spot_five_booked);
        setSpotSix(data.spot_six_booked);
        setSpotSeven(data.spot_seven_booked);
        setSpotEight(data.spot_eight_booked);
        setSpotNine(data.spot_nine_booked);
        setSpotTen(data.spot_ten_booked);
        setSpotEleven(data.spot_eleven_booked);
        setSpotTwelve(data.spot_twelve_booked);
        setSpotThirteen(data.spot_thirteen_booked);
        setSpotFourteen(data.spot_fourteen_booked);
        setSpotFifteen(data.spot_fifteen_booked);
        setSpotSixteen(data.spot_sixteen_booked);
        setSeventeen(data.spot_seventeen_booked);
        setSpotEighteen(data.spot_eighteen_booked);
        setSpotNineteen(data.spot_nineteen_booked);
        setSpotTwenty(data.spot_twenty_booked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getClassLayout();
    // eslint-disable-next-line
  }, []);

  // console.log(typeof spotOne); // false (boolean)

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

    if (e.target.name > balance) {
      history.push("/pricing");
    } else {
      try {
        ///////////////////////////////
        // POST - Deduct credit
        ///////////////////////////////

        const { res } = await post(`/transactions/create/`, {
          classDebit: e.target.name,
          transaction_type: "booking",
          user: user.user_id,
          name: user.name,
        });

        ///////////////////////////////
        // POST - Update class layout, grey out spot
        ///////////////////////////////

        const { res2 } = await post(`/layout/update/${params.id}`, {
          button_id: e.target.id,
        });

        ///////////////////////////////
        // POST - Add class to bookings
        ///////////////////////////////

        const { res3 } = await post(`/class/book/`, {
          class_type: classLayout.class_type,
          class_instructor: classLayout.class_instructor,
          date: classLayout.date,
          time: classLayout.time,
          spot: e.target.value,
          spot_name: e.target.id,
          name: user.name,
          user: user.user_id,
          class_id: classLayout.id,
        });

        if (res.status || res2.status || res3.status === 200) {
          history.push("/bookings");
          window.location.reload(false);
        } else {
          alert("Booking failed!");
        }
      } catch (err) {
        console.log(err);
      }
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
          {!spotOne ? (
            <button id="one" value="1" name="30" onClick={bookClassAndDeduct}>
              1
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotTwo ? (
            <button id="two" value="2" name="40" onClick={bookClassAndDeduct}>
              2
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotThree ? (
            <button id="three" value="3" name="50" onClick={bookClassAndDeduct}>
              3
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotFour ? (
            <button id="four" value="4" name="40" onClick={bookClassAndDeduct}>
              4
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotFive ? (
            <button id="five" value="5" name="30" onClick={bookClassAndDeduct}>
              5
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
        </div>

        <div className={styles.gymRow2}>
          {!spotSix ? (
            <button id="six" value="6" name="20" onClick={bookClassAndDeduct}>
              6
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotSeven ? (
            <button id="seven" value="7" name="20" onClick={bookClassAndDeduct}>
              7
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotEight ? (
            <button id="eight" value="8" name="20" onClick={bookClassAndDeduct}>
              8
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotNine ? (
            <button id="nine" value="9" name="20" onClick={bookClassAndDeduct}>
              9
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotTen ? (
            <button id="ten" value="10" name="20" onClick={bookClassAndDeduct}>
              10
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
        </div>

        <div className={styles.gymRow3}>
          {!spotEleven ? (
            <button
              id="eleven"
              value="11"
              name="10"
              onClick={bookClassAndDeduct}
            >
              11
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotTwelve ? (
            <button
              id="twelve"
              value="12"
              name="10"
              onClick={bookClassAndDeduct}
            >
              12
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotThirteen ? (
            <button
              id="thirteen"
              value="13"
              name="10"
              onClick={bookClassAndDeduct}
            >
              13
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotFourteen ? (
            <button
              id="fourteen"
              value="14"
              name="10"
              onClick={bookClassAndDeduct}
            >
              14
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotFifteen ? (
            <button
              id="fifteen"
              value="15"
              name="10"
              onClick={bookClassAndDeduct}
            >
              15
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
        </div>

        <div className={styles.gymRow4}>
          {!spotSixteen ? (
            <button
              id="sixteen"
              value="16"
              name="1"
              onClick={bookClassAndDeduct}
            >
              16
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotSeventeen ? (
            <button
              id="seventeen"
              value="17"
              name="1"
              onClick={bookClassAndDeduct}
            >
              17
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotEighteen ? (
            <button
              id="eighteen"
              value="18"
              name="1"
              onClick={bookClassAndDeduct}
            >
              18
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotNinteen ? (
            <button
              id="nineteen"
              value="19"
              name="1"
              onClick={bookClassAndDeduct}
            >
              19
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
          {!spotTwenty ? (
            <button
              id="twenty"
              value="20"
              name="1"
              onClick={bookClassAndDeduct}
            >
              20
            </button>
          ) : (
            <button className={styles.booked} disabled>
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
