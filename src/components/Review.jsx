import axios from "axios";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Review({ userid, bookid }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  async function handleSubmit() {
    if (rating === 0 && comment === "") return;

    const review = {
      bookid,
      body: {
        reviewer: userid,
        rating,
        comment,
      },
    };

    try {
      const response = await axios.post(`${apiUrl}/reviews`, review);
      console.log(response.data);
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // Function to generate stars based on the selected rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ cursor: "pointer" }}
          onClick={() => handleStarClick(i)}
        >
          {i <= rating ? "\u2605" : "\u2606"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      style={{
        backgroundColor: "lightgrey",
        padding: "20px",
        borderRadius: "5px",
        marginBottom: "20px",
        marginTop: "20px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <div
          style={{ fontSize: "large", paddingBottom: "10px", color: "darkred" }}
        >
          Rating: <span>{generateStars()}</span>
        </div>
        <p>Levae a comment:</p>
        <span>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=" comment..."
            style={{ padding: 4 }}
          />
        </span>
      </div>
      <button onClick={() => handleSubmit()} style={{ padding: 3 }}>
        Submit Review
      </button>
    </div>
  );
}
