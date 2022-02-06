import React from "react";
import styles from "./Instructors.module.css";
import { v4 as uuidv4 } from "uuid";

import InstructorCardTemplate from "../components/InstructorCardTemplate";
import instructorData from "./InstructorData";

const Instructors = () => {
  return (
    <div className={styles.instructorsContainer}>
      <br />
      <h2>Instructors</h2>

      <div className={styles.container}>
        {instructorData.map((cardData) => {
          return (
            <div key={uuidv4()}>
              <InstructorCardTemplate cardData={cardData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Instructors;
