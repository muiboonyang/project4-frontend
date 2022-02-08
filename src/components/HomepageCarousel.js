import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./HomepageCarousel.module.css";
import Carousel from "react-bootstrap/Carousel";
import AuthContext from "../context/AuthContext";

const HomepageCarousel = () => {
  let { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <NavLink to="/schedule">
          <Carousel
            className={styles.carousel}
            indicators={false}
            controls={false}
            pause={false}
          >
            <Carousel.Item interval={5000} className={styles.fillscreen}>
              <img
                className="d-block w-100"
                src="https://i.imgur.com/XQoR59Z.jpg"
                alt="HIIT-1"
              />

              {/* <Carousel.Caption className={styles.carouselCaption}>
                <p>Change Begins Here</p>
              </Carousel.Caption> */}
            </Carousel.Item>

            <Carousel.Item interval={5000} className={styles.fillscreen}>
              <img
                className="d-block w-100"
                src="https://i.imgur.com/udAlChI.jpg"
                alt="HIIT-2"
              />
              {/* <Carousel.Caption className={styles.carouselCaption}>
                <p>Change Begins Here</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          </Carousel>
        </NavLink>
      ) : (
        <NavLink to="/register">
          <Carousel
            className={styles.carousel}
            indicators={false}
            controls={false}
            pause={false}
          >
            <Carousel.Item interval={5000} className={styles.fillscreen}>
              <img
                className="d-block w-100"
                src="https://i.imgur.com/XQoR59Z.jpg"
                alt="HIIT-1"
              />

              {/* <Carousel.Caption className={styles.carouselCaption}>
                <p>Change Begins Here</p>
              </Carousel.Caption> */}
            </Carousel.Item>

            <Carousel.Item interval={5000} className={styles.fillscreen}>
              <img
                className="d-block w-100"
                src="https://i.imgur.com/udAlChI.jpg"
                alt="HIIT-2"
              />
              {/* <Carousel.Caption className={styles.carouselCaption}>
                <p>Change Begins Here</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          </Carousel>
        </NavLink>
      )}
    </>
  );
};

export default HomepageCarousel;
