import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CategoryLink({ category, setGetCatagoryBooks }) {
  async function getBooksByCategory() {
    try {
      const response = await axios.get(
        `${apiUrl}/books/categories/${category}`
      );

      const bookIds = response.data.bookIds;
      bookIds.category = category;
      setGetCatagoryBooks(bookIds);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      onClick={getBooksByCategory}
      style={{ padding: 5, width: 150, margin: 3, borderRadius: 5 }}
    >
      {category}
    </button>
  );
}
