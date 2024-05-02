import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export default async function notifyUser(notification){
    try {
        await axios.post(`${apiUrl}/notification/`, notification);
    } catch (error) {
        console.log(error.response.data);
    }
}