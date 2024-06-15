import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setcategory } from "../features/books/booksSlices";

const apiUrl = import.meta.env.VITE_API_URL;

function NavSearchBar() {
  const [searchString, setSearchString] = useState();

  const dispatch = useDispatch();

  async function getBooksBySearch() {
    try {
      const response = await axios.get(
        `${apiUrl}/books/search/${searchString}`
      );

      const bookIds = response.data.bookIds;
      bookIds.category = "Searched Books";
      dispatch(setcategory(bookIds));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!searchString) getBooksByLatest();
    async function getBooksByLatest() {
      try {
        const response = await axios.get(`${apiUrl}/books/latest`);

        const bookIds = response.data.bookIds;
        bookIds.category = "Latest Books";
        dispatch(setcategory(bookIds));
      } catch (error) {
        console.log(error);
      }
    }
  }, [searchString]);

  const handleSearch = (e) => {
    e.preventDefault();
    getBooksBySearch();
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search Books..."
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button type="submit">search</button>
    </form>
  );
}
export default NavSearchBar;
