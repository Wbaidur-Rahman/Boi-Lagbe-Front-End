import { useState } from "react";

export default function ProfileUpdateForm({ user, onUpdate, setIsEditing }) {
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
    onUpdate(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div>
        <button type="submit">Update Profile</button>
        <button style={{ marginLeft: 20 }} onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
