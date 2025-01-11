import axios from 'axios';
import jwtAxios from '../util/authAxiosUtil'; // JWT 인증 포함 Axios 유틸리티
import { API_SERVER_HOST } from './todoApi';

const host = `${API_SERVER_HOST}/api/member`;

// ===== 사용자 API =====

// 사용자 주소 업데이트
export const updateUserAddress = async (userId, newAddress) => {
  try {
    const res = await jwtAxios.put(`${host}/${userId}/address`, { address: newAddress }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (error) {
    console.error('주소 업데이트 실패:', error.response?.data || error.message);
    throw new Error('주소 업데이트 실패');
  }
};


// 로그인
export const loginPost = async (loginParam) => {
  try {
    const loginData = {
      email: loginParam.email,
      password: loginParam.password,
    };

    const res = await axios.post(`${host}/login`, loginData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    console.log('서버 응답 전체:', res); // 전체 응답 확인
    console.log('응답 데이터:', res.data); // res.data가 올바른지 확인
    
    if (!res.data) {
      throw new Error('서버에서 응답 데이터가 비어 있습니다.');
    }

    return res.data; // 백엔드의 응답 데이터 반환
  } catch (error) {
    console.error('로그인 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 회원 정보 수정
// export const modifyMember = async (member) => {
//   try {
//     const res = await jwtAxios.put(`${host}/modify`, member, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return res.data;
//   } catch (error) {
//     console.error('회원 정보 수정 실패:', {
//       message: error.message,
//       response: error.response?.data, // 서버에서 반환된 에러 데이터
//       status: error.response?.status, // HTTP 상태 코드
//       headers: error.response?.headers, // 응답 헤더
//     });
//     throw new Error('회원 정보 수정 실패');
//   }
  
//   };


// 회원가입
export const signupPost = async (signupData) => {
  try {
    const res = await axios.post(`${host}/signup`, signupData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (error) {
    console.error('회원가입 실패:', error.response?.data || error.message);
    throw new Error('회원가입 실패');
  }
};

export const fetchUserInfo = async (token) => {
  const response = await axios.get("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // { email: "user@example.com", name: "John Doe" }
};
