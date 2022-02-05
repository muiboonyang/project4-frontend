import React, { useState, useEffect, useContext } from "react";
import styles from "./Reviews.module.css";
import Form from "react-bootstrap/Form";
import useFetchGet from "../utils/useFetchGet";
import useFetchPost from "../utils/useFetchPost";
import AuthContext from "../context/AuthContext";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  let { user } = useContext(AuthContext);

  const get = useFetchGet();
  const post = useFetchPost();

  const getReviews = async () => {
    const { res, data } = await get("/review/view-all/");

    if (res.status === 200) {
      setReviews(data);
    }
  };

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, []);

  const createReview = async (e) => {
    e.preventDefault();

    try {
      const { res, data } = await post(`/review/create/`, {
        title: e.target.title.value,
        description: e.target.description.value,
        user: user.user_id,
        name: user.name,
      });

      if (res.status === 200) {
        console.log(data);
        window.location.reload(false);
      } else {
        alert("Failed to create review!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.reviewsContainer}>
      <h3>Leave a review!</h3>

      <div className={styles.reviewsForm}>
        <form onSubmit={createReview}>
          <Form.Group className="mb-3" controlId="reviewTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              placeholder="Enter title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="reviewDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              placeholder="Enter description"
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <button className={styles.create} type="submit">
              Submit
            </button>
          </div>
        </form>

        <br />
        <ul>
          {reviews.map((review) => (
            <p key={review.id}>
              Title: {review.title}
              <br />
              Description: {review.description}
              <br />
              Date: {review.date}
              <br />
              Submitted by: {review.name}
            </p>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reviews;
