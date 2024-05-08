import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/InfoPageModule.css";

const apiUrl = import.meta.env.VITE_API_URL;

function Notification({ notify_id, onDelete }) {
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

  async function deleteNotification(id) {
    try {
      await axios.delete(`${apiUrl}/notification/${id}`);
      onDelete(id);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div id="notify_card">
      <h3>Hello...</h3>
      <p>Title: {notification.title}</p>
      <p>Message: {notification.message}</p>
      <br />
      <button
        onClick={() => deleteNotification(notification._id)}
        style={{ color: "red", padding: 3, borderRadius: 10, float: "right" }}
      >
        delete
      </button>
    </div>
  );
}

export default function Notifications({ user }) {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    if (user) {
      setNotifications(user.notifications);
    }
  }, [user]);

  function handleDelete(id) {
    setNotifications(notifications.filter((notify_id) => notify_id !== id));
  }

  return (
    <div>
      <div id="notification_container">
        {notifications && notifications.length === 0 && (
          <h2>Opps..., No Notifications Found</h2>
        )}
        {notifications && notifications.length > 0 && <h2>Notifications</h2>}
      </div>
      <div id="notification_container">
        {notifications &&
          notifications
            .slice()
            .reverse()
            .map((notify_id) => (
              <Notification
                key={notify_id}
                notify_id={notify_id}
                onDelete={handleDelete}
              />
            ))}
      </div>
    </div>
  );
}
