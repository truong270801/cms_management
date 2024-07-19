import axios from "axios";


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CREATE_USERS_URL = `${API_BASE_URL}/users/create`;
const GET_USERS_URL = `${API_BASE_URL}/users`;
const UPDATE_USERS_URL = `${API_BASE_URL}/users/update`;
const DELETE_USERS_URL = `${API_BASE_URL}/users/delete`;

export const tableUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(GET_USERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      CREATE_USERS_URL,
      { user },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${UPDATE_USERS_URL}/${userId}`,
        { user: userData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  
  export const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${DELETE_USERS_URL}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };