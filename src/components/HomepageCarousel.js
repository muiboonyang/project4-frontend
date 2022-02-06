import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./HomepageCarousel.module.css";
import Carousel from "react-bootstrap/Carousel";

const HomepageCarousel = () => {
  return (
    <>
      <Carousel
        className={styles.carousel}
        indicators={false}
        controls={false}
        pause={false}
      >
        <Carousel.Item interval={5000}>
          <NavLink to="/register">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/SPMaMQR.jpg"
              alt="HIIT-1"
            />

            <Carousel.Caption className={styles.carouselCaption}>
              <h1>Change Begins Here</h1>
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <NavLink to="/register">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/uXFcCW4.jpg"
              alt="HIIT-2"
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h1>Change Begins Here</h1>
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HomepageCarousel;
