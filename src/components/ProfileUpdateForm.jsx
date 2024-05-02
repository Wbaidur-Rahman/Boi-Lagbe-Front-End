import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/ProfileUpdate.css";

const apiUrl = import.meta.env.VITE_API_URL;

async function handleProfileUpdate({
  user,
  userData,
  setImgerror,
  setIsEditing,
}) {
  try {
    const response = await axios.put(`${apiUrl}/users/${user._id}`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data) {
      console.log(response.data);
      toast.success(response.data.msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      setIsEditing(false);
    }
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);

    if (errors.avatar) {
      setImgerror(errors.avatar.msg);
    }

    let msg;

    if (errors.name) {
      msg = errors.name.msg;
    } else if (errors.address) {
      msg = errors.address.msg;
    } else if (errors.avatar) {
      msg = errors.avatar.msg + ", 1 Mb allowed";
    } else {
      msg = "Something went wrong";
    }

    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
    });
  }
}

export default function ProfileUpdateForm({ user, setImgerror, setIsEditing }) {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  // const [mobile, setMobile] = useState(user.mobile);
  const [password, setPassword] = useState(user.password);
  const [address, setAddress] = useState(user.address);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData(); // Create a new instance
    userData.append("name", name);
    userData.append("avatar", avatar);
    // userData.append("mobile", mobile);
    userData.append("address", address);
    userData.append("password", password);
    handleProfileUpdate({ user, userData, setImgerror, setIsEditing });
  };

  return (
    <form id="profileupdateform" onSubmit={handleSubmit}>
      <ul>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </ul>
      {/* <ul>
        Mobile:
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </ul> */}
      <ul>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </ul>
      <ul>
        <p>Please upload a Profile-Photo</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setAvatar(e.target.files[0]); // Set cover image to the selected file
          }}
        />
      </ul>
      <div id="profileupdate">
        <button type="submit">Update Profile</button>
        <button style={{ marginLeft: 20 }} onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
