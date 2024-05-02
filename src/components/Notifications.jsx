import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/InfoPageModule.css";

const apiUrl = import.meta.env.VITE_API_URL;

function Notification({ notify_id }) {
  const [notification, setNotification] = useState({});

  useEffect(() => {
    if (notify_id) {
      handleNotification();
    }

    async function handleNotification() {
      try {
        const response = await axios.get(
          `${apiUrl}/notification?id=${notify_id}`
        );
        setNotification(response.data.notification);
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
  }, [notify_id]);

  return (
    <div id="notify_card">
      <h3>Hello...</h3>
      <p>Title: {notification.title}</p>
      <p>Message: {notification.message}</p>
    </div>
  );
}

export default function Notifications({ user }) {
  return (
    <div>
      <div id="notification_container">
        {user && user.notifications.length === 0 && (
          <h2>Opps..., No Notifications Found</h2>
        )}
        {user && user.notifications.length > 0 && <h2>Notifications</h2>}
      </div>
      <div id="notification_container">
        {user &&
          user.notifications.map((notify_id) => (
            <Notification key={notify_id} notify_id={notify_id} user={user} />
          ))}
      </div>
    </div>
  );
}
