// src/api.js
const API_BASE_URL = "http://localhost:8080";

export const getMealkitsByCategory = async (category) => {
  const response = await fetch(`${API_BASE_URL}/mealkits?category=${category}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch meal kits by category");
  }
  return response.json();
};

export const getMealkitById = async (mid) => {
    const response = await fetch(`${API_BASE_URL}/mealkits/${mid}`);
    if (!response.ok) {
      throw new Error("Failed to fetch meal kit details");
    }
    return response.json();
  };