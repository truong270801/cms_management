import axios from "axios";


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CREATE_STREAM_URL = `${API_BASE_URL}/streams/create`;
const GET_STREAMS_URL = `${API_BASE_URL}/streams`;
const DELETE_STREAM_URL = `${API_BASE_URL}/streams/delete`;

export const createStream = async (stream) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      CREATE_STREAM_URL,
      { items: stream },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating stream:", error);
    throw error;
  }
};

export const tableStream = async () => {

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(GET_STREAMS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error creating stream:", error);
    throw error;
  }
};

export const deleteStream = async (streamId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${DELETE_STREAM_URL}/${streamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };