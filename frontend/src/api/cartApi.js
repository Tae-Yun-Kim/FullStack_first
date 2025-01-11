import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/cart';

// export const fetchCartItems = async (email, token) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/items`, {
//       params:{ email },
//       headers: { 'Content-Type': 'application/json' },
//       Authorization: `Bearer ${token}`,
//       withCredentials: true, // 인증 필요시 쿠키 전송
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
export const fetchCartItems = async (email, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`, {
      params: { email },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // 인증 필요시 쿠키 전송
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const updateCartItem = async (cartItemDTO) => {
  console.log("장바구니 업데이트 요청 데이터 : ", cartItemDTO)
  try {
    const response = await axios.post(
      `${API_BASE_URL}/change`,
      cartItemDTO,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (response.status !== 200) {
      throw new Error("Unexpected status code");
    }
    console.log("장바구니 업데이트 성공:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const removeCartItem = async (ciid) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${ciid}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
