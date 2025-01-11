// import { useState } from "react";
// import NavigationMenu from "../../components/menus/NavigationMenu";
// import ResultModal from "../../components/common/ResultModal"; // ResultModal 컴포넌트 추가

// const FindIdPage = () => {
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [isPhone, setIsPhone] = useState(true); // 인증 방식 상태
//   const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isPhone) {
//       setMessage("가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요.");
//     } else {
//       setMessage("가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요.");
//     }
//     setIsModalOpen(true); // 인증번호 버튼 클릭 시 모달 열기
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // 모달 닫기
//   };

//   return (
//     <>
//       {/* 네비게이션 메뉴 */}
//       <NavigationMenu />

//       {/* 페이지 컨텐츠 */}
//       <div className="min-h-screen bg-gray-100 flex flex-col items-center">
//         <h1 className="text-2xl font-bold text-gray-700 mt-12 mb-8">
//           아이디 찾기
//         </h1>

//         {/* 인증 방식 선택 탭 */}
//         <div className="flex space-x-4 mb-6 border-b-2 border-gray-400 w-full max-w-sm justify-center">
//           <button
//             onClick={() => setIsPhone(true)}
//             className={`pb-2 px-4 font-medium ${
//               isPhone
//                 ? "text-gray-700 border-b-4 border-gray-700"
//                 : "text-gray-500"
//             }`}
//           >
//             휴대폰 인증
//           </button>
//           <button
//             onClick={() => setIsPhone(false)}
//             className={`pb-2 px-4 font-medium ${
//               !isPhone
//                 ? "text-gray-700 border-b-4 border-gray-700"
//                 : "text-gray-500"
//             }`}
//           >
//             이메일 인증
//           </button>
//         </div>

//         {/* 인증 폼 */}
//         <form onSubmit={handleSubmit} className="w-full max-w-sm px-4 space-y-6">
//           {/* 이름 입력 필드 */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-2">이름</label>
//             <input
//               type="text"
//               name="name"
//               className="w-full border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               placeholder="이름을 입력해 주세요"
//               required
//             />
//           </div>

//           {/* 인증 방식에 따라 다르게 나타나는 입력란 */}
//           {isPhone ? (
//             <div>
//               <label className="block text-gray-600 font-medium mb-2">
//                 휴대폰 번호
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="w-full border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 placeholder="휴대폰 번호를 입력해 주세요"
//                 required
//               />
//             </div>
//           ) : (
//             <div>
//               <label className="block text-gray-600 font-medium mb-2">
//                 이메일
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 placeholder="이메일을 입력해 주세요"
//                 required
//               />
//             </div>
//           )}

//           {/* 인증 버튼 */}
//           <button
//             type="submit"
//             className="w-full bg-gray-700 text-white font-bold py-3 rounded-md hover:bg-gray-800"
//           >
//             인증번호 받기
//           </button>
//         </form>
//       </div>

//       {/* 모달 */}
//       {isModalOpen && (
//         <ResultModal
//           title="알림"
//           content={message}
//           callbackFn={handleCloseModal}
//         />
//       )}
//     </>
//   );
// };

// export default FindIdPage;


//진수님 프론트
import React, { useState } from "react";
import NavigationMenu from "../../components/menus/NavigationMenu";
import ResultModal from "../../components/common/ResultModal"; // ResultModal 컴포넌트 추가

const FindIdPage = () => {
  const [activeTab, setActiveTab] = useState("phone"); // 탭 상태 (휴대폰 인증, 이메일 인증)
  const [userData, setUserData] = useState({ name: "", phone: "", email: "" }); // 입력 상태
  const [isDisabled, setIsDisabled] = useState(true); // 버튼 활성화 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setIsDisabled(!value); // 값 입력 여부에 따라 버튼 활성화
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalMessage("가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요.");
    setIsModalOpen(true); // 인증번호 버튼 클릭 시 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 네비게이션 메뉴 */}
      <NavigationMenu />

      {/* 아이디 찾기 섹션 */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          {/* 제목 */}
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            아이디 찾기
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 입력 필드 */}
            <div>
              <label className="block text-gray-600 mb-2">이름</label>
              <input
                type="text"
                name="name"
                placeholder="이름을 입력해 주세요"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* 인증 방식에 따른 입력 필드 */}
            {activeTab === "phone" ? (
              <div>
                <label className="block text-gray-600 mb-2">휴대폰 번호</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="휴대폰 번호를 입력해 주세요"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-gray-600 mb-2">이메일</label>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력해 주세요"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {/* 인증 버튼 */}
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full py-3 rounded-lg font-bold ${
                isDisabled
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-purple-700 text-white hover:bg-purple-800"
              }`}
            >
              인증번호 받기
            </button>
          </form>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <ResultModal
          title="알림"
          content={modalMessage}
          callbackFn={handleCloseModal}
        />
      )}
    </>
  );
};

export default FindIdPage;
