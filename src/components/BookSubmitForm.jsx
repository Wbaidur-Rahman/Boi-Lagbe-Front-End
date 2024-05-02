import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/BookSubmitFormModule.css";

const apiUrl = import.meta.env.VITE_API_URL;

const categoryOptions = ["Academic", "Poem", "Novel", "Gk", "Others"];
const bookGenreKeys = [
  // Fiction genres
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Horror",
  "Thriller",
  "Historical Fiction",
  // Non-Fiction genres
  "Biography",
  "Autobiography",
  "History",
  "Science",
  "Self-Help",
  "Memoir",
];

export default function BookSubmitForm() {
  // Extracting query parameters using useLocation hook
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userid = queryParams.get("id");

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorNameError, setAuthorNameError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [category, setCategory] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [isbnError, setIsbnError] = useState("");
  const [pages, setPages] = useState("");
  const [pagetype, setPagetype] = useState("");
  const [coverImage, setCoverImage] = useState(null); // State for cover image

  function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const formData = new FormData();
    formData.append("ownerid", userid);
    formData.append("title", title);
    formData.append("data[author]", authorName);
    formData.append("data[price]", price);
    formData.append("data[category]", category);
    formData.append("data[genre]", genre);
    formData.append("data[isbn]", isbn);
    formData.append("data[pages]", pages);
    formData.append("data[pagetype]", pagetype);
    formData.append("cover", coverImage); // Append cover image to FormData

    // Make an HTTP POST request to your server endpoint
    axios
      .post(`${apiUrl}/books`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });

        setAuthorName("");
        setTitle("");
        setPrice("");
        setCategory("");
        setGenre("");
        setIsbn("");
        setPages("");
        setPagetype("");
        setCoverImage(null);
      })
      .catch((error) => {
        const errors = error.response.data.errors;

        if (errors.title) {
          setTitleError(errors.title.msg);
        }
        if (errors["data.author"]) {
          setAuthorNameError(errors["data.author"].msg);
        }
        if (errors["data.price"]) {
          setPriceError(errors["data.price"].msg);
        }
        if (errors["data.isbn"]) {
          setIsbnError(errors["data.isbn"].msg);
        }

        if (errors["data.category"] || errors["data.genre"]) {
          toast.error("All the necessary fields should be filled up", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
        if (errors["cover"]) {
          toast.error(errors.cover.msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      });
  }

  return (
    <div className="book-submit-content">
      <ToastContainer />
      <form id="form" onSubmit={handleSubmit}>
        <ul>
          <h2>Add a book</h2>
        </ul>
        <ul>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
          />
          {titleError && <span>{titleError}</span>}
        </ul>
        <ul>
          <input
            type="text"
            placeholder="Enter author name"
            value={authorName}
            onChange={(e) => {
              setAuthorName(e.target.value);
              setAuthorNameError("");
            }}
          />
          {authorNameError && <span>{authorNameError}</span>}
        </ul>
        <ul>
          <input
            type="number"
            placeholder="Enter price(taka)"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setPriceError("");
            }}
          />
          {priceError && <span>{priceError}</span>}
        </ul>
        <ul>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Select category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </ul>
        <ul>
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option value="">Select genre</option>
            {bookGenreKeys.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </ul>
        <ul>
          <input
            type="text"
            placeholder="Enter ISBN (optional)"
            value={isbn}
            onChange={(e) => {
              setIsbn(e.target.value);
              setIsbnError("");
            }}
          />
          {isbn && isbnError && <span>{isbnError}</span>}
        </ul>
        <ul>
          <input
            type="number"
            placeholder="Enter total page (optional)"
            value={pages}
            onChange={(e) => {
              setPages(e.target.value);
            }}
          />
        </ul>
        <ul>
          <select
            value={pagetype}
            onChange={(e) => {
              setPagetype(e.target.value);
            }}
          >
            <option value="">Page type</option>
            {["White", "News"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </ul>
        <ul>
          <p>Please upload a Cover-Photo</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setCoverImage(e.target.files[0]); // Set cover image to the selected file
            }}
          />
        </ul>
        <ul>
          <button type="submit">Submit</button>
        </ul>
      </form>
    </div>
  );
}
