// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const PasswordConfirmPage = () => {
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handlePasswordConfirm = async () => {
//     try {
//       const response = await axios.post("/api/verify-password", { password });

//       if (response.data.isValid) {
//         localStorage.setItem("passwordConfirmed", "true");
//         navigate("/mypage/modify");
//       } else {
//         setErrorMessage("비밀번호가 올바르지 않습니다.");
//       }
//     } catch (err) {
//       setErrorMessage("서버와의 통신에 실패했습니다. 다시 시도해주세요.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-start h-screen text-center pt-10">
//     {/* 제목 */}
//     <h1 className="text-3xl font-bold mb-6 text-gray-700">
//       비밀번호 확인
//     </h1>
  
//     {/* 설명 */}
//     <p className="text-gray-600 mb-6">
//       회원정보를 수정하기 위해 비밀번호를 다시 한번 입력해주세요.
//     </p>
  
//     {/* 구분선 */}
//     <div className="w-1/2 border-t border-gray-300 mt-4 mb-8"></div>

  

// {/* 입력 필드 */}
// <input
//   type="password"
//   placeholder="비밀번호를 입력해주세요"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   className="w-80 px-4 py-3 text-black font-bold border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-default mb-8"

// />



  
//     {/* 에러 메시지 */}
//     {errorMessage && (
//       <p className="text-red-500 text-sm mb-6">{errorMessage}</p>
//     )}
  
//     {/* 확인 버튼 */}
//     <button
//       type="button"
//       onClick={handlePasswordConfirm}
//       className="w-40 px-4 py-3 text-black font-bold border border-black cursor-pointer rounded-none hover:bg-gray-200 hover:text-black ml-4"
//     >
//       확인
//     </button>
//   </div>
  
 
//   );
  
  
// };  

// export default PasswordConfirmPage;


//진수님 프론트
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../../util/authCookieUtil'; // 쿠키 유틸리티 사용
import { API_SERVER_HOST } from '../../api/todoApi'; // API 서버 주소 가져오기

const PasswordConfirmPage = () => {
  const [password, setPassword] = useState(''); // 비밀번호 상태 관리
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 관리
  const navigate = useNavigate();

  const handlePasswordConfirm = async () => {
    // 쿠키에서 사용자 정보 가져오기
    const memberInfo = getCookie('member');

    if (!memberInfo) {
      setErrorMessage('로그인이 필요합니다.');
      console.error('로그인 정보가 없습니다.');
      return;
    }

    let parsedMemberInfo;
    try {
      // 쿠키 데이터를 JSON 파싱
      parsedMemberInfo = JSON.parse(memberInfo);
      console.log('파싱된 쿠키 데이터:', parsedMemberInfo);
    } catch (error) {
      console.error('쿠키 파싱 실패:', error);
      setErrorMessage('쿠키 데이터가 올바르지 않습니다.');
      return;
    }

    // 1230: 쿠키에서 이메일 추출 부분 추가
    const accessToken = parsedMemberInfo.token || parsedMemberInfo.AccessToken;
    const email = parsedMemberInfo.email || parsedMemberInfo.Email; // 1230: 이메일 정보 추출
    console.log('Access Token:', accessToken);
    console.log('Email:', email); // 1230: 이메일 로그 추가

    if (!accessToken || !email) {
      // 1230: 이메일이 없을 경우를 추가로 체크
      setErrorMessage('로그인 정보가 없습니다. 로그인이 필요합니다.');
      return;
    }

    // 서버에 비밀번호 및 이메일 검증 요청
    try {
      console.log('전송 데이터:', { email, password }); // 1230: 이메일 포함한 데이터 로그
      console.log('Authorization 헤더:', `Bearer ${accessToken}`);
      const response = await axios.post(
        `${API_SERVER_HOST}/api/verify-password`,
        { email, password }, // 1230: 이메일과 비밀번호를 함께 전송
        {
          headers: { Authorization: `Bearer ${accessToken}` }, // Authorization 헤더 설정
        }
      );

      if (response.data.isValid) {
        localStorage.setItem('passwordConfirmed', 'true'); // 비밀번호 확인 성공 표시
        navigate('/mypage/modify'); // 비밀번호 확인 성공 시 이동
      } else {
        setErrorMessage('비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('서버와의 통신 오류:', err);
      setErrorMessage('서버와의 통신에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen text-center pt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">비밀번호 확인</h1>
      <p className="text-gray-600 mb-6">
        회원정보를 수정하기 위해 비밀번호를 다시 한번 입력해주세요.
      </p>
      <p className="text-gray-600 mb-6">
        소셜회원의 경우 처음 비밀번호는 1111 입니다
      </p>
      <div className="w-1/2 border-t border-gray-300 mt-4 mb-8"></div>
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-80 px-4 py-3 text-black font-bold border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-default mb-8"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mb-6">{errorMessage}</p>
      )}
      <button
        type="button"
        onClick={handlePasswordConfirm}
        className="w-40 px-4 py-3 text-black font-bold border border-black cursor-pointer rounded-none hover:bg-gray-200 hover:text-black ml-4"
      >
        확인
      </button>
    </div>
  );
};

export default PasswordConfirmPage;
