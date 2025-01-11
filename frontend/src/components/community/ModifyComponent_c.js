// import { useEffect, useRef, useState } from "react";
// import { getCommunity, putCommunity, deleteCommunity } from "../../api/communityApi";
// import FetchingModal from "../common/FetchingModal";
// import ResultModal from "../common/ResultModal";
// import useCustomMove from "../../hooks/useCustomMove"
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { API_SERVER_HOST } from "../../api/todoApi";

// const initState = {
//   tno: 0,
//   communityTitle: "",
//   communityContent: "",
//   nickname: "",
//   email: "",
//   category: "",
//   registerDate: "",
//   viewCount: 0,
//   likeCount: 0,
//   uploadFileNames: [], // 이미지 목록
//   ingredients: "", // 재료 추가
// };

// const host = API_SERVER_HOST;

// const ModifyComponent_c = ({ tno }) => {
//   const [community, setCommunity] = useState(initState);
//   const [previewUrls, setPreviewUrls] = useState([]); // 미리보기 이미지
//   const [result, setResult] = useState(null);
//   const { moveToRead, moveToList } = useCustomMove();
//   const [fetching, setFetching] = useState(false);
//   const [userEmail, setUserEmail] = useState(""); // 이메일 상태 추가
//   const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!memberEmail) {
//       alert("로그인이 필요합니다.");
//       navigate("/user/login");
//     }
//   }, [memberEmail, navigate]);
  

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("user"));
//     if (loggedInUser && loggedInUser.email) {
//       setUserEmail(loggedInUser.email); // 이메일 상태에 저장
//     }
  
//     setFetching(true);
//     getCommunity(tno).then((data) => {
//       setCommunity(data);
//       setFetching(false);
  
//       // 기존 이미지 URL 처리
//       const existingImages = data.uploadFileNames.map((fileName) =>
//         `${host}/api/community/view/${fileName}` // 기존 이미지 URL 설정
//       );
  
//       // 기존 이미지가 있을 경우에만 미리보기 상태 업데이트
//       if (existingImages.length > 0) {
//         setPreviewUrls(existingImages); // 기존 이미지들을 미리보기로 설정
//       }
//     });
//   }, [tno]);
  
//   const renderImages = () => (
//     <div className="flex justify-center">
//       <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//         <div className="w-4/5 justify-center flex flex-wrap items-start">
//           {/* 기존 이미지는 previewUrls로만 렌더링 */}
//           {previewUrls.length > 0 && previewUrls.map((url, i) => (
//             <div className="flex justify-center flex-col w-1/3" key={i}>
//               <img
//                 src={url}
//                 className="w-full h-auto rounded-lg mb-2"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // ---------------------------------아래부터 레시피 수정------------------------------------

//   const handleClickModify = () => {
//     const formData = new FormData();

//     formData.append("communityTitle", community.communityTitle);
//     formData.append("communityContent", community.communityContent);
//     formData.append("email", userEmail); // 이메일을 사용자 정보로 설정
//     formData.append("category", community.category);
//     formData.append("registerDate", community.registerDate);
//     formData.append("ingredients", community.ingredients); // 재료 추가

//      // 기존 이미지가 있을 경우 uploadFileNames 배열에 추가
//   if (community.uploadFileNames.length > 0) {
//     community.uploadFileNames.forEach((fileName) => {
//       formData.append("uploadFileNames[]", fileName); // 기존 이미지 파일명 추가
//     });
//   }

//     setFetching(true);
//     // put 요청을 통해 수정
//     fetch(`${host}/api/community/${tno}`, {
//       method: "PUT", // 수정 요청
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then(() => {
//         setResult("Modified");
//         setFetching(false);
//       });
//   };

//   const handleChangeCommunity = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCommunity({
//       ...community,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const closeModal = () => {
//     if (result === "Modified") {
//       moveToRead(tno);
//     } else if (result === "Deleted") {
//       moveToList({ page: 1 });
//     }
//     setResult(null);
//   };

//   const handleClickDelete = () => {
//     setFetching(true);
//     fetch(`${host}/api/community/${tno}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then(() => {
//         setResult("Deleted");
//         setFetching(false);
//       });
//   };

//   return (
//     <div className="flex justify-center p-10">
//       {fetching && <FetchingModal />}
//       {result && (
//         <ResultModal
//           title={`${result}`}
//           content={"정상적으로 처리되었습니다."}
//           callbackFn={closeModal}
//         />
//       )}
//       <div className="w-2/3 bg-white rounded-lg">
//         <h1 className="text-3xl font-semibold text-center mb-8">레시피 수정</h1>
//         <form>
//           {/* 레시피 이름 */}
//           <div className="flex justify-center mb-8">
//             <div className="relative flex w-full items-stretch">
//               <div className="w-1/5 font-bold p-6">레시피 이름</div>
//               <input
//                 type="text"
//                 name="communityTitle"
//                 className="w-4/5 p-6 border border-gray-300 rounded-lg shadow-md"
//                 value={community.communityTitle}
//                 onChange={handleChangeCommunity}
//                 placeholder="제목을 입력하세요"
//                 required
//               />
//             </div>
//           </div>

//           {/* 카테고리 */}
//           <div className="flex justify-center mb-8">
//             <div className="relative flex w-full items-stretch">
//               <div className="w-1/5 font-bold p-6">카테고리</div>
//               <select
//                 name="category"
//                 className="w-4/5 p-6 border border-gray-300 rounded-lg shadow-md"
//                 value={community.category}
//                 onChange={handleChangeCommunity}
//                 required
//               >
//                 <option value="">카테고리 선택</option>
//                 <option value="한식">한식</option>
//                 <option value="일식">일식</option>
//                 <option value="중식">중식</option>
//                 <option value="양식">양식</option>
//                 <option value="기타">기타</option>
//               </select>
//             </div>
//           </div>

//           {/* 재료 정보 */}
//           <div className="flex justify-center mb-8">
//             <div className="relative flex w-full items-stretch">
//               <div className="w-1/5 text-right font-bold p-6">레시피 재료</div>
//               <textarea
//                 name="ingredients"
//                 rows="4"
//                 className="w-4/5 p-6 border border-gray-300 rounded-lg shadow-md resize-y"
//                 value={community.ingredients}
//                 onChange={handleChangeCommunity}
//                 placeholder="재료 정보를 입력하세요"
//                 required
//               />
//             </div>
//           </div>

//           {/* 레시피 내용 */}
//           <div className="flex justify-center mb-8">
//             <div className="relative flex w-full items-stretch">
//               <div className="w-1/5 font-bold p-6">레시피 내용</div>
//               <textarea
//                 name="communityContent"
//                 rows="4"
//                 className="w-4/5 p-6 border border-gray-300 rounded-lg shadow-md resize-y"
//                 value={community.communityContent}
//                 onChange={handleChangeCommunity}
//                 placeholder="레시피 내용을 입력하세요"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-8">
//             <div className="relative flex w-full items-stretch">
//               <div className="w-1/5 font-bold p-6">레시피 이미지</div>
//               {renderImages()}
//             </div>
//           </div>

//           {/* 버튼 */}
//           <div className="flex justify-end p-4">
//             <button
//               type="button"
//               className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
//               onClick={handleClickDelete}
//             >
//               삭제
//             </button>
//             <button
//               type="button"
//               className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
//               onClick={handleClickModify}
//             >
//               수정
//             </button>
//             <button
//               type="button"
//               className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
//               onClick={moveToList}
//             >
//               리스트
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModifyComponent_c;


import { useEffect, useRef, useState } from "react";
import { getCommunity, putCommunity, deleteCommunity } from "../../api/communityApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_SERVER_HOST } from "../../api/todoApi";

const initState = {
  tno: 0,
  communityTitle: "",
  communityContent: "",
  nickname: "",
  email: "",
  category: "",
  registerDate: "",
  viewCount: 0,
  likeCount: 0,
  uploadFileNames: [], // 이미지 목록
  ingredients: "", // 재료 추가
};

const host = API_SERVER_HOST;

const ModifyComponent_c = ({ tno }) => {
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가
  const [community, setCommunity] = useState(initState);
  const [previewUrls, setPreviewUrls] = useState([]); // 미리보기 이미지
  const [result, setResult] = useState(null);
  const { moveToRead, moveToList } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // 이메일 상태 추가
  const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
  const navigate = useNavigate();

  useEffect(() => {
    if (!memberEmail) {
      alert("로그인이 필요합니다.");
      navigate("/user/login");
    }
  }, [memberEmail, navigate]);
  

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.email) {
      setUserEmail(loggedInUser.email); // 이메일 상태에 저장
    }
  
    setFetching(true);
    getCommunity(tno).then((data) => {
      setCommunity(data);
      setFetching(false);
  
      // 기존 이미지 URL 처리
      const existingImages = data.uploadFileNames.map((fileName) =>
        `${host}/api/community/view/${fileName}` // 기존 이미지 URL 설정
      );
  
      // 기존 이미지가 있을 경우에만 미리보기 상태 업데이트
      if (existingImages.length > 0) {
        setPreviewUrls(existingImages); // 기존 이미지들을 미리보기로 설정
      }
    });
  }, [tno]);
  
  const renderImages = () => (
    <div className="flex justify-center">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-4/5 justify-center flex flex-wrap items-start">
          {/* 기존 이미지는 previewUrls로만 렌더링 */}
          {previewUrls.length > 0 && previewUrls.map((url, i) => (
            <div className="flex justify-center flex-col w-2/3 ml-20" key={i}>
              <img
                src={url}
                className="w-full h-auto rounded-lg mb-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ---------------------------------아래부터 레시피 수정------------------------------------

  const handleClickModify = () => {
    const formData = new FormData();

    formData.append("communityTitle", community.communityTitle);
    formData.append("communityContent", community.communityContent);
    formData.append("email", userEmail); // 이메일을 사용자 정보로 설정
    formData.append("category", community.category);
    formData.append("registerDate", community.registerDate);
    formData.append("ingredients", community.ingredients); // 재료 추가

     // 기존 이미지가 있을 경우 uploadFileNames 배열에 추가
  if (community.uploadFileNames.length > 0) {
    community.uploadFileNames.forEach((fileName) => {
      formData.append("uploadFileNames[]", fileName); // 기존 이미지 파일명 추가
    });
  }

    setFetching(true);
    // put 요청을 통해 수정
    fetch(`${host}/api/community/${tno}`, {
      method: "PUT", // 수정 요청
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        setResult("Modified");
        setFetching(false);
      });
  };

  const handleChangeCommunity = (e) => {
    const { name, value, type, checked } = e.target;
    setCommunity({
      ...community,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(tno);
    } else if (result === "Deleted") {
      moveToList({ page: 1 });
    }
    setResult(null);
  };

  const handleClickDelete = () => {
    setFetching(true);
    fetch(`${host}/api/community/${tno}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setResult("Deleted");
        setFetching(false);
      });
  };

  return (
    <div className="flex justify-center p-10">
      {fetching && <FetchingModal />}
      {result && (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        />
      )}
    <div className="w-full bg-white rounded-lg border rounded">
  <h1 className="text-3xl font-semibold text-center mt-20 mb-8">레시피 수정</h1>
  <form>
    {/* 레시피 이름 */}
    <div className="flex justify-start mb-8">
      <div className="w-1/5 text-center font-bold p-6">레시피 이름</div>
      <input
        type="text"
        name="communityTitle"
        className="w-3/5 p-6 border border-gray-300 rounded-lg shadow-md"
        value={community.communityTitle}
        onChange={handleChangeCommunity}
        placeholder="제목을 입력하세요"
        required
      />
    </div>

    {/* 카테고리 */}
    <div className="flex justify-start mb-8">
      <div className="w-1/5 text-center font-bold p-6">카테고리</div>
      <select
        name="category"
        className="w-3/5 p-6 border border-gray-300 rounded-lg shadow-md"
        value={community.category}
        onChange={handleChangeCommunity}
        required
      >
        <option value="">카테고리 선택</option>
        <option value="한식">한식</option>
        <option value="일식">일식</option>
        <option value="중식">중식</option>
        <option value="양식">양식</option>
        <option value="기타">기타</option>
      </select>
    </div>

    {/* 재료 정보 */}
    <div className="flex justify-start mb-8">
      <div className="w-1/5 text-center font-bold p-6">레시피 재료</div>
      <textarea
        name="ingredients"
        rows="4"
        className="w-3/5 p-6 border border-gray-300 rounded-lg shadow-md resize-y"
        value={community.ingredients}
        onChange={handleChangeCommunity}
        placeholder="재료 정보를 입력하세요"
        required
      />
    </div>

    {/* 레시피 내용 */}
    <div className="flex justify-start mb-8">
      <div className="w-1/5 text-center font-bold p-6">레시피 내용</div>
      <textarea
        name="communityContent"
        rows="4"
        className="w-3/5 p-6 border border-gray-300 rounded-lg shadow-md resize-y"
        value={community.communityContent}
        onChange={handleChangeCommunity}
        placeholder="레시피 내용을 입력하세요"
        required
      />
    </div>

    <div className="flex justify-start mb-8">
      <div className="w-1/5 text-center font-bold p-6">레시피 이미지</div>
        <div className="w-3/5">
          {renderImages()}
        </div>
      </div>


    {/* 버튼 */}
   <div className="flex justify-end items-start">
      <div className="flex space-x-3 p-8">
        <button
          type="button"
          className="rounded-lg px-4 py-2 font-bold text-black bg-gray-300 hover:bg-gray-400"
          onClick={handleClickModify}
        >
          수정
        </button>
        <button
              onClick={() => moveToList({ page: 1 })}
              className="bg-luxury-lightOlive font-bold text-black px-4 py-2 rounded-lg hover:bg-luxury-darkerOlive"
            > 
              리스트
            </button>
          <button
          type="button"
          className="rounded-lg px-4 py-2 font-bold text-black bg-red-400 hover:bg-red-500"
          onClick={handleClickDelete}
        >
          삭제
        </button>
        </div>
      </div>
    </form>
  </div>
</div>
  );
};

export default ModifyComponent_c;