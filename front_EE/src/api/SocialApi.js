// import axios from "axios";
// import { API_SERVER_HOST } from "./todoApi";

// // 소셜 로그인에 필요한 플랫폼 설정
// const platforms = {
//   kakao: {
//     authCodePath: "https://kauth.kakao.com/oauth/authorize", // 카카오 인증 코드 요청 URL
//     accessTokenUrl: "https://kauth.kakao.com/oauth/token", // 카카오 액세스 토큰 요청 URL
//     clientId: "", // 카카오 REST API Key
//     clientSecret: "", // 카카오 Client Secret (선택적 사용)
//     redirectUri: "http://localhost:3000/user/kakao", // 카카오 리다이렉트 URI
//   },
//   google: {
//     authCodePath: "https://accounts.google.com/o/oauth2/v2/auth", // 구글 인증 코드 요청 URL
//     accessTokenUrl: "https://oauth2.googleapis.com/token", // 구글 액세스 토큰 요청 URL
//     clientId: "", // 구글 Client ID
//     clientSecret: "", // 구글 Client Secret
//     redirectUri: "http://localhost:3000/user/google", // 구글 리다이렉트 URI
//     scope: "email profile", // Google OAuth 권한 요청 범위
//     flowName: "GeneralOAuthFlow", // Google OAuth Flow 설정
//   },
//   naver: {
//     authCodePath: "https://nid.naver.com/oauth2.0/authorize", // 네이버 인증 코드 요청 URL
//     accessTokenUrl: "https://nid.naver.com/oauth2.0/token", // 네이버 액세스 토큰 요청 URL
//     clientId: "", // 네이버 Client ID
//     clientSecret: "", // 네이버 Client Secret
//     redirectUri: "http://localhost:3000/user/naver", // 네이버 리다이렉트 URI
//   },
// };

// /**
//  * 소셜 로그인 URL 생성 함수
//  * @param {string} platform - "kakao", "google", "naver" 중 하나
//  * @returns {string} - 소셜 로그인 URL
//  */
// export const getSocialLoginLink = (platform) => {
//   const config = platforms[platform];
//   if (!config) {
//     console.error(`잘못된 플랫폼: ${platform}`);
//     throw new Error("잘못된 플랫폼입니다.");
//   }

//   const { authCodePath, clientId, redirectUri, scope, flowName } = config;
  
//   // Google OAuth의 추가 파라미터(flowName 및 scope 포함)를 설정
//   const queryParams = new URLSearchParams({
//     client_id: clientId,
//     redirect_uri: redirectUri,
//     response_type: "code",
//     ...(scope && { scope }), // scope가 있을 경우 추가
//     ...(flowName && { flowName }), // flowName이 있을 경우 추가
//   });

//   return `${authCodePath}?${queryParams.toString()}`; // 완성된 로그인 URL 반환
// };

// /**
//  * 액세스 토큰 요청 함수
//  * @param {string} platform - "kakao", "google", "naver" 중 하나
//  * @param {string} authCode - 인증 코드
//  * @returns {Promise<string>} - 액세스 토큰
//  */
// export const getAccessToken = async (platform, authCode) => {
//   const config = platforms[platform];
//   if (!config) {
//     console.error(`잘못된 플랫폼: ${platform}`);
//     throw new Error("잘못된 플랫폼입니다.");
//   }

//   const { accessTokenUrl, clientId, redirectUri, clientSecret } = config;

//   const params = new URLSearchParams({
//     grant_type: "authorization_code", // 인증 방식
//     client_id: clientId,
//     redirect_uri: redirectUri,
//     code: authCode, // 인증 코드 추가
//     ...(platform === "naver" || platform === "kakao" ? { client_secret: clientSecret } : {}),
//   });

//   const headers = {
//     "Content-Type": "application/x-www-form-urlencoded", // 요청 헤더 설정
//   };

//   try {
//     const res = await axios.post(accessTokenUrl, params, { headers });
//     console.log(`플랫폼(${platform}) 액세스 토큰:`, res.data.access_token);
//     return res.data.access_token; // 액세스 토큰 반환
//   } catch (error) {
//     console.error(`플랫폼(${platform}) 액세스 토큰 요청 실패:`, error.response?.data || error.message);
//     throw new Error(error.response?.data?.error_description || "액세스 토큰 요청 실패");
//   }
// };

// /**
//  * 액세스 토큰을 사용하여 사용자 정보 요청 함수
//  * @param {string} platform - "kakao", "google", "naver" 중 하나
//  * @param {string} accessToken - 액세스 토큰
//  * @returns {Promise<Object>} - 사용자 정보
//  */
// export const getMemberWithAccessToken = async (platform, accessToken) => {
//   const url = `${API_SERVER_HOST}/api/member/${platform}?accessToken=${accessToken}`;
//   try {
//     const res = await axios.get(url);
//     console.log(`플랫폼(${platform}) 사용자 정보:`, res.data);
//     return res.data; // 사용자 정보 반환
//   } catch (error) {
//     console.error(`플랫폼(${platform}) 사용자 정보 요청 실패:`, error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "사용자 정보 요청 실패");
//   }
// };
