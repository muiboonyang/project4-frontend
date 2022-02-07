import React from "react";
import styles from "./Schedule.module.css";
import ScheduleCardTemplate from "../components/ScheduleCardTemplate";
import scheduleData from "./ScheduleData";
import { v4 as uuidv4 } from "uuid";

const Schedule = () => {
  return (
    <div className={styles.scheduleContainer}>
      <br />
      <h2>Schedule</h2>
      <br />
      <div className={styles.container}>
        {scheduleData.map((schedule) => {
          return (
            <div key={uuidv4()}>
              <ScheduleCardTemplate schedule={schedule} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
