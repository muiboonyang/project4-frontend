import React, { useState, useEffect, useContext } from "react";
// import HomepageCarousel from "../components/HomepageCarousel";
import AuthContext from "../context/AuthContext";
import useFetch from "../utils/useFetch";

const Home = () => {
  let [reviews, setReviews] = useState([]);

  let api = useFetch();

  useEffect(() => {
    getReviews();
  }, []);

  let getReviews = async () => {
    let { response, data } = await api("/review/view-all/");

    if (response.status === 200) {
      setReviews(data);
    }
  };

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
