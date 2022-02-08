import React, { useContext, useEffect, useState } from "react";
import styles from "./Bookings.module.css";
import BookingsCardTemplate from "../components/BookingsCardTemplate";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import useFetchGet from "../utils/useFetchGet";
import { v4 as uuidv4 } from "uuid";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  let { user } = useContext(AuthContext);
  let { transactions } = useContext(UserContext); // to refund class to user if they cancel
  const get = useFetchGet();

  ///////////////////////////////
  // GET - Get all classes
  ///////////////////////////////

  const getClasses = async () => {
    const { res, data } = await get(`/class/view/${user.user_id}`);
    if (res.status === 200) {
      setBookings(data);
    }
  };

  useEffect(() => {
    getClasses();
    // eslint-disable-next-line
  }, []);

  console.log(transactions);

  return (
    <div className={styles.classesContainer}>
      <br />
      <h2>Booking History</h2>
      <br />

      <div className={styles.container}>
        {bookings.map((classDetails) => {
          return (
            <div key={uuidv4()}>
              <BookingsCardTemplate classDetails={classDetails} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookings;
