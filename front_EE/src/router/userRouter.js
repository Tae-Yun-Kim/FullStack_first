import { Suspense, lazy } from "react";
const Loading = <div>Loading....</div>;

// Lazy-load 컴포넌트 정의
const Login = lazy(() => import("../pages/user/LoginPage"));
const LogoutPage = lazy(() => import("../pages/user/LogoutPage"));
const KakaoRedirect = lazy(() => import("../pages/user/SocialRedirectPage"));
const GoogleRedirect = lazy(() => import("../pages/user/SocialRedirectPage"));
const NaverRedirect = lazy(() => import("../pages/user/SocialRedirectPage"));
const MemberModify = lazy(() => import("../pages/user/ModifyPage"));
const FindIdPage = lazy(() => import("../pages/user/FindIdPage"));
const CombinedPolicyPage = lazy(() => import("../pages/user/CombinedPolicyPage")); // CombinedPolicyPage 추가
const SignupPage = lazy(() => import("../pages/user/SignupPage")); // SignupPage 추가

/**
 * /user 경로 아래의 모든 라우팅을 관리하는 함수
 */
const userRouter = () => {
  return [
    {
      path: "login", // 로그인 페이지
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "find-id", // 아이디 찾기 페이지
      element: (
        <Suspense fallback={Loading}>
          <FindIdPage />
        </Suspense>
      ),
    },
    {
      path: "logout", // 로그아웃 페이지
      element: (
        <Suspense fallback={Loading}>
          <LogoutPage />
        </Suspense>
      ),
    },
    {
      path: "kakao", // 카카오 소셜 로그인 리다이렉트
      element: (
        <Suspense fallback={Loading}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
    {
      path: "google", // 구글 소셜 로그인 리다이렉트
      element: (
        <Suspense fallback={Loading}>
          <GoogleRedirect />
        </Suspense>
      ),
    },
    {
      path: "naver", // 네이버 소셜 로그인 리다이렉트
      element: (
        <Suspense fallback={Loading}>
          <NaverRedirect />
        </Suspense>
      ),
    },
    {
      path: "modify", // 회원정보 수정 페이지
      element: (
        <Suspense fallback={Loading}>
          <MemberModify />
        </Suspense>
      ),
    },
    {
      path: "policies", // 서비스 약관 및 개인정보처리방침 페이지
      element: (
        <Suspense fallback={Loading}>
          <CombinedPolicyPage />
        </Suspense>
      ),
    },
  
    {
      path: "signup", // 회원가입 페이지
      element: (
        <Suspense fallback={Loading}>
          <SignupPage />
        </Suspense>
      ),
    },
  ];
};

export default userRouter;
