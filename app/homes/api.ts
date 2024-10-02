import axios from "axios";

const API_URL = "http://localhost:5000/api/homes";

export const fetchHomes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// New searchHomes function to implement the search functionality
export const searchHomes = async (params) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      location: params.location,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      name: params.name,
    },
  });
  return response.data;
};

export const getHomeById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createHome = async (homeData: any, token: string) => {
  const response = await axios.post(API_URL, homeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateHome = async (id: string, homeData: any, token: string) => {
  const response = await axios.put(`${API_URL}/${id}`, homeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteHome = async (id: string, token: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserHomes = async (token: string) => {
  const response = await axios.get(`${API_URL}/myhomes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchReviewsByHomeId = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}/reviews`);
  return response.data;
};
