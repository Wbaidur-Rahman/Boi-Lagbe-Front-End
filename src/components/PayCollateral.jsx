import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

export default function PayCollateral({ user, setPaycollateral }) {
  const [pay, setPay] = useState(false);
  const [payamount, setPayamount] = useState(0);
  // const navigate = useNavigate();

  async function getPayment() {
    console.log(payamount);
    try {
      user.payamount = payamount;
      const response = await axios.post(`${apiUrl}/admin/paycollateral`, user);
      setPaycollateral(false);
      console.log(response.data);
      window.location.replace(response.data.url);
      // navigate(`/user`);
    } catch (error) {
      alert("error.response.data.errors.common.msg");
      setPaycollateral(false);
    }
  }
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={() => setPaycollateral(false)}>
          &times;
        </span>
        <p
          style={{ color: "black", fontWeight: "bold", fontFamily: "cursive" }}
        >
          You should have at least 200 taka
          <br />
          in your account to rent books
          <br />
          <br />
          Your current Account Balance is : {user.collateral}tk
        </p>
        <br />
        {pay && (
          <form action="" onSubmit={() => getPayment()}>
            <ul style={{ padding: "0px" }}>
              <b>Amount to pay</b>
              <br />
              <input
                type="number"
                value={payamount}
                onChange={(e) => setPayamount(e.target.value)}
              />
            </ul>
            <ul style={{ padding: "0px" }}>
              <Button
                variant="primary"
                onClick={() => getPayment()}
                stype="submit"
              >
                Pay
              </Button>
              {/* <button type="submit">
                Pay
              </button> */}
            </ul>
          </form>
        )}
        <p style={{ borderBottom: "1px solid black" }}></p>
        {!pay && (
          <Button variant="primary" onClick={() => setPay(true)}>
            Pay Collateral
          </Button>
        )}
      </div>
    </div>
  );
}
