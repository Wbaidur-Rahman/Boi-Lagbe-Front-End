import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export async function onUpdate({ user, updatedUser }) {
  try {
    // updating the user with new user data
    await axios.put(
      `${apiUrl}/users/${user._id}`,
      updatedUser
    );

  } catch (error) {
    console.log(error);
    throw error; // Re-throwing the error for handling in the caller module
  }
}

export default { onUpdate };
