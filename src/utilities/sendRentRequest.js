import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// the rent request will be saved on db and the agent will receive a rent info
export default async function sendRentRequest({ book, tag, duration, cost, user, phone }) {
  try {
    // getting an agent
    let response = await axios.get(`${apiUrl}/admin/`);
    const agent = response.data.agent;

    const rentrequest = {
      title: book.title,
      bookid: book._id,
      author: book.data.author,
      duration,
      borrowerid: user._id,
      borrowerphone: phone,
      amount: cost,
      ownerid: tag.ownerid,
      agentid: agent.agentid
  }
    // rent request is generated and sent to owner
    response = await axios.post(
      `${apiUrl}/rentrequest/`,
      rentrequest
    );

    console.log(response.data);
    
  } catch (error) {
    console.log(error);
    throw error; // Re-throwing the error for handling in the caller module
  }
}

