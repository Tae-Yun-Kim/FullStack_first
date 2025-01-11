//authCookieUtil

import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days) => {
  try {
    const jsonValue = JSON.stringify(value); // JSON 문자열로 변환
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);

    cookies.set(name, jsonValue, {
      path: "/",
      expires: expires,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", // CSRF 방지
    });

    console.log(`쿠키 저장 성공: ${name} = ${jsonValue}`); // 디버깅 로그
  } catch (error) {
    console.error(`쿠키 저장 실패: ${error.message}`);
  }
};

export const getCookie = (name) => {
  try {
    const cookie = cookies.get(name);
    console.log(`쿠키 가져오기: ${name} = ${cookie}`); // 디버깅 로그
    return cookie;
  } catch (error) {
    console.error(`쿠키 가져오기 실패: ${error.message}`);
    return null;
  }
};

export const removeCookie = (name, path = "/") => {
  cookies.remove(name, { path, secure: process.env.NODE_ENV === "production" });
};
