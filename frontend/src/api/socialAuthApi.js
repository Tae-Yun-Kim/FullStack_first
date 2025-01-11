// //socialAuthApi

// import axios from 'axios';
// import { API_SERVER_HOST } from './todoApi';
// import { socialLoginAsync } from '../slices/authSlice';

// const platforms = {
//   kakao: {
//     authCodePath: 'https://kauth.kakao.com/oauth/authorize',
//     accessTokenUrl: 'https://kauth.kakao.com/oauth/token',
//     clientId: '',
//     clientSecret: '',
//     redirectUri: 'http://localhost:3000/user/kakao',
//   },
//   google: {
//     authCodePath: 'https://accounts.google.com/o/oauth2/v2/auth',
//     accessTokenUrl: 'https://oauth2.googleapis.com/token',
//     clientId: '',
//     clientSecret: '',
//     redirectUri: 'http://localhost:3000/user/google',
//     scope: 'email profile',
//   },
// };

// export const getSocialLoginLink = (platform) => {
//   const validPlatforms = ['kakao', 'google'];
//   if (!validPlatforms.includes(platform)) {
//     throw new Error('잘못된 플랫폼입니다.');
//   }

//   const state = platform; // 플랫폼 이름을 state로 사용
//   localStorage.setItem('oauthState', state); // state 저장

//   const config = platforms[platform];
//   const queryParams = new URLSearchParams({
//     client_id: config.clientId,
//     redirect_uri: config.redirectUri,
//     response_type: 'code',
//     state,
//     ...(platform === 'google' && { scope: config.scope }), // 구글은 scope 추가
//   });

//   return `${config.authCodePath}?${queryParams.toString()}`;
// };

// export const getAccessToken = async (platform, authCode) => {
//   const config = platforms[platform];
//   if (!config) throw new Error('잘못된 플랫폼입니다.');

//   const { accessTokenUrl, clientId, clientSecret, redirectUri } = config;

//   const params = new URLSearchParams({
//     grant_type: 'authorization_code',
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: redirectUri,
//     code: authCode,
//   });

//   try {
//     const res = await axios.post(accessTokenUrl, params, {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     });
//     console.log(`[${platform}] Access Token Response:`, res.data);
//     return res.data.access_token; // 액세스 토큰 반환
//   } catch (error) {
//     console.error(`[${platform}] Error requesting Access Token:`, error);
//     throw new Error(`${platform} 액세스 토큰 요청 실패`);
//   }
// };

// export const getMemberWithAccessToken = async (platform, accessToken) => {
//   const url = `${API_SERVER_HOST}/api/member/${platform}?accessToken=${accessToken}`;
//   console.log(`[${platform}] Fetching Member Info with Access Token:`, accessToken);

//   try {
//     const res = await axios.get(url, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     console.log(`[${platform}] Member Info Response:`, res.data);
//     return res.data;
//   } catch (error) {
//     console.error(`[${platform}] Error fetching member info:`, error.response?.data || error.message);
//     throw new Error('사용자 정보 요청 실패');
//   }
// };
