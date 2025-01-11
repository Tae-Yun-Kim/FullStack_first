// import React, { useState } from "react";
// import { API_SERVER_HOST } from "../../api/todoApi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { signupPostAsync } from "../../slices/authSlice";
// import axios from "axios";
// import CombinedSignupModal from "../common/CombinedSignupModal";



// const SignupComponent = ({
//   step,
//   handleNextStep,
//   handlePrevStep,
//   handleSignup,
//   signupData,
//   setSignupData,
// }) => {
//   const [nicknameStatus, setNicknameStatus] = useState(null);
//   const [emailStatus, setEmailStatus] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", content: "" });
//   const [hasCheckedNickname, setHasCheckedNickname] = useState(false);
//   const [hasCheckedEmail, setHasCheckedEmail] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSignupData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleCheckNickname = async () => {
//     if (!signupData.nickname.trim()) {
//       alert("닉네임을 입력해주세요.");
//       return;
//     }
//     try {
//       const response = await axios.get(
//         `${API_SERVER_HOST}/api/check-nickname?nickname=${signupData.nickname}`
//       );
//       const isAvailable = response.data.isAvailable;
//       setHasCheckedNickname(true);
//       setNicknameStatus(
//         isAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다."
//       );
//     } catch (err) {
//       alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
//     }
//   };

//   const handleCheckEmail = async () => {
//     if (!signupData.email.trim()) {
//       alert("이메일을 입력해주세요.");
//       return;
//     }
//     try {
//       const response = await axios.get(
//         `${API_SERVER_HOST}/api/check-email?email=${signupData.email}`
//       );
//       const isAvailable = response.data.isAvailable;
//       setHasCheckedEmail(true);
//       setEmailStatus(
//         isAvailable ? "사용 가능한 이메일입니다." : "이미 사용 중인 이메일입니다."
//       );
//     } catch (err) {
//       alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
//     }
//   };

//   const openModal = (title) => {
//     setModalContent({ title });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const validateAndProceed = () => {
//     // 1단계에서 성별을 체크할 필요 없음
//     if (step === 1) {
//       if (!hasCheckedEmail || !hasCheckedNickname) {
//         alert("이메일과 닉네임 중복 확인을 완료해주세요.");
//         return;
//       }
//       if (
//         (emailStatus && emailStatus.includes("이미 사용 중")) ||
//         (nicknameStatus && nicknameStatus.includes("이미 사용 중"))
//       ) {
//         alert("중복된 이메일 또는 닉네임이 있습니다. 다시 확인해주세요.");
//         return;
//       }
//     }

//     // 2단계에서 성별을 체크
//     if (step === 2 && !signupData.gender) {
//       alert("성별을 선택해주세요.");
//       return;
//     }

//     handleNextStep();
//   };

//   const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 제어
//   //전체동의
//   const handleInternalSignup = () => {
//     if (
//       !signupData.agreeTerms ||
//       !signupData.agreePrivacy ||
//       !signupData.isOver14
//     ) {
//       alert('모든 필수 동의 항목을 체크해주세요.');
//       return;
//     }
//     handleSignup();
//   };

//   return (
//     <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
//       {step === 1 && (
//         <>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">이메일</label>
//             <div className="flex items-center">
//               <input
//                 type="email"
//                 name="email"
//                 value={signupData.email}
//                 onChange={handleChange}
//                 className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="이메일을 입력하세요"
//               />
//               <button
//                 type="button"
//                 onClick={handleCheckEmail}
//                 className="ml-2 text-gray-500 hover:font-bold focus:outline-none"
//               >
//                 중복 확인
//               </button>
//             </div>
//             {emailStatus && (
//               <p
//                 className={`text-sm mt-2 ${
//                   emailStatus.includes("사용 가능")
//                     ? "text-green-500"
//                     : "text-red-500"
//                 }`}
//               >
//                 {emailStatus}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">비밀번호</label>
//             <input
//               type="password"
//               name="password"
//               value={signupData.password}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="비밀번호를 입력하세요"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">비밀번호 확인</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={signupData.confirmPassword}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="비밀번호를 다시 입력하세요"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">닉네임</label>
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 name="nickname"
//                 value={signupData.nickname}
//                 onChange={handleChange}
//                 className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="닉네임을 입력하세요"
//               />
//               <button
//                 type="button"
//                 onClick={handleCheckNickname}
//                 className="ml-2 text-gray-500 hover:font-bold focus:outline-none"
//               >
//                 중복 확인
//               </button>
//             </div>
//             {nicknameStatus && (
//               <p
//                 className={`text-sm mt-2 ${
//                   nicknameStatus.includes("사용 가능")
//                     ? "text-green-500"
//                     : "text-red-500"
//                 }`}
//               >
//                 {nicknameStatus}
//               </p>
//             )}
//           </div>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">성별</label>
//             <div className="flex items-center space-x-4">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="MALE"
//                   checked={signupData.gender === "MALE"}
//                   onChange={handleChange}
//                   className="focus:ring-blue-400"
//                 />
//                 <span>남자</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="FEMALE"
//                   checked={signupData.gender === "FEMALE"}
//                   onChange={handleChange}
//                   className="focus:ring-blue-400"
//                 />
//                 <span>여자</span>
//               </label>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">이름</label>
//             <input
//               type="text"
//               name="username"
//               value={signupData.username}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="이름을 입력하세요"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">휴대폰 번호</label>
//             <input
//               type="text"
//               name="phone"
//               value={signupData.phone}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="휴대폰 번호를 입력하세요"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">생년월일</label>
//             <input
//               type="date"
//               name="birthDate"
//               value={signupData.birthDate}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">주소</label>
//             <input
//               type="text"
//               name="adress"
//               value={signupData.adress}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="주소를 입력하세요"
//             />
//           </div>
//         </>
//       )}





// {step === 3 && (
//   <div className="mb-6">
//     <h2 className="text-lg font-bold text-gray-700 mb-4">약관 동의</h2>
//     {/* 전체 동의 */}
//     <div className="mb-6 pb-4 border-b border-gray-300">
//       <label className="flex items-center gap-4">
//         <div
//           className={`relative w-6 h-6 rounded-full border-2 ${
//             signupData.agreeTerms && signupData.agreePrivacy && signupData.isOver14
//               ? "bg-[#660033] border-[#660033]" // 체크된 상태: 버건디
//               : "border-gray-300" // 체크되지 않은 상태: 투명한 테두리
//           }`}
//         >
//           <input
//             type="checkbox"
//             name="agreeAll"
//             checked={signupData.agreeTerms && signupData.agreePrivacy && signupData.isOver14}
//             onChange={(e) => {
//               const checked = e.target.checked;
//               handleChange({
//                 target: { name: "agreeTerms", value: checked },
//               });
//               handleChange({
//                 target: { name: "agreePrivacy", value: checked },
//               });
//               handleChange({
//                 target: { name: "isOver14", value: checked },
//               });
//             }}
//             className="appearance-none w-full h-full rounded-full focus:outline-none"
//           />
//           {signupData.agreeTerms && signupData.agreePrivacy && signupData.isOver14 && (
//             <svg
//               className="absolute inset-0 w-5 h-5 text-white m-auto" // 체크된 상태에서 흰색 아이콘
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M16.707 6.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
//             </svg>
//           )}
//         </div>
//         <span className="text-lg font-bold text-gray-800">전체 약관에 동의합니다.</span>
//       </label>
//     </div>
//     {/* 서비스 이용 약관 */}
//     <div className="mb-4">
//       <label className="flex items-center gap-4">
//         <div
//           className={`relative w-6 h-6 rounded-full border-2 ${
//             signupData.agreeTerms
//               ? "bg-[#660033] border-[#660033]" // 체크된 상태: 버건디
//               : "border-gray-300" // 체크되지 않은 상태: 투명한 테두리
//           }`}
//         >
//           <input
//             type="checkbox"
//             name="agreeTerms"
//             checked={signupData.agreeTerms}
//             onChange={handleChange}
//             className="appearance-none w-full h-full rounded-full focus:outline-none"
//           />
//           {signupData.agreeTerms && (
//             <svg
//               className="absolute inset-0 w-5 h-5 text-white m-auto" // 체크된 상태에서 흰색 아이콘
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M16.707 6.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
//             </svg>
//           )}
//         </div>
//         <span>
//           <strong>[필수]</strong> 서비스 이용 약관에 동의합니다.{" "}
//           <button
//             type="button"
//             className="text-[#660033] hover:underline" // 버건디 버튼
//             onClick={() => openModal("서비스 이용 약관")}
//           >
//             더보기
//           </button>
//         </span>
//       </label>
//     </div>
//     {/* 개인정보 처리방침 */}
//     <div className="mb-4">
//       <label className="flex items-center gap-4">
//         <div
//           className={`relative w-6 h-6 rounded-full border-2 ${
//             signupData.agreePrivacy
//               ? "bg-[#660033] border-[#660033]" // 체크된 상태: 버건디
//               : "border-gray-300" // 체크되지 않은 상태: 투명한 테두리
//           }`}
//         >
//           <input
//             type="checkbox"
//             name="agreePrivacy"
//             checked={signupData.agreePrivacy}
//             onChange={handleChange}
//             className="appearance-none w-full h-full rounded-full focus:outline-none"
//           />
//           {signupData.agreePrivacy && (
//             <svg
//               className="absolute inset-0 w-5 h-5 text-white m-auto" // 체크된 상태에서 흰색 아이콘
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M16.707 6.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
//             </svg>
//           )}
//         </div>
//         <span>
//           <strong>[필수]</strong> 개인정보 처리방침에 동의합니다.{" "}
//           <button
//             type="button"
//             className="text-[#660033] hover:underline" // 버건디 버튼
//             onClick={() => openModal("개인정보 처리방침")}
//           >
//             더보기
//           </button>
//         </span>
//       </label>
//     </div>
//     {/* 만 14세 이상 확인 */}
//     <div>
//       <label className="flex items-center gap-4">
//         <div
//           className={`relative w-6 h-6 rounded-full border-2 ${
//             signupData.isOver14
//               ? "bg-[#660033] border-[#660033]" // 체크된 상태: 버건디
//               : "border-gray-300" // 체크되지 않은 상태: 투명한 테두리
//           }`}
//         >
//           <input
//             type="checkbox"
//             name="isOver14"
//             checked={signupData.isOver14}
//             onChange={handleChange}
//             className="appearance-none w-full h-full rounded-full focus:outline-none"
//           />
//           {signupData.isOver14 && (
//             <svg
//               className="absolute inset-0 w-5 h-5 text-white m-auto" // 체크된 상태에서 흰색 아이콘
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M16.707 6.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
//             </svg>
//           )}
//         </div>
//         <span>
//           <strong>[필수]</strong> 본인은 만 14세 이상입니다.
//         </span>
//       </label>
//     </div>
//   </div>
// )}







//       <div className="flex justify-between">
//         {step > 1 && (
//           <button
//             type="button"
//             onClick={handlePrevStep}
//             className="text-gray-500 hover:font-bold focus:outline-none"
//           >
//             이전
//           </button>
//         )}
//         {step < 3 ? (
//           <button
//             type="button"
//             onClick={validateAndProceed}
//             className="text-gray-500 hover:font-bold focus:outline-none"
//           >
//             다음
//           </button>
//         ) : (
//           <button
//           type="button"
//           onClick={handleInternalSignup} // 버튼 클릭 시 handleSignup 호출
//           className="text-white px-4 py-2 rounded bg-[#660033] hover:bg-[#880044] font-bold cursor-pointer"
//         >
//           회원가입 완료
//         </button>
        
        
//         )}
//       </div>

//       {isModalOpen && (
//         <CombinedSignupModal title={modalContent.title} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default SignupComponent;


import React, { useState } from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
import axios from "axios";
import CombinedSignupModal from "../common/CombinedSignupModal";

const SignupComponent = ({ handleSignup, signupData, setSignupData }) => {
  const [nicknameStatus, setNicknameStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckNickname = async () => {
    if (!signupData.nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.get(
        `${API_SERVER_HOST}/api/check-nickname?nickname=${signupData.nickname}`
      );
      const isAvailable = response.data.isAvailable;
      setNicknameStatus(
        isAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다."
      );
    } catch (err) {
      alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleCheckEmail = async () => {
    if (!signupData.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.get(
        `${API_SERVER_HOST}/api/check-email?email=${signupData.email}`
      );
      const isAvailable = response.data.isAvailable;
      setEmailStatus(
        isAvailable ? "사용 가능한 이메일입니다." : "이미 사용 중인 이메일입니다."
      );
    } catch (err) {
      alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const openModal = (title) => {
    setModalContent({ title });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInternalSignup = () => {
    if (
      !signupData.agreeTerms ||
      !signupData.agreePrivacy ||
      !signupData.isOver14
    ) {
      alert("모든 필수 동의 항목을 체크해주세요.");
      return;
    }
    handleSignup();
  };

  return (
    <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
      {/* 회원가입 페이지 제목 */}
      <h1 className="text-center text-2xl font-bold my-20">회원가입페이지</h1>
  
      {/* 이메일 */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">이메일</label>
        <div className="flex items-center">
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-vibrantOlive"
            placeholder="이메일을 입력하세요"
          />
          <button
            type="button"
            onClick={handleCheckEmail}
            className="ml-2 text-gray-500 hover:font-bold focus:outline-none"
          >
            중복 확인
          </button>
        </div>
        {emailStatus && (
          <p
            className={`text-sm mt-2 ${
              emailStatus.includes("사용 가능")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {emailStatus}
          </p>
        )}
      </div>

      {/* 비밀번호 */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">비밀번호</label>
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-vibrantOlive"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-vibrantOlive"
          placeholder="비밀번호를 다시 입력하세요"
        />
      </div>

      {/* 닉네임 */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">닉네임</label>
        <div className="flex items-center">
          <input
            type="text"
            name="nickname"
            value={signupData.nickname}
            onChange={handleChange}
            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-vibrantOlive"
            placeholder="닉네임을 입력하세요"
          />
          <button
            type="button"
            onClick={handleCheckNickname}
            className="ml-2 text-gray-500 hover:font-bold focus:outline-none"
          >
            중복 확인
          </button>
        </div>
        {nicknameStatus && (
          <p
            className={`text-sm mt-2 ${
              nicknameStatus.includes("사용 가능")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {nicknameStatus}
          </p>
        )}
      </div>

      {/* 성별 */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">성별</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="MALE"
              checked={signupData.gender === "MALE"}
              onChange={handleChange}
              className="focus:ring-luxury-vibrantOlive"
            />
            <span>남자</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              checked={signupData.gender === "FEMALE"}
              onChange={handleChange}
              className="focus:ring-luxury-vibrantOlive"
            />
            <span>여자</span>
          </label>
        </div>
      </div>

      {/* 이름, 휴대폰, 생년월일, 주소 */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">이름</label>
        <input
          type="text"
          name="username"
          value={signupData.username}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-vibrantOlive"
          placeholder="이름을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">휴대폰 번호</label>
        <input
          type="text"
          name="phone"
          value={signupData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-vibrantOlive"
          placeholder="휴대폰 번호를 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">생년월일</label>
        <input
          type="date"
          name="birthDate"
          value={signupData.birthDate}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-vibrantOlive"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">주소</label>
        <input
          type="text"
          name="adress"
          value={signupData.adress}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-vibrantOlive"
          placeholder="주소를 입력하세요"
        />
      </div>

    {/* 약관 동의 */}
<div className="mb-6">
  <h2 className="text-lg font-bold text-gray-700 mb-4">약관 동의</h2>

  {/* 전체 동의 */}
  <div className="mb-6 pb-4 border-b border-gray-300">
    <label className="flex items-center gap-4">
      <div
        className={`relative w-6 h-6 rounded-full border-2 ${
          signupData.agreeTerms && signupData.agreePrivacy && signupData.isOver14
            ? "bg-luxury-vibrantOlive" // 체크된 상태: 버건디
            : "border-gray-300" // 체크되지 않은 상태: 투명한 테두리
        }`}
      >
        <input
          type="checkbox"
          name="agreeAll"
          checked={
            signupData.agreeTerms &&
            signupData.agreePrivacy &&
            signupData.isOver14
          }
          onChange={(e) => {
            const checked = e.target.checked;
            handleChange({ target: { name: "agreeTerms", value: checked } });
            handleChange({ target: { name: "agreePrivacy", value: checked } });
            handleChange({ target: { name: "isOver14", value: checked } });
          }}
          className="appearance-none w-full h-full rounded-full focus:outline-none"
        />
        {signupData.agreeTerms &&
          signupData.agreePrivacy &&
          signupData.isOver14 && (
            <svg
              className="absolute inset-0 w-5 h-5 text-white m-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M16.707 6.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
            </svg>
          )}
      </div>
      <span className="text-lg font-bold text-gray-800">
        전체 약관에 동의합니다.
      </span>
    </label>
  </div>

  {/* 개별 약관 */}
  <div className="mb-4">
    <label className="flex items-center gap-4">
      <div
        className={`relative w-6 h-6 rounded-full border-2 ${
          signupData.agreeTerms
            ? "bg-luxury-vibrantOlive" // 체크된 상태: 버건디
            : "border-gray-300" // 체크되지 않은 상태: 투명한 테두리
        }`}
      >
        <input
          type="checkbox"
          name="agreeTerms"
          checked={signupData.agreeTerms}
          onChange={handleChange}
          className="appearance-none w-full h-full rounded-full focus:outline-none"
        />
        {signupData.agreeTerms && (
          <svg
            className="absolute inset-0 w-5 h-5 text-white m-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M16.707 6.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
          </svg>
        )}
      </div>
      <span>
        <strong>[필수]</strong> 서비스 이용 약관에 동의합니다.{" "}
        <button
          type="button"
          className="text-[#660033] hover:underline"
          onClick={() => openModal("서비스 이용 약관")}
        >
          더보기
        </button>
      </span>
    </label>
  </div>

  <div className="mb-4">
    <label className="flex items-center gap-4">
      <div
        className={`relative w-6 h-6 rounded-full border-2 ${
          signupData.agreePrivacy
            ? "bg-luxury-vibrantOlive" // 체크된 상태: 버건디
            : "border-gray-300" // 체크되지 않은 상태: 투명한 테두리
        }`}
      >
        <input
          type="checkbox"
          name="agreePrivacy"
          checked={signupData.agreePrivacy}
          onChange={handleChange}
          className="appearance-none w-full h-full rounded-full focus:outline-none"
        />
        {signupData.agreePrivacy && (
          <svg
            className="absolute inset-0 w-5 h-5 text-white m-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M16.707 6.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
          </svg>
        )}
      </div>
      <span>
        <strong>[필수]</strong> 개인정보 처리방침에 동의합니다.{" "}
        <button
          type="button"
          className="text-[#660033] hover:underline"
          onClick={() => openModal("개인정보 처리방침")}
        >
          더보기
        </button>
      </span>
    </label>
  </div>

  <div>
    <label className="flex items-center gap-4">
      <div
        className={`relative w-6 h-6 rounded-full border-2 ${
          signupData.isOver14
            ? "bg-luxury-vibrantOlive" // 체크된 상태: 버건디
            : "border-gray-300" // 체크되지 않은 상태: 투명한 테두리
        }`}
      >
        <input
          type="checkbox"
          name="isOver14"
          checked={signupData.isOver14}
          onChange={handleChange}
          className="appearance-none w-full h-full rounded-full focus:outline-none"
        />
        {signupData.isOver14 && (
          <svg
            className="absolute inset-0 w-5 h-5 text-white m-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M16.707 6.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
          </svg>
        )}
      </div>
      <span>
        <strong>[필수]</strong> 본인은 만 14세 이상입니다.
      </span>
    </label>
  </div>
</div>


      {/* 회원가입 완료 버튼 */}
      <div className="text-right">
        <button
          type="button"
          onClick={handleInternalSignup}
          className="text-white px-4 py-2 rounded bg-luxury-vibrantOlive hover:bg-luxury-darkBurgundy font-bold cursor-pointer"
        >
          회원가입 완료
        </button>
      </div>

      {isModalOpen && (
      <CombinedSignupModal title={modalContent.title} onClose={closeModal} />
    )}
  </div>
);
};

export default SignupComponent;