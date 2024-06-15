import { useSelector } from "react-redux";
import Book from "./Book";
export default function AppendedHomeBody({ user }) {
  const categorybooks = useSelector((state) => state.books).categorybooks;

  const filteredBooks =
    categorybooks && user
      ? categorybooks.filter((book) => {
          // Check if the book is not present in the user's books array
          return !user.books.some((userBookid) => userBookid === book._id);
        })
      : categorybooks;

  return (
    <div id="categorybookcontainer">
      <h3>
        {categorybooks &&
          categorybooks.category.charAt(0).toUpperCase() +
            categorybooks.category.slice(1)}
      </h3>
      <div id="bookcontainer">
        {filteredBooks &&
          filteredBooks.map((book) => (
            <Book
              key={book._id}
              bookid={book._id}
              user={user}
              parent="HomePage"
            />
          ))}
      </div>
    </div>
  );
}
