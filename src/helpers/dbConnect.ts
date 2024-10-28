import { Friend } from "@/types/friend";
import axios from "axios";

// function to add user number to the database
export async function addNunmberToDB(
  number: string,
  userId: string | undefined
) {
  try {
    const response = await axios.post("/api/addNumber", {
      number,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function postUser({ name, email, photo, number }: Friend) {
  try {
    const response = await axios.post("/api/friend", {
      name,
      email,
      photo,
      number,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsers() {
  try {
    const response = await axios.get("/api/friend");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(id: string | undefined) {
  if (!id) return;
  try {
    const response = await axios.get(`/api/friend/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateFriend(data: Friend) {
  try {
    const response = await axios.put(`/api/friend`, data);
    console.log("backend connect ",response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
