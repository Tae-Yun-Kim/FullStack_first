import axios from "axios"; // axios 임포트 추가
import jwtAxios from "../util/authAxiosUtil"; // 인증된 axios 인스턴스
import { API_SERVER_HOST } from "./todoApi";

// 서버 URL 설정
const BACKEND_URL = "http://localhost:8080"; // 백엔드 서버 URL
const host = `${BACKEND_URL}/api/qna`;


// 공통 헤더 설정 함수
const getHeaders = (contentType = "application/json") => ({
  headers: { "Content-Type": contentType },
});

// QnA 목록 조회 (페이징)
export const getQnAList = async ({ page = 1, size = 10 }) => {
  try {
    const res = await axios.get(`${host}/list`, { params: { page, size } });
    return res.data;
  } catch (error) {
    console.error("Error fetching QnA list:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch QnA list");
  }
};

// QnA 단일 조회
// export const getQnA = async (qno) => {
//   try {
//     const res = await jwtAxios.get(`${host}/read/${qno}`);
//     const qnaData = res.data;

//     // 첨부 파일 URL 추가
//     if (qnaData.uploadFileNames) {
//       qnaData.uploadFileUrls = qnaData.uploadFileNames.map(
//         (fileName) => `${BACKEND_URL}/uploads/${fileName}`
//       );
//     }

//     return qnaData;
//   } catch (error) {
//     console.error("Error fetching QnA:", error.qnaData?.data || error.message);
//     throw new Error(error.res?.qnaData?.message || "Failed to fetch QnA");
//   }
// };
export const getQnA = async (qno) => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      console.log(localStorage.getItem("token"));
      if (!token) {
        console.error("Token is missing in localStorage");
        throw new Error("Authentication token is missing. Please log in again.");
      }

      console.log("Sending token:", token);
  
      // 토큰을 Authorization 헤더에 추가
      const res = await axios.get(`${host}/read/${qno}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
        },
      });
      console.log("Request Headers:", {
        Authorization: `Bearer ${token}`, // 요청 헤더 출력
    });
  
      const qnaData = res.data;
  
      // 첨부 파일 URL 추가
      if (qnaData.uploadFileNames) {
        qnaData.uploadFileUrls = qnaData.uploadFileNames.map(
          (fileName) => `${BACKEND_URL}/uploads/${fileName}`
        );
      }
  
      return qnaData;
    } catch (error) {
      console.error("Error fetching QnA:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch QnA");
    }
  };

// QnA 등록
export const postQnA = async (qnaData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("인증 토큰이 없습니다. 다시 로그인해주세요.");
    throw new Error("Authentication token is missing. Please log in again.");
  }

  // FormData 생성
  const formData = new FormData();
  formData.append("qnaTitle", qnaData.qnaTitle || "");
  formData.append("qnaContent", qnaData.qnaContent || "");
  formData.append("email", qnaData.email || "");
  formData.append("isSecret", qnaData.isSecret ? "true" : "false");
  formData.append("category", qnaData.category || "");

  // 파일 추가
  if (qnaData.files && qnaData.files.length > 0) {
    qnaData.files.forEach((file) => formData.append("files", file));
  }

  try {
    const res = await jwtAxios.post(`${host}/register`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error posting QnA:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to post QnA");
  }
};

// QnA 수정
export const putQnA = async (qno, qnaData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }
  
    try {
      const res = await axios.put(`${host}/modify/${qno}`, qnaData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // JSON 데이터 전송
        },
      });
  
      console.log("PUT Response:", res.data); // 응답 디버깅용 로그
      return res.data;
    } catch (error) {
      console.error("Error updating QnA:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to update QnA");
    }
  };
  





// QnA 삭제
export const deleteQnA = async (qno) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
  }

  try {
    const baseUrl = host.endsWith("/api/qna") ? host : `${host}/api/qna`; // 중복 방지
    const url = `${baseUrl}/${qno}`;
    console.log("DELETE Request URL:", url); // 디버깅용 로그

    const res = await jwtAxios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("DELETE Response:", res.data); // 응답 디버깅
    return res.data;
  } catch (error) {
    console.error("Error deleting QnA:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete QnA");
  }
};

// 댓글 목록 조회
export const getQnaComments = async (qno, page = 1, size = 10) => {
    const response = await axios.get(`${host}/comment/${qno}`, {
        params: { page, size },
    });
    return response.data;
};

// 댓글 등록
export const addQnaComment = async (qnaCommentDTO) => {
    const token = localStorage.getItem("token"); // 토큰 가져오기
    const response = await axios.post(`${host}/comment/register`, qnaCommentDTO, {
        headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
        },
    });
    return response.data;
};

// 댓글 수정
export const modifyQnaComment = async (qcno, qnaCommentDTO) => {
    const token = localStorage.getItem("token"); // 토큰 가져오기
    const response = await axios.put(`${host}/comment/${qcno}`, qnaCommentDTO, {
        headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
        },
    });
    return response.data;
};

// 댓글 삭제
export const removeQnaComment = async (qcno) => {
    const token = localStorage.getItem("token"); // 토큰 가져오기
    const response = await axios.delete(`${host}/comment/${qcno}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
        },
    });
    return response.data;
};

