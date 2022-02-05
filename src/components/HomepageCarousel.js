import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./HomepageCarousel.module.css";
import Carousel from "react-bootstrap/Carousel";

const HomepageCarousel = () => {
  return (
    <>
      <Carousel className={styles.carousel}>
        <Carousel.Item interval={5000}>
          <NavLink to="/register">
            <img
              controls={false}
              fade="true"
              indicators="false"
              className="d-block w-100"
              src="https://www.active8me.com/wp-content/uploads/2018/05/active8me-top-5-types-of-workouts-that-are-taking-asia-by-storm-HIIT.jpg"
              alt="HIIT-1"
            />

            <Carousel.Caption className={styles.carouselCaption}>
              <h1>CHANGE BEGINS HERE</h1>
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <NavLink to="/register">
            <img
              controls={false}
              fade="true"
              indicators="false"
              className="d-block w-100"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/701/one-change-improve-hiit-workout-preformance-1513345031.jpg"
              alt="HIIT-2"
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h1>CHANGE BEGINS HERE</h1>
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <NavLink to="/register">
            <img
              controls={false}
              fade="true"
              indicators="false"
              className="d-block w-100"
              src="https://lmimirror3pvr.azureedge.net/static/media/7629/b2122d53-8a63-451b-a8d9-5fee049f1ef0/hiit_960x540-v2.jpg"
              alt="HIIT-3"
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h1>CHANGE BEGINS HERE</h1>
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HomepageCarousel;
