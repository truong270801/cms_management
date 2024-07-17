import axios from "axios";

const token = localStorage.getItem("token");

export const tableUser = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/users", {
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
    await axios.post(
      "http://127.0.0.1:8000/users/create",
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
      const response = await axios.put(
        `http://127.0.0.1:8000/users/${userId}`,
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
      await axios.delete(`http://127.0.0.1:8000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };