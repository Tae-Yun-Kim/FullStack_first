import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// 모든 밀키트 가져오기
export const getAllMealkits = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mealkits/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // CORS 요청 시 인증 정보 포함
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch mealkits:", error.message);
    throw new Error("밀키트 목록을 불러오는데 실패했습니다.");
  }
};

// 새로운 밀키트 생성
export const createMealkit = async (mealKitData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mealkits/`, mealKitData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // 인증 정보 포함
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create mealkit:", error.message);
    throw new Error("밀키트를 생성하는데 실패했습니다.");
  }
};

// 특정 밀키트 정보 가져오기
export const getMealkitById = async (mid) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mealkits/${mid}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch mealkit with id: ${mid}`, error.message);
    throw new Error(`ID ${mid}에 해당하는 밀키트를 가져오는데 실패했습니다.`);
  }
};

// 밀키트에 제품 추가
export const addProductToMealkit = async (mid, pid, quantity) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/mealkits/${mid}/products`,
      { pid, quantity },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to add product to mealkit (ID: ${mid}):`, error.message);
    const errorMessage =
      error.response?.data?.message || "제품 추가 요청이 실패했습니다.";
    throw new Error(errorMessage);
  }
};

// 밀키트 제품 수량 업데이트
// export const updateProductQuantity = async (mid, pid, quantity) => {
//   try {
//     const response = await axios.put(
//       `${API_BASE_URL}/mealkits/${mid}/products/${pid}/quantity`,
//       { quantity },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error(`Failed to update product quantity for mealkit (ID: ${mid}):`, error.message);
//     throw new Error("제품 수량 업데이트에 실패했습니다.");
//   }
// };

// 1/5
export const updateProductQuantity = async (mpid, quantity) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/mealkits/products/${mpid}/quantity`, null, {
          params: { quantity },
      });
      return response.data; // 서버 응답 메시지
  } catch (error) {
      console.error("수량 업데이트 실패:", error);
      throw error;
  }
};

// 밀키트 삭제
export const deleteMealkit = async (mid) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/mealkits/${mid}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to delete mealkit (ID: ${mid}):`, error.message);
    throw new Error(`밀키트 ID ${mid} 삭제에 실패했습니다.`);
  }
};
