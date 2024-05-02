import { onUpdate } from "../utilities/updateUser";

export default function RemoveFromCart({ user, bookid, setShowPopup }) {
  // purpose is to remove userbook
  const removeCartBook = async () => {
    setShowPopup(false);
    const updatedUser = {
      ...user,
      adcartbooks: user.adcartbooks.filter((id) => id !== bookid),
    };
    try {
      await onUpdate({ user, updatedUser });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={removeCartBook}
      style={{ padding: 5, marginTop: 10, color: "red" }}
    >
      Remove from cart
    </button>
  );
}
