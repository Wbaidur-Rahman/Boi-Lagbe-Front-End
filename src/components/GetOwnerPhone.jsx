import { useState } from "react";
import { acceptRentReq } from "../utilities/rentRequestHandler";
import { onUpdate } from "../utilities/updateUser";

// If the owner accept the rent request then he must give his phone number if not provided earlier
export default function GetOwnerPhone({
  user,
  rentreq,
  setShow,
  rentreq_id,
  onDelete,
}) {
  const [ownerPhone, setOwnerPhone] = useState(user.mobile);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if the user not provided his/her phone earlier then the newly provided number should be stored in db
    if (user) {
      const updatedUser = {
        ...user,
        mobile: ownerPhone,
      };
      onUpdate({ user, updatedUser });
    }

    acceptRentReq({ rentreq, ownerPhone });
    onDelete(rentreq_id);
  };

  return (
    <form type="submit" onSubmit={handleSubmit}>
      <p>Enter your phone:</p>
      <input
        type="number"
        placeholder="Phone Number"
        value={ownerPhone}
        onChange={(e) => setOwnerPhone(e.target.value)}
      ></input>
      <button type="submit">Okay</button>
      <button type="submit" onClick={() => setShow(false)}>
        Cancel
      </button>
    </form>
  );
}
