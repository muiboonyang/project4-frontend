import React from "react";
import styles from "./InstructorProfile.module.css";
import instructorData from "./InstructorData";
import { useParams } from "react-router";

console.log(instructorData);

const InstructorProfile = () => {
  const params = useParams();
  console.log(instructorData);

  let instructorName, instructorClass, instructorImage, instructorDescription;

  instructorData.forEach((data) => {
    if (params.name === data.name) {
      instructorName = data.name;
      instructorClass = data.class;
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
        <h5>{instructorName}</h5>
        <div className={styles.subheading}>
          <h6>{instructorClass}</h6>
        </div>
        <div className={styles.description}>{instructorDescription}</div>
      </div>
    </div>
  );
};

export default InstructorProfile;
