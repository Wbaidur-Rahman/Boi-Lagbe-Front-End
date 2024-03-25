import Book from "./Book";
export default function AppendedHomeBody({ getCatagoryBooks, user }) {
  // const [category, setCategory] = useState("");
  // console.log(getCatagoryBooks);

  return (
    <div style={{ margin: 20 }}>
      <h3 style={{ margin: 15 }}>
        {getCatagoryBooks && getCatagoryBooks.category}
      </h3>
      <div style={{ display: "flex" }}>
        {getCatagoryBooks &&
          getCatagoryBooks.map((bookid) => (
            <Book
              key={bookid}
              bookid={bookid._id}
              user={user}
              parent="HomePage"
            />
          ))}
      </div>
    </div>
  );
}
