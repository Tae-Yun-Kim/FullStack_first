//aythAxiosUtil

// 인증 관리 도구를 제공
import axios from "axios";
import { getCookie, setCookie } from "./authCookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;

  const header = { headers: { Authorization: `Bearer ${accessToken}` } };

  const res = await axios.get(
    `${host}/api/member/refresh?refreshToken=${refreshToken}`,
    header
  );

  console.log("----------------------");
  console.log(res.data);

  return res.data;
};

// before request
// const beforeReq = (config) => {
//   console.log("before request.............");

//   const memberInfo = getCookie("member");

//   if (!memberInfo) {
//     console.log("Member NOT FOUND");
//     return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
//   }

//   const { accessToken } = memberInfo;

//   // Authorization (허가) 헤더 처리
//   config.headers.Authorization = `Bearer ${accessToken}`;

//   return config;
// };
const beforeReq = (config) => {
  console.log("Before request interceptor...");

  const memberInfo = getCookie("member");
  console.log("쿠키 가져오기 결과:", memberInfo); // 쿠키 데이터 확인

  if (!memberInfo) {
    console.log("Member info NOT FOUND in cookies.");
    return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
  }

  const { accessToken } = memberInfo;

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

// fail request
const requestFail = (err) => {
  console.log("request error............");

  return Promise.reject(err);
};

// before return response
const beforeRes = async (res) => {
  console.log("before return response...........");

  console.log(res);

  // 'ERROR_ACCESS_TOKEN'
  const data = res.data;

  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberCookieValue = getCookie("member");

    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken
    );
    console.log("refreshJWT RESULT", result);

    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;

    setCookie("member", JSON.stringify(memberCookieValue), 1);
  }

  return res;
};

// fail response
const responseFail = (err) => {
  console.log("response fail error.............");
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
