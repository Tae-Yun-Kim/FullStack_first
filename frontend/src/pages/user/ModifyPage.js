
// import UserModifyComponent from "../../components/user/UserModifyComponent";
// import BasicLayout from "../../layouts/BasicLayout";

// const ModfyPage = () => {
//   return (
//     <BasicLayout>
//       <div className=" text-3xl">Member Modify Page</div>

//       <div className="bg-white w-full mt-4 p-2">
//         <UserModifyComponent></UserModifyComponent>
//       </div>
//     </BasicLayout>
//   );
// };

// export default ModfyPage;



//진수님 프론트
import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import UserModifyComponent from '../../components/user/UserModifyComponent';

const ModfyPage = () => {
  const [userData, setUserData] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    adress: '',
    phonenumber: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    agreement: {
      personalInfo: false,
      marketingSms: false,
      marketingEmail: false,
    },
  });

  //1230일단주석
  // useEffect(() => {
  //   // 회원 개인 정보를 불러오는 API 호출 (예시)
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/api/member/info'); // 실제 API 경로로 변경
  //       const data = await response.json();
  //       setUserData({
  //         nickname: data.nickname,
  //         email: data.email,
  //         adress: data.adress,
  //         phonenumber: data.phonenumber,
  //         gender: data.gender,
  //         birthYear: data.birthYear,
  //         birthMonth: data.birthMonth,
  //         birthDay: data.birthDay,
  //         agreement: {
  //           personalInfo: data.agreement.personalInfo,
  //           marketingSms: data.agreement.marketingSms,
  //           marketingEmail: data.agreement.marketingEmail,
  //         },
  //       });
  //     } catch (error) {
  //       console.error('Failed to fetch user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <BasicLayout>
      <div className="min-h-screen">
        <div className="text-2xl font-bold py-8 text-center border-b border-gray-300">
          개인 정보 수정
        </div>
        <div className="container mx-auto py-8">
          <UserModifyComponent userData={userData} />
        </div>
      </div>
    </BasicLayout>
  );
};

export default ModfyPage;
