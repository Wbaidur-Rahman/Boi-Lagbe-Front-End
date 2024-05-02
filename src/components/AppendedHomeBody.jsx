import Book from "./Book";
export default function AppendedHomeBody({ getCatagoryBooks, user }) {
  // Filter out books that are present in the user's books array
  const filteredBooks =
    getCatagoryBooks && user
      ? getCatagoryBooks.filter((book) => {
          // Check if the book is not present in the user's books array
          return !user.books.some((userBookid) => userBookid === book._id);
        })
      : getCatagoryBooks;

  return (
    <div id="categorybookcontainer">
      <h3>
        {getCatagoryBooks &&
          getCatagoryBooks.category.charAt(0).toUpperCase() +
            getCatagoryBooks.category.slice(1)}
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
