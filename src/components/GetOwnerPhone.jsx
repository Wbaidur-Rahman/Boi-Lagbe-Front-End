import { useState } from "react";
import { acceptRentReq } from "../utilities/rentRequestHandler";

// If the owner accept the rent request then he must give his phone number
export default function GetOwnerPhone({
  rentreq,
  setShow,
  rentreq_id,
  onDelete,
}) {
  const [ownerPhone, setOwnerPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
