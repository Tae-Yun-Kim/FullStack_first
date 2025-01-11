import axios from "axios"; 
import { API_SERVER_HOST } from "./todoApi"; // API 서버의 기본 URL
import jwtAxios from "../util/authAxiosUtil"; // JWT 인증 처리가 포함된 Axios 유틸리티

const host = `${API_SERVER_HOST}/api/member`;

// 로그인 API
export const loginPost = async (loginParam) => {
  try {
    const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };
    const form = new FormData();
    form.append("username", loginParam.email);
    form.append("password", loginParam.pw);

    const res = await axios.post(`${host}/login`, form, header);

    if (res.data.error) {
      throw new Error(res.data.error || "로그인 실패");
    }

    return res.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw new Error(error.response?.data?.message || "로그인 실패");
  }
};

// 회원 정보 수정 API
export const modifyMember = async (member) => {
  try {
    const res = await jwtAxios.put(`${host}/modify`, member);
    return res.data;
  } catch (error) {
    console.error("Modify member API error:", error);
    throw new Error(error.response?.data?.message || "회원 정보 수정 실패");
  }
};

// 회원가입 API 
export const signupPost = async (signupData) => {
  try {
    const res = await axios.post("/api/signup", signupData); // 회원가입 엔드포인트
    return res.data;
  } catch (error) {
    console.error("Signup API error:", error);
    throw new Error(error.response?.data?.message || "회원가입 실패");
  }
};

// 사용자 주소 업데이트
export const updateUserAddress = async (addressData) => {
  try {
    // 실제 API 호출 예시
    /*
    const res = await jwtAxios.put(`${host}/address`, addressData); // 서버에 주소 업데이트 요청
    return res.data;
    */
    // 더미 데이터로 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "주소가 업데이트되었습니다.",
        });
      }, 500);
    });
  } catch (error) {
    console.error("Error updating address:", error);
    throw new Error("주소 업데이트 실패");
  }
};

// 사용자 주소 가져오기 (더미 데이터), 여기 인식 못함
export const getUserAddress = async () => {
  // 더미 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "홍길동",
        address: "서울특별시 강남구 테헤란로 123",
        phone: "010-1234-5678",
        success: true, 
        message: "주소가 업데이트되었습니다."
      });
    }, 500); // 500ms 후 응답
  });
};
