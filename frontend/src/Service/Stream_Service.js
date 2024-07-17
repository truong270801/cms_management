import axios from "axios";

const token = localStorage.getItem("token");

export const createStream = async (stream) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/streams/create",
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
    const response = await axios.get("http://127.0.0.1:8000/streams", {
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
      await axios.delete(`http://127.0.0.1:8000/streams/delete/${streamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };