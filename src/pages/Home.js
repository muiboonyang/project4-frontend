import React, { useState, useEffect } from "react";
// import HomepageCarousel from "../components/HomepageCarousel";
import useFetch from "../utils/useFetch";

const Home = () => {
  const [reviews, setReviews] = useState([]);

  const api = useFetch();

  const getReviews = async () => {
    const { response, data } = await api("/review/view-all/");

    if (response.status === 200) {
      setReviews(data);
    }
  };

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <br />
      {/* <div className="carousel">
        <HomepageCarousel />
      </div> */}
      <p>You are logged in to the home page!</p>

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.title}
            {review.description}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
