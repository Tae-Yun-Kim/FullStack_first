import axios from 'axios';
import jwtAxios from '../util/authAxiosUtil'; // 인증된 axios 인스턴스

import { API_SERVER_HOST } from './todoApi';

const host = `${API_SERVER_HOST}/api/community`;

// 공통 헤더 설정
const getHeaders = (contentType = 'application/json') => ({
  headers: { 'Content-Type': contentType },
});

// 커뮤니티 게시글 목록 조회 (페이징)
export const getCommunityList = async ({ page = 1, size = 10 }) => {
  try {
    const res = await axios.get(`${host}/list`, {
      params: { page, size },
    });
    return res.data;
  } catch (error) {
    console.error('커뮤니티 게시글 목록 조회 오류:', error);
    throw new Error(error.response?.data?.message || '커뮤니티 게시글 목록 조회에 실패했습니다');
  }
};

// 커뮤니티 게시글 단일 조회
export const getCommunity = async (tno, userEmail) => {
  try {
    const res = await axios.get(`${host}/read/${tno}`,{params: {memberEmail: userEmail}});
    return res.data;
  } catch (error) {
    console.error('커뮤니티 게시글 조회 오류:', error);
    throw new Error(error.response?.data?.message || '커뮤니티 게시글 조회에 실패했습니다');
  }
};

// 커뮤니티 게시글 등록
export const postCommunity = async (communityDTO) => {
  try {
    const res = await jwtAxios.post(`${host}/register`, communityDTO, getHeaders('multipart/form-data'));
    return res.data;
  } catch (error) {
    console.error('커뮤니티 게시글 등록 오류:', error);
    throw new Error(error.response?.data?.message || '커뮤니티 게시글 등록에 실패했습니다');
  }
};



// 커뮤니티 게시글 수정
export const putCommunity = async (tno, communityDTO) => {
  try {
    const res = await jwtAxios.put(`${host}/${tno}`, communityDTO, getHeaders('multipart/form-data'));
    return res.data;
  } catch (error) {
    console.error('커뮤니티 게시글 수정 오류:', error);
    throw new Error(error.response?.data?.message || '커뮤니티 게시글 수정에 실패했습니다');
  }
};

// 커뮤니티 게시글 삭제
export const deleteCommunity = async (tno) => {
  try {
    const res = await jwtAxios.delete(`${host}/${tno}`);
    return res.data;
  } catch (error) {
    console.error('커뮤니티 게시글 삭제 오류:', error);
    throw new Error(error.response?.data?.message || '커뮤니티 게시글 삭제에 실패했습니다');
  }
};

// 조회수 증가
export const increaseViewCount = async (tno) => {
  try {
    const res = await jwtAxios.patch(`${host}/${tno}/view`);
    return res.data;
  } catch (error) {
    console.error('조회수 증가 오류:', error);
    throw new Error(error.response?.data?.message || '조회수 증가에 실패했습니다');
  }
};

// 추천수 증가
export const increaseLikeCount = async (tno) => {
  try {
    const res = await jwtAxios.patch(`${host}/${tno}/like`);
    return res.data;
  } catch (error) {
    console.error('추천수 증가 오류:', error);
    throw new Error(error.response?.data?.message || '추천수 증가에 실패했습니다');
  }
};
