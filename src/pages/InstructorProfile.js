import React from "react";
import styles from "./InstructorProfile.module.css";
import instructorData from "./InstructorData";
import { useParams } from "react-router";

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
      console.log(data.class);
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
    </div>
  );
};

export default InstructorProfile;
