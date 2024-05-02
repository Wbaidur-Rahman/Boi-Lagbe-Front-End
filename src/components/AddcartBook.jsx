import { onUpdate } from "../utilities/updateUser";

export default function addCartBook({ user, bookid, setShowPopup }) {
  // purpose is to add book to cart
  const addCartUserBook = () => {
    setShowPopup(false);
    // console.log(bookid);
    const updatedUser = {
      ...user,
      adcartbooks: [...(user.adcartbooks || []), bookid], // Ensure adCartBooks is initialized as an array
    };
    onUpdate({ user, updatedUser });
  };

  return (
    <button
      onClick={addCartUserBook}
      style={{
        padding: 5,
        margin: 5,
        color: "green",
        backgroundColor: "lightblue",
      }}
    >
      Add to Cart
    </button>
  );
}
