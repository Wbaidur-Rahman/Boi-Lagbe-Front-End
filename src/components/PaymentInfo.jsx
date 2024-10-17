import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/InfoPageModule.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Notifications({ user, tran_id }) {
  const navigate = useNavigate();

  if (user && !user.tran_id) {
    user.tran_id = tran_id;
    user.amount = 300;
    payment();
  }
  async function payment() {
    try {
      // ******************************* Problem is the post hits twice

      axios.post(`${apiUrl}/payment/success`, user);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Payment Successful</td>
          </tr>
        </tbody>
      </table>
      <button className="bg-primary" onClick={() => navigate("/")}>
        okay
      </button>
    </div>
  );
}
