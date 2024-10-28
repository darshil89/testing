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