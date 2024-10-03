import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token; // Make sure to store the token in cookies
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch homes from the backend
    const response = await axios.get("http://localhost:5000/api/homes/myhomes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the data to the client
    res.status(200).json(response.data);
  } catch (error) {
    // Handle any errors during the API request
    res.status(500).json({ message: "Error fetching homes", error: error.message });
  }
}
