import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "../../components/menus/NavigationMenu";

const PasswordResetPage = () => {
  const [activeTab, setActiveTab] = useState("phone"); // 탭 상태 (휴대폰 인증, 이메일 인증)
  const [userData, setUserData] = useState({ id: "", phone: "", email: "" }); // 입력 상태
  const [isDisabled, setIsDisabled] = useState(true); // 버튼 활성화 상태
  const navigate = useNavigate();

  // 입력 값 핸들링
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setIsDisabled(!value); // 값 입력 여부에 따라 버튼 활성화
  };

  return (
    <>
      <NavigationMenu />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          {/* 제목 */}
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            비밀번호 찾기
          </h1>

          {/* 탭 메뉴 */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("phone")}
              className={`w-1/2 text-center py-2 font-bold ${
                activeTab === "phone" ? "text-purple-700 border-b-2 border-purple-700" : "text-gray-500"
              }`}
            >
              휴대폰 인증
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`w-1/2 text-center py-2 font-bold ${
                activeTab === "email" ? "text-purple-700 border-b-2 border-purple-700" : "text-gray-500"
              }`}
            >
              이메일 인증
            </button>
          </div>

          {/* 입력 폼 */}
          <div className="space-y-4">
            {activeTab === "phone" && (
              <>
                <div>
                  <label className="block text-gray-600 mb-2">아이디</label>
                  <input
                    type="text"
                    name="id"
                    placeholder="아이디를 입력해 주세요"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">휴대폰 번호</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="휴대폰 번호를 입력해 주세요"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </>
            )}

            {activeTab === "email" && (
              <>
                <div>
                  <label className="block text-gray-600 mb-2">이메일</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="이메일을 입력해 주세요"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* 인증 버튼 */}
          <button
            disabled={isDisabled}
            className={`w-full mt-6 py-3 rounded-lg font-bold ${
              isDisabled
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-purple-700 text-white hover:bg-purple-800"
            }`}
          >
            인증번호 받기
          </button>

          {/* 로그인 페이지로 돌아가기 */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/user/login")}
              className="text-sm text-gray-500 hover:underline"
            >
              로그인 페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetPage;
