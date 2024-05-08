import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

function Comment({ comment }) {
  return (
    <div
      style={{ border: "1px solid black", marginTop: "5px", padding: "5px" }}
    >
      <p>{comment}</p>
    </div>
  );
}

export default function ShowReview({ bookid }) {
  const [reviews, setReviews] = useState();
  const [stars, setStars] = useState("");
  const [emptyStars, setEmptyStars] = useState("");
  const [showComment, setShowComment] = useState(false);

  // fetching a book rating from api
  useEffect(() => {
    async function fetchRating() {
      try {
        const response = await axios.get(`${apiUrl}/reviews?id=${bookid}`);
        const fetchedRating = response.data.rating;
        setReviews(response.data.reviews);

        const stars = "★".repeat(Math.round(fetchedRating)); // Red stars for the overall rating
        const emptyStars = "★".repeat(5 - Math.round(fetchedRating)); // Empty stars for the remaining rating
        setStars(stars);
        setEmptyStars(emptyStars);
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
    fetchRating();
  }, [bookid]);

  return (
    <div>
      <p style={{ fontSize: "large", color: "darkred" }}>
        Rating: <span style={{ color: "red" }}>{stars}</span>
        {emptyStars}
        {reviews && (
          <span style={{ marginLeft: "5px" }}>{reviews.length} Reviews</span>
        )}
      </p>
      <button
        style={{
          backgroundColor: "aliceblue",
          padding: "3px",
        }}
        onClick={() => setShowComment(!showComment)}
      >
        Comments
      </button>
      {showComment && (
        <div
          style={{
            borderTop: "1px solid black",
            marginTop: "10px",
            backgroundColor: "aliceblue",
            height: "300px",
            width: "300px",
            overflowY: "auto",
          }}
        >
          <p style={{ padding: "10px", color: "darkred", fontSize: "large" }}>
            Comments:
          </p>
          <div>
            {reviews.map((review) => (
              <Comment key={review._id} comment={review.comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
