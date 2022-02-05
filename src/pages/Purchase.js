import React, { useState, useEffect } from "react";
import useFetchGet from "../utils/useFetchGet";

const Purchase = () => {
  const [reviews, setReviews] = useState([]);

  const api = useFetchGet();

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
    <div>
      <p>You are logged in to the purchase page!</p>

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.title}
            {review.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchase;
