import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaRegHeart, FaShoppingCart, FaBookOpen, FaHeart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { restoreLogin, logout } from "../../slices/authSlice";
import SearchBar from "./SearchBar"; // SearchBar 컴포넌트 임포트
import { resetCart } from "../../slices/cartSlice";
import useAuth from "../../hooks/useAuth";
import ImageSearch from "../../ImageSearch";



const NavigationMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux에서 로그인 상태 가져오기
  const loginState = useSelector((state) => state.auth);
  const isLoggedIn = !!loginState?.token; // 토큰이 존재하면 로그인 상태로 간주
  const user = useAuth();// 사용자 이름 가져오기 (기본값: "사용자")
  
  // 초기 상태 복구
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loginState.token && token) {
      const cookieData = JSON.parse(localStorage.getItem("member") || "{}");
      dispatch(restoreLogin(cookieData));
    }
  }, [dispatch, loginState.token]);

  // 로그아웃 처리
  const handleLogout = () => {
    dispatch(logout()); // Redux 상태 초기화
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
    dispatch(resetCart());
    alert("로그아웃되었습니다."); // 장바구니 상태 초기화
    navigate("/user/login"); // 로그인 페이지로 이동
  };

  // 마이페이지 이동
  const handleMyPageClick = () => {
    navigate("/mypage"); // 마이페이지 메인 경로로 이동
  };

  return (
    <div className="navbar bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      {/* 상단 로그인/회원가입/고객센터 영역 */}
      <div className="container mx-auto flex justify-end items-center px-6 py-2 text-sm">
        {!isLoggedIn ? (
          <>
            <Link to="/user/login" className="text-gray-600 px-2 hover:text-luxury-lightOlive">
              로그인
            </Link>
            <Link to="/user/signup" className="text-gray-600 px-2">
              회원가입
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="text-gray-600 px-2 focus:outline-none hover:text-luxury-lightOlive"
            >
              로그아웃
            </button>
            <button
              onClick={handleMyPageClick}
              className="text-gray-600 px-2 focus:outline-none"
            >
              {user?.name}님
            </button>
            {/* 관리자 메뉴 */}
             {user?.roleNames.includes("ADMIN") && (
               <Link to="/admin" className="text-red-600 hover:text-red-800">
                 관리자 페이지
               </Link>
              )}
          </>
        )}
        <Link to="/qna" className="text-gray-600 px-2 hover:text-luxury-lightOlive">
          고객센터
        </Link>
      </div>

      {/* 3등분 구조 영역 */}
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* 로고 */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" alt="demo Logo" className="h-20" />
            {/* <span className="ml-2 text-luxury-lightOlive font-bold text-2xl">
              로고텍스트
            </span> */}
          </Link>
        </div>

        {/* 검색바 */}
        <SearchBar /> {/* SearchBar 컴포넌트 삽입 */}
        {/* <ImageAnalyzer /> */}
        <ImageSearch />

        {/* 좋아요 및 장바구니 */}
        <div className="flex space-x-8">
          <Link to="/mypage">
            <FaHeart className="text-gray-600 text-3xl hover:text-luxury-lightOlive" />
          </Link>
          <Link to="/mypage/cart">
            <FaShoppingCart className="text-gray-600 text-3xl hover:text-luxury-lightOlive" />
          </Link>
          {/* 게시판 아이콘 */}
          <Link to="/community/list">
            <FaBookOpen  className="text-gray-600 text-3xl hover:text-luxury-lightOlive" />
          </Link>
        </div>
      </div>

      {/* 하단 메뉴 */}
      <div className="flex justify-center space-x-12 py-4 border-t border-gray-300 w-full text-base font-medium">
        <Link to="/page/koreanfood" className="text-gray-600 hover:text-luxury-lightOlive">
          한식
        </Link>
        <Link to="/page/japanesefood" className="text-gray-600 hover:text-luxury-lightOlive">
          일식
        </Link>
        <Link to="/page/chinesefood" className="text-gray-600 hover:text-luxury-lightOlive">
          중식
        </Link>
        <Link to="/page/westernfood" className="text-gray-600 hover:text-luxury-lightOlive">
          양식
        </Link>
        <Link to="/page/etcfood" className="text-gray-600 hover:text-luxury-lightOlive">
          기타
        </Link>
        {/* 밀키트 등록 메뉴
        <Link to="/page/register" className="text-gray-600 hover:text-gray-800">
          밀키트 등록
        </Link> */}
      </div>
    </div>
  );
};

export default NavigationMenu;
