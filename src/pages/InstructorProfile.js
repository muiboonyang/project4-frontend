import React from "react";
import styles from "./InstructorProfile.module.css";
import instructorData from "./InstructorData";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const InstructorProfile = () => {
  const params = useParams();

  let instructorName,
    instructorClassRide,
    instructorClassResistance,
    instructorImage,
    instructorDescription;

  instructorData.forEach((data) => {
    if (params.name === data.name) {
      instructorName = data.name;

      if (data.class === "ride") {
        instructorClassRide = data.class;
      } else {
        instructorClassResistance = data.class;
      }
      instructorImage = data.profileImage;
      instructorDescription = data.description;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={instructorImage} alt={`${instructorName}`} />
      </div>

      <div className={styles.rightColumn}>
        <p className={styles.name}>{instructorName}</p>
        {instructorClassRide ? (
          <p className={styles.class1}>{instructorClassRide}</p>
        ) : (
          <p className={styles.class2}>{instructorClassResistance}</p>
        )}
        <div className={styles.description}>{instructorDescription}</div>
      </div>

      <div>
        <NavLink to="/instructors">
          <FontAwesomeIcon icon={faTimesCircle} className={styles.backButton} />
        </NavLink>
      </div>
    </div>
  );
};

export default InstructorProfile;
