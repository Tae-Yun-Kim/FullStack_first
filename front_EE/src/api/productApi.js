import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    throw new Error("제품 데이터를 불러오는 데 실패했습니다.");
  }
};
