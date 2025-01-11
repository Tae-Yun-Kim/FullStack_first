// // src/api/customerSupportApi.js


// const BASE_URL = "http://localhost:5000/api"; // 백엔드 서버 URL (실제 URL로 교체)

// const token = localStorage.getItem("token"); // 인증 토큰

// // 공통 fetch 함수
// const fetchApi = async (url, method = "GET", body = null) => {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: token ? `Bearer ${token}` : "", // 인증 토큰 추가
//   };

//   try {
//     const response = await fetch(`${BASE_URL}${url}`, {
//       method,
//       headers,
//       body: body ? JSON.stringify(body) : null,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "API 요청 실패");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("API Error:", error.message);
//     throw error;
//   }
// };

// // QnA 글 불러오기
// export const getQnAPosts = async (page = 1, limit = 10) => {
//   return await fetchApi(`/posts?page=${page}&limit=${limit}`);
// };

// // 1:1 문의글 불러오기
// export const getOneToOnePosts = async (page = 1, limit = 10) => {
//   return await fetchApi(`/user/inquiries?page=${page}&limit=${limit}`);
// };

// // 문의글 작성 (POST 예시)
// export const writeInquiry = async (data) => {
//   return await fetchApi(`/user/inquiries`, "POST", data);
// };
