import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/authSlice";
import { getSocialLoginLink } from "../api/SocialApi";
import ResultModal from "../components/common/ResultModal"; // 예외 처리 모달
import { resetCart } from "../slices/cartSlice";

const useCustomAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.authSlice); // 로그인 상태
  const isLogin = !!loginState.email; // 로그인 여부

  const doLogin = async (loginParam) => {
    try {
      const action = await dispatch(loginPostAsync(loginParam));
      return action.payload;
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      throw error;
    }
  };

  const doLogout = () => {
    dispatch(resetCart());
    dispatch(logout()); // 로그아웃 처리
    alert("로그아웃되었습니다.");
    navigate("/user/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true }); // 지정된 경로로 이동
  };

  const moveToLogin = () => {
    navigate({ pathname: "/user/login" }, { replace: true }); // 로그인 페이지로 이동
  };

  const moveToLoginReturn = () => {
    return <Navigate replace to="/user/login" />; // 로그인 페이지 컴포넌트 리턴
  };

  const handleSocialLogin = (platform) => {
    const loginUrl = getSocialLoginLink(platform);
    window.location.href = loginUrl; // 소셜 로그인 URL로 리다이렉트
  };

  const exceptionHandle = (ex) => {
    console.error("예외 처리:", ex);

    const errorMsg = ex.response?.data?.error || "알 수 없는 오류 발생";
    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인이 필요합니다.");
      navigate({ pathname: "/user/login", search: errorStr });
      return;
    }

    if (errorMsg === "ERROR_ACCESSDENIED") {
      alert("접근 권한이 없습니다.");
      navigate({ pathname: "/user/login", search: errorStr });
      return;
    }

    // 기타 오류
    alert("오류 발생: " + errorMsg);
  };

  const renderErrorModal = (title, content) => {
    return <ResultModal title={title} content={content} />;
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    handleSocialLogin,
    exceptionHandle,
    renderErrorModal,
  };
};

export default useCustomAuth;
