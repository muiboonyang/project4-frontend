import React, { useContext, useEffect, useState } from "react";
import styles from "./Classes.module.css";
import ClassCardTemplate from "../components/ClassCardTemplate";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import useFetchGet from "../utils/useFetchGet";
import { v4 as uuidv4 } from "uuid";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  let { user } = useContext(AuthContext);
  let { transactions } = useContext(UserContext);
  const get = useFetchGet();

  ///////////////////////////////
  // GET - Get all classes
  ///////////////////////////////

  const getClasses = async () => {
    const { res, data } = await get(`/class/view/${user.user_id}`);
    if (res.status === 200) {
      //   setReviews(data);
      setClasses(data);
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
      <h2>My Classes</h2>
      <br />

      <div className={styles.container}>
        {classes.map((classDetails) => {
          return (
            <div key={uuidv4()}>
              <ClassCardTemplate classDetails={classDetails} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classes;
