// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const UserModifyComponent = ({ userData }) => {
// //   const [member, setMember] = useState({
// //     id: "",
// //     password: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //     nickname: "",
// //     email: "",
// //     emailDomain: "@naver.com",
// //     phone: "",
// //     address: "", // 주소 필드 추가
// //   });

// //   const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

// //   useEffect(() => {
// //     if (userData) {
// //       setMember({
// //         id: userData.id,
// //         nickname: userData.nickname,
// //         email: userData.email,
// //         emailDomain: userData.emailDomain || "@naver.com",
// //         phone: userData.phone,
// //         address: userData.address || "", // 주소 데이터 로드
// //       });
// //     }
// //   }, [userData]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setMember((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleCheckNickname = async () => {
// //     if (!member.nickname.trim()) {
// //       alert("닉네임을 입력해주세요.");
// //       return;
// //     }
// //     try {
// //       const response = await axios.get(
// //         `/api/check-nickname?nickname=${member.nickname}`
// //       );
// //       const isAvailable = response.data.isAvailable;
// //       setIsNicknameAvailable(isAvailable);
// //       alert(isAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다.");
// //     } catch (err) {
// //       alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       await axios.put("/api/update-member", {
// //         id: member.id,
// //         password: member.password,
// //         newPassword: member.newPassword,
// //         nickname: member.nickname,
// //         email: member.email,
// //         phone: member.phone,
// //         address: member.address, // 주소 필드 추가
// //       });
// //       alert("회원 정보가 수정되었습니다.");
// //     } catch (err) {
// //       alert("정보 수정에 실패했습니다.");
// //     }
// //   };

// //   const handleDeleteAccount = async () => {
// //     try {
// //       await axios.delete(`/api/delete-member/${member.id}`);
// //       alert("회원 탈퇴가 완료되었습니다.");
// //     } catch (err) {
// //       alert("회원 탈퇴에 실패했습니다.");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen">
    
  
// //       {/* 컨테이너 */}
// //       <div className="container mx-auto py-8">
// //   <div className="w-full max-w-2xl mx-auto py-8">
// //           {/* 필수 입력 표시 */}
// //           <p className="text-left text-gray-500 text-sm mb-6">
// //             <span className="text-red-500">*</span> 필수 입력사항
// //           </p>
  
// //           <div className="space-y-6">
// //             {/* 이메일 */}
// //             <div className="flex items-center">
// //               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
// //                 이메일<span className="text-red-500">*</span>
// //               </label>
// //               <input
// //                 type="email"
// //                 value={member.email}
// //                 readOnly
// //                 className="w-3/4 border border-gray-300 p-3 bg-gray-100 text-gray-500 cursor-not-allowed rounded-none"
// //               />
// //             </div>
  
// //             {/* 현재 비밀번호 */}
// //             <div className="flex items-center">
// //               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
// //                 현재 비밀번호<span className="text-red-500">*</span>
// //               </label>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 value={member.password}
// //                 onChange={handleInputChange}
// //                 className="w-3/4 border border-gray-300 p-3 rounded-none"
// //               />
// //             </div>
  
// //             {/* 새 비밀번호 */}
// //             <div className="flex items-center">
// //               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
// //                 새 비밀번호<span className="text-red-500">*</span>
// //               </label>
// //               <input
// //                 type="password"
// //                 name="newPassword"
// //                 value={member.newPassword}
// //                 onChange={handleInputChange}
// //                 className="w-3/4 border border-gray-300 p-3 rounded-none"
// //               />
// //             </div>
  
// //             {/* 새 비밀번호 확인 */}
// //             <div className="flex items-center">
// //               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
// //                 새 비밀번호 확인<span className="text-red-500">*</span>
// //               </label>
// //               <input
// //                 type="password"
// //                 name="confirmPassword"
// //                 value={member.confirmPassword}
// //                 onChange={handleInputChange}
// //                 className="w-3/4 border border-gray-300 p-3 rounded-none"
// //               />
// //             </div>
  
// //             {/* 닉네임 */}
// //             <div className="flex items-center">
// //               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
// //                 닉네임<span className="text-red-500">*</span>
// //               </label>
// //               <div className="w-3/4 flex items-center space-x-3">
// //                 <input
// //                   type="text"
// //                   name="nickname"
// //                   value={member.nickname}
// //                   onChange={handleInputChange}
// //                   className="flex-grow border border-gray-300 p-3 rounded-none"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={handleCheckNickname}
// //                   className="px-4 py-2 border border-gray-300 hover:border-gray-400 rounded-none"
// //                 >
// //                   중복 확인
// //                 </button>
// //               </div>
// //             </div>
  
// //             {/* 주소 */}
// //             <div className="flex items-center">
// //               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
// //                 주소<span className="text-red-500">*</span>
// //               </label>
// //               <input
// //                 type="text"
// //                 name="address"
// //                 value={member.address}
// //                 onChange={handleInputChange}
// //                 placeholder="주소를 입력해주세요"
// //                 className="w-3/4 border border-gray-300 p-3 rounded-none"
// //               />
// //             </div>
// //           </div>
  
// //           {/* 버튼 */}
// //           <div className="mt-16 flex justify-center space-x-6">
// //             <button
// //               type="button"
// //               onClick={handleSubmit}
// //               className="w-40 px-4 py-3 bg-black text-white font-bold border border-black cursor-pointer rounded-none"
// //             >
// //               회원정보수정
// //             </button>
// //             <button
// //               type="button"
// //               onClick={handleDeleteAccount}
// //               className="w-40 px-4 py-3 text-black font-bold border border-black cursor-pointer rounded-none"
// //               style={{ backgroundColor: "transparent" }}
// //             >
// //               탈퇴하기
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>

  
// //   );
// // };  

// // export default UserModifyComponent;


// //진수님 프론트
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getCookie } from '../../util/authCookieUtil'; // 쿠키 유틸리티 사용
// import { API_SERVER_HOST } from '../../api/todoApi';
// import { useNavigate, useLocation } from 'react-router-dom';

// const UserModifyComponent = () => {
//   const [member, setMember] = useState({
//     newPassword: '',
//     confirmPassword: '',
//     nickname: '',
//     username: '',
//     email: '',
//     phonenumber: '',
//     birthDate: '',
//     adress: '',
//     gender: '',
//   });

//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 삭제 확인 모달 상태
//   const [nicknameStatus, setNicknameStatus] = useState('');
//   const [originalNickname, setOriginalNickname] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleCheckNickname = async () => {
//     if (!member.nickname.trim()) {
//       alert('닉네임을 입력해주세요.');
//       return;
//     }

//     if (member.nickname === originalNickname) {
//       setNicknameStatus('현재 사용 중인 닉네임입니다.');
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `${API_SERVER_HOST}/api/check-nickname?nickname=${member.nickname}`
//       );
//       const isAvailable = response.data.isAvailable;
//       setNicknameStatus(
//         isAvailable
//           ? '사용 가능한 닉네임입니다.'
//           : '이미 사용 중인 닉네임입니다.'
//       );
//     } catch (err) {
//       alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
//     }
//   };

//   const fetchMemberInfo = async () => {
//     try {
//       const memberInfo = getCookie('member');
//       console.log('Step 1: Raw member info from cookie:', memberInfo);

//       if (!memberInfo) {
//         alert('로그인이 필요합니다.');
//         return;
//       }

//       const parsedMemberInfo = JSON.parse(memberInfo);
//       const email = parsedMemberInfo.email;

//       console.log('Step 2: Extracted email:', email);

//       if (!email) {
//         alert('유효한 로그인 정보가 없습니다.');
//         return;
//       }

//       // 서버로 이메일 요청
//       const response = await axios.get(`${API_SERVER_HOST}/api/member/info`, {
//         params: { email }, // 쿼리 파라미터로 이메일 전달
//       });

//       console.log('Step 3: API Response:', response.data);

//       const data = response.data;

//       // null 값에 대한 기본값 설정
//       setMember({
//         email: data.email || '',
//         nickname: data.nickname || '',
//         username: data.username || '홍길동',
//         phonenumber: data.phonenumber || '0000',
//         birthDate: data.birthDate || new Date().toISOString().split('T')[0], // 오늘 날짜
//         adress: data.adress || '0000',
//         gender: data.gender || 'NULL', // '안알랴쥼' 대신 'NULL' 사용
//         newPassword: '',
//         confirmPassword: '',
//       });
//       setOriginalNickname(data.nickname || '');
//     } catch (error) {
//       console.error(
//         'Error during fetchMemberInfo:',
//         error.response?.data || error.message
//       );
//       alert('회원 정보를 가져오는 데 실패했습니다.');
//     }
//   };

//   useEffect(() => {
//     fetchMemberInfo();
//   }, []);

//   useEffect(() => {
//     // 컴포넌트 로드 시 passwordConfirmed 값을 삭제
//     localStorage.removeItem('passwordConfirmed');
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setMember((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     if (member.newPassword !== member.confirmPassword) {
//       alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
//       return;
//     }

//     try {
//       const token = getCookie('member'); // JWT 토큰 가져오기
//       console.log('Submit Step 1: Token from cookie:', token);

//       // 초기 상태와 비교하여 변경된 필드만 추출
//       const updatedFields = {};
//       for (const key in member) {
//         if (key === 'newPassword' || key === 'confirmPassword') continue; // 비밀번호 필드는 따로 처리
//         if (member[key] && member[key] !== '') {
//           updatedFields[key] = member[key];
//         }
//       }
//       if (member.newPassword) {
//         updatedFields.password = member.newPassword; // 비밀번호 변경 시만 추가
//       }

//       console.log('Submit Step 2: Payload with updated fields:', updatedFields);

//       const response = await axios.put(
//         `${API_SERVER_HOST}/api/member/modify`,
//         updatedFields,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log('Submit Step 3: Response from server:', response.data);

//       if (response.data.result === 'modified') {
//         alert('회원 정보가 수정되었습니다.');
//         navigate(location.state?.from || '/'); // 이전 페이지로 이동, 없으면 메인 페이지로 이동
//       } else {
//         alert('회원 정보 수정에 실패했습니다.');
//       }
//     } catch (error) {
//       console.error(
//         'Error during handleSubmit:',
//         error.response?.data || error.message
//       );
//       alert('회원 정보 수정 중 오류가 발생했습니다.');
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       const token = getCookie('member');
//       const response = await axios.delete(
//         `${API_SERVER_HOST}/api/member/delete`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           data: { email: member.email },
//         }
//       );

//       console.log('Account deletion response:', response.data);

//       if (response.status === 200) {
//         alert('계정이 성공적으로 삭제되었습니다.');
//         window.location.href = '/'; // 삭제 후 메인 페이지로 리다이렉트
//       }
//     } catch (error) {
//       console.error(
//         'Error during account deletion:',
//         error.response?.data || error.message
//       );
//       alert('계정 삭제 중 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="container mx-auto py-8">
//         <div className="w-full max-w-2xl mx-auto py-8">
//           <p className="text-left text-gray-500 text-sm mb-6">
//             <span className="text-red-500">*</span> 필수 입력사항
//           </p>

//           <div className="space-y-6">
//             <div className="flex items-center">
//               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
//                 이메일<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 value={member.email}
//                 readOnly
//                 className="w-3/4 border border-gray-300 p-3 bg-gray-100 text-gray-500 cursor-not-allowed rounded-none"
//               />
//             </div>
//             <div className="flex items-center">
//               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
//                 이름
//               </label>
//               <input
//                 type="username"
//                 name="username"
//                 value={member.username}
//                 onChange={handleInputChange}
//                 className="w-3/4 border border-gray-300 p-3 rounded-none"
//               />
//             </div>

//             <div className="flex items-center">
//               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
//                 새 비밀번호
//               </label>
//               <input
//                 type="password"
//                 name="newPassword"
//                 value={member.newPassword}
//                 onChange={handleInputChange}
//                 className="w-3/4 border border-gray-300 p-3 rounded-none"
//                 autoComplete="new-password"
//               />
//             </div>

//             <div className="flex items-center">
//               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
//                 새 비밀번호 확인
//               </label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={member.confirmPassword}
//                 onChange={handleInputChange}
//                 className="w-3/4 border border-gray-300 p-3 rounded-none"
//               />
//             </div>

//             <div className="flex items-center">
//               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
//                 닉네임
//               </label>
//               <div className="flex flex-col w-3/4">
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     name="nickname"
//                     value={member.nickname}
//                     onChange={handleInputChange}
//                     className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="닉네임을 입력하세요"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleCheckNickname}
//                     className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
//                   >
//                     중복 확인
//                   </button>
//                 </div>
//                 {nicknameStatus && (
//                   <p
//                     className={`text-sm mt-2 ${
//                       nicknameStatus.includes('사용 가능')
//                         ? 'text-green-500'
//                         : 'text-red-500'
//                     }`}
//                   >
//                     {nicknameStatus}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center">
//               <label className="w-1/4 font-semibold">성별</label>
//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="MALE"
//                     checked={member.gender === 'MALE'}
//                     onChange={handleInputChange}
//                   />
//                   <span>남자</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="FEMALE"
//                     checked={member.gender === 'FEMALE'}
//                     onChange={handleInputChange}
//                   />
//                   <span>여자</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="NULL"
//                     checked={member.gender === 'NULL'}
//                     onChange={handleInputChange}
//                   />
//                   <span>안알랴쥼</span>
//                 </label>
//               </div>
//             </div>

//             <div className="flex items-center">
//               <label className="w-1/4 font-semibold">생년월일</label>
//               <input
//                 type="date"
//                 name="birthDate"
//                 value={member.birthDate}
//                 onChange={handleInputChange}
//                 className="w-3/4 border border-gray-300 p-3 rounded-none"
//               />
//             </div>

//             <div className="flex items-center">
//               <label className="w-1/4 font-semibold">휴대폰</label>
//               <input
//                 type="tel"
//                 name="phonenumber"
//                 value={member.phonenumber}
//                 onChange={handleInputChange}
//                 className="w-3/4 border rounded-md p-2"
//               />
//             </div>

//             <div className="flex items-center">
//               <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
//                 주소
//               </label>
//               <input
//                 type="text"
//                 name="adress"
//                 value={member.adress}
//                 onChange={handleInputChange}
//                 className="w-3/4 border border-gray-300 p-3 rounded-none"
//               />
//             </div>
//           </div>

//           <div className="mt-16 flex justify-center space-x-6">
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="w-40 px-4 py-3 bg-black text-white font-bold border border-black cursor-pointer rounded-none"
//             >
//               회원정보수정
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowDeleteConfirm(true)}
//               className="w-40 px-4 py-3 bg-red-500 text-white font-bold border border-red-500 cursor-pointer rounded-none"
//             >
//               계정삭제
//             </button>
//           </div>
//         </div>
//       </div>
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={handleDeleteAccount}
//                 className="px-6 py-3 bg-red-500 text-white rounded-lg"
//               >
//                 삭제
//               </button>
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-6 py-3 bg-gray-300 text-black rounded-lg"
//               >
//                 취소
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserModifyComponent;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../../util/authCookieUtil'; // 쿠키 유틸리티 사용
import { API_SERVER_HOST } from '../../api/todoApi';
import { useNavigate, useLocation } from 'react-router-dom';

const UserModifyComponent = () => {
  const [member, setMember] = useState({
    newPassword: '',
    confirmPassword: '',
    nickname: '',
    username: '',
    email: '',
    phonenumber: '',
    birthDate: '',
    adress: '',
    gender: '',
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 삭제 확인 모달 상태
  const [nicknameStatus, setNicknameStatus] = useState('');
  const [originalNickname, setOriginalNickname] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckNickname = async () => {
    if (!member.nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (member.nickname === originalNickname) {
      setNicknameStatus('현재 사용 중인 닉네임입니다.');
      return;
    }

    try {
      const response = await axios.get(
        `${API_SERVER_HOST}/api/check-nickname?nickname=${member.nickname}`
      );
      const isAvailable = response.data.isAvailable;
      setNicknameStatus(
        isAvailable
          ? '사용 가능한 닉네임입니다.'
          : '이미 사용 중인 닉네임입니다.'
      );
    } catch (err) {
      alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const fetchMemberInfo = async () => {
    try {
      const memberInfo = getCookie('member');
      console.log('Step 1: Raw member info from cookie:', memberInfo);

      if (!memberInfo) {
        alert('로그인이 필요합니다.');
        return;
      }

      const parsedMemberInfo = JSON.parse(memberInfo);
      const email = parsedMemberInfo.email;

      console.log('Step 2: Extracted email:', email);

      if (!email) {
        alert('유효한 로그인 정보가 없습니다.');
        return;
      }

      // 서버로 이메일 요청
      const response = await axios.get(`${API_SERVER_HOST}/api/member/info`, {
        params: { email }, // 쿼리 파라미터로 이메일 전달
      });

      console.log('Step 3: API Response:', response.data);

      const data = response.data;

      // null 값에 대한 기본값 설정
      setMember({
        email: data.email || '',
        nickname: data.nickname || '',
        username: data.username || '홍길동',
        phonenumber: data.phonenumber || '0000',
        birthDate: data.birthDate || new Date().toISOString().split('T')[0], // 오늘 날짜
        adress: data.adress || '0000',
        gender: data.gender || 'NULL', // '안알랴쥼' 대신 'NULL' 사용
        newPassword: '',
        confirmPassword: '',
      });
      setOriginalNickname(data.nickname || '');
    } catch (error) {
      console.error(
        'Error during fetchMemberInfo:',
        error.response?.data || error.message
      );
      alert('회원 정보를 가져오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  useEffect(() => {
    // 컴포넌트 로드 시 passwordConfirmed 값을 삭제
    localStorage.removeItem('passwordConfirmed');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (member.newPassword !== member.confirmPassword) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const token = getCookie('member'); // JWT 토큰 가져오기
      const encodedToken = encodeURIComponent(token);

      console.log('Submit Step 1: Token from cookie:', token);

      // 초기 상태와 비교하여 변경된 필드만 추출
      const updatedFields = {};
      for (const key in member) {
        if (key === 'newPassword' || key === 'confirmPassword') continue; // 비밀번호 필드는 따로 처리
        if (member[key] && member[key] !== '') {
          updatedFields[key] = member[key];
        }
      }
      if (member.newPassword) {
        updatedFields.password = member.newPassword; // 비밀번호 변경 시만 추가
      }

      console.log('Submit Step 2: Payload with updated fields:', updatedFields);

      const response = await axios.put(
        `${API_SERVER_HOST}/api/member/modify`,
        updatedFields,
        {
          headers: { Authorization: `Bearer ${encodedToken}` },
        }
      );

      console.log('Submit Step 3: Response from server:', response.data);

      if (response.data.result === 'modified') {
        alert('회원 정보가 수정되었습니다.');
        navigate(location.state?.from || '/'); // 이전 페이지로 이동, 없으면 메인 페이지로 이동
      } else {
        alert('회원 정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error(
        'Error during handleSubmit:',
        error.response?.data || error.message
      );
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = getCookie('member');
      const response = await axios.delete(
        `${API_SERVER_HOST}/api/member/delete`,
        {
          headers: { 
            Authorization: `Bearer ${token}` },
          data: { email: member.email },
        }
      );

      console.log('Account deletion response:', response.data);

      if (response.status === 200) {
        alert('계정이 성공적으로 삭제되었습니다.');
        window.location.href = '/'; // 삭제 후 메인 페이지로 리다이렉트
      }
    } catch (error) {
      console.error(
        'Error during account deletion:',
        error.response?.data || error.message
      );
      alert('계정 삭제 중 오류가 발생했습니다.');
    }
  };

  // return (
  //   <div className="min-h-screen">
  //     <div className="container mx-auto py-8">
  //       <div className="w-full max-w-2xl mx-auto py-8">
  //         <p className="text-left text-gray-500 text-sm mb-6">
  //           <span className="text-red-500">*</span> 필수 입력사항
  //         </p>

  //         <div className="space-y-6">
  //           <div className="flex items-center">
  //             <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
  //               이메일<span className="text-red-500">*</span>
  //             </label>
  //             <input
  //               type="email"
  //               value={member.email}
  //               readOnly
  //               className="w-3/4 border border-gray-300 p-3 bg-gray-100 text-gray-500 cursor-not-allowed rounded-none"
  //             />
  //           </div>
  //           <div className="flex items-center">
  //             <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
  //               이름
  //             </label>
  //             <input
  //               type="username"
  //               name="username"
  //               value={member.username}
  //               onChange={handleInputChange}
  //               className="w-3/4 border border-gray-300 p-3 rounded-none"
  //             />
  //           </div>

  //           <div className="flex items-center">
  //             <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
  //               새 비밀번호
  //             </label>
  //             <input
  //               type="password"
  //               name="newPassword"
  //               value={member.newPassword}
  //               onChange={handleInputChange}
  //               className="w-3/4 border border-gray-300 p-3 rounded-none"
  //               autoComplete="new-password"
  //             />
  //           </div>

  //           <div className="flex items-center">
  //             <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
  //               새 비밀번호 확인
  //             </label>
  //             <input
  //               type="password"
  //               name="confirmPassword"
  //               value={member.confirmPassword}
  //               onChange={handleInputChange}
  //               className="w-3/4 border border-gray-300 p-3 rounded-none"
  //             />
  //           </div>

  //           <div className="flex items-center">
  //             <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
  //               닉네임
  //             </label>
  //             <div className="flex flex-col w-3/4">
  //               <div className="flex items-center space-x-2">
  //                 <input
  //                   type="text"
  //                   name="nickname"
  //                   value={member.nickname}
  //                   onChange={handleInputChange}
  //                   className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-vibrantOlive"
  //                   placeholder="닉네임을 입력하세요"
  //                 />
  //                 <button
  //                   type="button"
  //                   onClick={handleCheckNickname}
  //                   className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
  //                 >
  //                   중복 확인
  //                 </button>
  //               </div>
  //               {nicknameStatus && (
  //                 <p
  //                   className={`text-sm mt-2 ${
  //                     nicknameStatus.includes('사용 가능')
  //                       ? 'text-green-500'
  //                       : 'text-red-500'
  //                   }`}
  //                 >
  //                   {nicknameStatus}
  //                 </p>
  //               )}
  //             </div>
  //           </div>

  //           <div className="flex items-center">
  //             <label className="w-1/4 font-semibold">성별</label>
  //             <div className="flex items-center space-x-4">
  //               <label className="flex items-center space-x-2">
  //                 <input
  //                   type="radio"
  //                   name="gender"
  //                   value="MALE"
  //                   checked={member.gender === 'MALE'}
  //                   onChange={handleInputChange}
  //                 />
  //                 <span>남자</span>
  //               </label>
  //               <label className="flex items-center space-x-2">
  //                 <input
  //                   type="radio"
  //                   name="gender"
  //                   value="FEMALE"
  //                   checked={member.gender === 'FEMALE'}
  //                   onChange={handleInputChange}
  //                 />
  //                 <span>여자</span>
  //               </label>
  //               <label className="flex items-center space-x-2">
  //                 <input
  //                   type="radio"
  //                   name="gender"
  //                   value="NULL"
  //                   checked={member.gender === 'NULL'}
  //                   onChange={handleInputChange}
  //                 />
  //                 <span>안알랴쥼</span>
  //               </label>
  //             </div>
  //           </div>

  //           <div className="flex items-center">
  //             <label className="w-1/4 font-semibold">생년월일</label>
  //             <input
  //               type="date"
  //               name="birthDate"
  //               value={member.birthDate}
  //               onChange={handleInputChange}
  //               className="w-3/4 border border-gray-300 p-3 rounded-none"
  //             />
  //           </div>

  //           <div className="flex items-center">
  //             <label className="w-1/4 font-semibold">휴대폰</label>
  //             <input
  //               type="tel"
  //               name="phonenumber"
  //               value={member.phonenumber}
  //               onChange={handleInputChange}
  //               className="w-3/4 border rounded-md p-2"
  //             />
  //           </div>

  //           <div className="flex items-center">
  //             <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
  //               주소
  //             </label>
  //             <input
  //               type="text"
  //               name="adress"
  //               value={member.adress}
  //               onChange={handleInputChange}
  //               className="w-3/4 border border-gray-300 p-3 rounded-none"
  //             />
  //           </div>
  //         </div>

  //         <div className="mt-16 flex justify-center space-x-6">
  //           <button
  //             type="button"
  //             onClick={handleSubmit}
  //             className="w-40 px-4 py-3 bg-black text-white font-bold border border-black cursor-pointer rounded-none"
  //           >
  //             회원정보수정
  //           </button>
  //           <button
  //             type="button"
  //             onClick={() => setShowDeleteConfirm(true)}
  //             className="w-40 px-4 py-3 bg-red-500 text-white font-bold border border-red-500 cursor-pointer rounded-none"
  //           >
  //             계정삭제
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //     {showDeleteConfirm && (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  //         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
  //           <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
  //           <div className="flex justify-center space-x-4">
  //             <button
  //               onClick={handleDeleteAccount}
  //               className="px-6 py-3 bg-red-500 text-white rounded-lg"
  //             >
  //               삭제
  //             </button>
  //             <button
  //               onClick={() => setShowDeleteConfirm(false)}
  //               className="px-6 py-3 bg-gray-300 text-black rounded-lg"
  //             >
  //               취소
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <div className="w-full max-w-2xl mx-auto py-8">
          <p className="text-left text-gray-500 text-sm mb-6">
            <span className="text-red-500">*</span> 필수 입력사항
          </p>
  
          <div className="space-y-6">
            <div className="flex items-center">
              <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
                이메일<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={member.email}
                readOnly
                className="w-3/4 border border-gray-300 p-3 bg-gray-100 text-gray-500 cursor-not-allowed rounded-none"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
                이름
              </label>
              <input
                type="username"
                name="username"
                value={member.username}
                onChange={handleInputChange}
                className="w-3/4 border border-gray-300 p-3 rounded-none"
              />
            </div>
  
            <div className="flex items-center">
              <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
                새 비밀번호
              </label>
              <input
                type="password"
                name="newPassword"
                value={member.newPassword}
                onChange={handleInputChange}
                className="w-3/4 border border-gray-300 p-3 rounded-none"
                autoComplete="new-password"
              />
            </div>
  
            <div className="flex items-center">
              <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
                새 비밀번호 확인
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={member.confirmPassword}
                onChange={handleInputChange}
                className="w-3/4 border border-gray-300 p-3 rounded-none"
              />
            </div>
  
            <div className="flex items-center">
              <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
                닉네임
              </label>
              <div className="flex flex-col w-3/4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="nickname"
                    value={member.nickname}
                    onChange={handleInputChange}
                    className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-lightOlive"
                    placeholder="닉네임을 입력하세요"
                  />
                  <button
                    type="button"
                    onClick={handleCheckNickname}
                    className="px-4 py-2 bg-luxury-lightOlive text-white font-bold rounded-lg shadow-md hover:bg-luxury-darkerOlive focus:outline-none"
                  >
                    중복 확인
                  </button>
                </div>
                {nicknameStatus && (
                  <p
                    className={`text-sm mt-2 ${
                      nicknameStatus.includes('사용 가능')
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {nicknameStatus}
                  </p>
                )}
              </div>
            </div>
  
            <div className="flex items-center">
              <label className="w-1/4 font-semibold">성별</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={member.gender === 'MALE'}
                    onChange={handleInputChange}
                  />
                  <span>남자</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={member.gender === 'FEMALE'}
                    onChange={handleInputChange}
                  />
                  <span>여자</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="NULL"
                    checked={member.gender === 'NULL'}
                    onChange={handleInputChange}
                  />
                  <span>비공개</span>
                </label>
              </div>
            </div>
  
            <div className="flex items-center">
              <label className="w-1/4 font-semibold">생년월일</label>
              <input
                type="date"
                name="birthDate"
                value={member.birthDate}
                onChange={handleInputChange}
                className="w-3/4 border border-gray-300 p-3 rounded-none"
              />
            </div>
  
            <div className="flex items-center">
              <label className="w-1/4 font-semibold">휴대폰</label>
              <input
                type="tel"
                name="phonenumber"
                value={member.phonenumber}
                onChange={handleInputChange}
                className="w-3/4 border rounded-md p-2"
              />
            </div>
  
            <div className="flex items-center">
              <label className="w-1/4 text-sm font-semibold text-gray-700 text-left pr-4">
                주소
              </label>
              <input
                type="text"
                name="adress"
                value={member.adress}
                onChange={handleInputChange}
                className="w-3/4 border border-gray-300 p-3 rounded-none"
              />
            </div>
          </div>
  
          <div className="mt-16 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-luxury-lightOlive text-white font-bold rounded-lg shadow-md hover:bg-luxury-darkerOlive focus:outline-none"
            >
              회원정보수정
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
            >
              계정삭제
            </button>
          </div>

        </div>
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-3 bg-red-500 text-white rounded-lg"
              >
                삭제
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-3 bg-gray-300 text-black rounded-lg"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default UserModifyComponent;
