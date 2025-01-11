// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getQnA, putQnA, deleteQnA } from "../../api/qnaApi";
// import ResultModal from "../common/ResultModal";
// import useCustomMove from "../../hooks/useCustomMove";

// const initState = {
//   qno: 0,
//   qnaTitle: "",
//   qnaContent: "",
//   email: "",
//   files: [], // 빈 배열로 초기화
// };

// const ModifyComponent_q = ({ qno }) => {
//   const [qna, setQna] = useState({ ...initState });
//   const [newFiles, setNewFiles] = useState([]);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
// const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
// //   const currentUserEmail = useSelector((state) => state.auth.email);
//   const navigate = useNavigate();
//   const { moveToList } = useCustomMove();

//   // 로그인하지 않은 경우
//   useEffect(() => {
//     if (!memberEmail) {
//       alert("로그인이 필요합니다.");
//       navigate("/user/login");
//     } else {
//       setLoading(true);
//       setError(null);
  
//       getQnA(qno)
//         .then((data) => setQna({ ...initState, ...data }))
//         .catch(() => setError("QnA 데이터를 불러오는데 실패했습니다."))
//         .finally(() => setLoading(false));
//     }
//   }, [qno, memberEmail, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setQna((prevQna) => ({
//       ...prevQna,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setNewFiles([...e.target.files]);
//   };

//   const handleFileDelete = (fileName) => {
//     setQna((prevQna) => ({
//       ...prevQna,
//       files: prevQna.files.filter((file) => file !== fileName),
//     }));
//   };

//   const handleClickModify = async () => {
//     if (memberEmail !== qna.email) {
//       alert("수정 권한이 없습니다.");
//       return;
//     }

//      // JSON 데이터로 qnaData 생성
//   const qnaData = {
//     qno: qna.qno,
//     qnaTitle: qna.qnaTitle,
//     qnaContent: qna.qnaContent,
//     isSecret: qna.isSecret,
//     category: qna.category || "", // 카테고리 추가 필요 시
//   };


// try {
//     console.log("Sending QnA data:", qnaData);
//     await putQnA(qno, qnaData); // JSON으로 전송
//     setResult("Modified");
//   } catch (error) {
//     console.error("Error during QnA modify:", error);
//     setResult("Failed");
//   }
//   };

//   const handleClickDelete = async () => {
//     if (memberEmail !== qna.email) {
//       alert("삭제 권한이 없습니다.");
//       return;
//     }

//     if (window.confirm("정말로 삭제하시겠습니까?")) {
//       try {
//         await deleteQnA(qno);
//         setResult("Deleted");
//       } catch {
//         setResult("Failed");
//       }
//     }
//   };

//   const closeModal = () => {
//     moveToList();
//   };

//   if (!memberEmail) return null;
//   if (loading) return <div>로딩 중...</div>;
//   if (error) return <div>{error}</div>;

//   const isOwner = memberEmail === qna.email;

//   return (
//     <div className="border-2 border-sky-200 mt-10 m-2 p-4">
//       {result && (
//         <ResultModal
//           title="처리결과"
//           content={
//             result === "Modified"
//               ? "수정 성공!"
//               : result === "Deleted"
//               ? "삭제 성공!"
//               : "처리 실패"
//           }
//           callbackFn={closeModal}
//         />
//       )}

//       <h1 className="text-3xl font-extrabold mb-6 text-center">QnA 수정</h1>

//       <div className="flex justify-center mb-4">
//         <div className="w-1/5 p-2 text-right font-bold">작성자</div>
//         <div className="w-4/5 p-2 rounded border border-solid border-neutral-300 shadow-md bg-gray-100">
//           {qna.email || "알 수 없음"}
//         </div>
//       </div>

//       <div className="flex justify-center mb-4">
//         <div className="w-1/5 p-2 text-right font-bold">제목</div>
//         <input
//           className="w-4/5 p-2 rounded border border-solid border-neutral-300 shadow-md"
//           name="qnaTitle"
//           type="text"
//           value={qna.qnaTitle}
//           onChange={handleChange}
//           placeholder="QnA 제목"
//           required
//           disabled={!isOwner}
//         />
//       </div>

//       <div className="flex justify-center mb-4">
//         <div className="w-1/5 p-2 text-right font-bold">내용</div>
//         <textarea
//           className="w-4/5 p-2 rounded border border-solid border-neutral-300 shadow-md"
//           name="qnaContent"
//           value={qna.qnaContent}
//           onChange={handleChange}
//           placeholder="QnA 내용"
//           required
//           rows="6"
//           disabled={!isOwner}
//         />
//       </div>

//       <div className="flex justify-center mb-4">
//         <label className="w-4/5 p-2">
//           <input
//             type="checkbox"
//             name="isSecret"
//             checked={qna.isSecret}
//             onChange={handleChange}
//             className="form-checkbox h-5 w-5 text-blue-600"
//             disabled={!isOwner}
//           />
//           <span className="ml-2 text-gray-700">비밀글로 설정</span>
//         </label>
//       </div>

//       <div className="flex justify-center mb-4">
//         <div className="w-1/5 p-2 text-right font-bold">첨부파일</div>
//         <div className="w-4/5 p-2 rounded border border-solid border-neutral-300 shadow-md">
//           <ul>
//             {(qna.files || []).map((file, index) => (
//               <li key={index} className="flex justify-between">
//                 <a
//                   href={`/uploads/${file}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   {file}
//                 </a>
//                 {isOwner && (
//                   <button
//                     type="button"
//                     className="text-red-500 underline"
//                     onClick={() => handleFileDelete(file)}
//                   >
//                     삭제
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//           {isOwner && (
//             <input
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               className="mt-2"
//             />
//           )}
//         </div>
//       </div>

//       {isOwner && (
//         <div className="flex justify-end p-4">
//           <button
//             type="button"
//             className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500 hover:bg-blue-600"
//             onClick={handleClickModify}
//           >
//             수정
//           </button>
//           <button
//             type="button"
//             className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500 hover:bg-red-600"
//             onClick={handleClickDelete}
//           >
//             삭제
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ModifyComponent_q;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQnA, putQnA, deleteQnA } from "../../api/qnaApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  qno: 0,
  qnaTitle: "",
  qnaContent: "",
  email: "",
  files: [], // 빈 배열로 초기화
};

const ModifyComponent_q = ({ qno }) => {
  const [qna, setQna] = useState({ ...initState });
  const [newFiles, setNewFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
//   const currentUserEmail = useSelector((state) => state.auth.email);
  const navigate = useNavigate();
  const { moveToList } = useCustomMove();

  // 로그인하지 않은 경우
  useEffect(() => {
    if (!memberEmail) {
      alert("로그인이 필요합니다.");
      navigate("/user/login");
    } else {
      setLoading(true);
      setError(null);
  
      getQnA(qno)
        .then((data) => setQna({ ...initState, ...data }))
        .catch(() => setError("QnA 데이터를 불러오는데 실패했습니다."))
        .finally(() => setLoading(false));
    }
  }, [qno, memberEmail, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQna((prevQna) => ({
      ...prevQna,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setNewFiles([...e.target.files]);
  };

  const handleFileDelete = (fileName) => {
    setQna((prevQna) => ({
      ...prevQna,
      files: prevQna.files.filter((file) => file !== fileName),
    }));
  };

  const handleClickModify = async () => {
    if (memberEmail !== qna.email) {
      alert("수정 권한이 없습니다.");
      return;
    }

     // JSON 데이터로 qnaData 생성
  const qnaData = {
    qno: qna.qno,
    qnaTitle: qna.qnaTitle,
    qnaContent: qna.qnaContent,
    isSecret: qna.isSecret,
    category: qna.category || "", // 카테고리 추가 필요 시
  };

  // FormData에 qnaData와 파일 추가
//   const formData = new FormData();
//   formData.append("qnaData", JSON.stringify(qnaData));
//   newFiles.forEach((file) => formData.append("files", file));

//     try {
//     console.log("FormData to send:", Array.from(formData.entries())); // 디버깅용
//     await putQnA(qno, formData); // 수정 API 호출
//     setResult("Modified");
//   } catch (error) {
//     console.error("Error during QnA modify:", error);
//     setResult("Failed");
//   }
try {
    console.log("Sending QnA data:", qnaData);
    await putQnA(qno, qnaData); // JSON으로 전송
    setResult("Modified");
  } catch (error) {
    console.error("Error during QnA modify:", error);
    setResult("Failed");
  }
  };

  const handleClickDelete = async () => {
    if (memberEmail !== qna.email) {
      alert("삭제 권한이 없습니다.");
      return;
    }

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteQnA(qno);
        setResult("Deleted");
      } catch {
        setResult("Failed");
      }
    }
  };

  const closeModal = () => {
    moveToList();
  };

  if (!memberEmail) return null;
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const isOwner = memberEmail === qna.email;

  return (
    <div className="mt-10 m-2 p-4">
  {result && (
    <ResultModal
      title="처리결과"
      content={
        result === "Modified"
          ? "수정 성공!"
          : result === "Deleted"
          ? "삭제 성공!"
          : "처리 실패"
      }
      callbackFn={closeModal}
    />
  )}

  <h1 className="text-3xl font-extrabold mb-6 text-center">QnA 수정</h1>
  <div className="border-t-2 border-gray-700 my-6"></div> {/* 구분선 추가 */}

  {/* 작성자 */}
  <div className="mb-6 border-b border-gray-200 pb-4 flex items-center">
    <div className="text-right font-bold w-1/5 ml-2">작성자</div> {/* 텍스트 왼쪽 이동 */}
    <div className="ml-4">{qna.email || "알 수 없음"}</div>
  </div>

  {/* 제목 */}
  <div className="mb-6 border-b border-gray-200 pb-4 flex items-center">
    <div className="text-right font-bold w-1/5 ml-2">제목</div> {/* 텍스트 왼쪽 이동 */}
    <input
      className="ml-4 w-4/5 outline-none bg-transparent"
      name="qnaTitle"
      type="text"
      value={qna.qnaTitle}
      onChange={handleChange}
      placeholder="QnA 제목"
      required
      disabled={!isOwner}
    />
  </div>

  {/* 내용 */}
  <div className="pb-4 flex items-center">
    <div className="text-right font-bold w-1/5 ml-2">내용</div> {/* 텍스트 왼쪽 이동 */}
    <textarea
      className="ml-4 w-4/5 outline-none bg-transparent"
      name="qnaContent"
      value={qna.qnaContent}
      onChange={handleChange}
      placeholder="QnA 내용"
      required
      rows="4"
      disabled={!isOwner}
    />
  </div>

  <div className="flex justify-center mb-6">
    <label className="w-4/5 p-2">
      <input
        type="checkbox"
        name="isSecret"
        checked={qna.isSecret}
        onChange={handleChange}
        className="form-checkbox h-5 w-5 text-blue-600"
        disabled={!isOwner}
      />
      <span className="ml-2 text-gray-700">비밀글로 설정</span>
    </label>
  </div>

  <div className="border-t-2 border-gray-700 my-6"></div> {/* 구분선 추가 */}

  {isOwner && (
  <div className="flex justify-end p-4">
  {/* 수정 버튼 */}
  <button
    type="button"
    className="px-6 py-2 mr-4 text-black bg-luxury-lightMustard hover:bg-luxury-richMustard rounded shadow-md"
    onClick={handleClickModify}
  >
    수정
  </button>

  {/* 삭제 버튼 */}
  <button
    type="button"
    className="px-6 py-2 text-black bg-luxury-richBurgundy hover:bg-luxury-darkBurgundy rounded shadow-md"
    onClick={handleClickDelete}
  >
    삭제
  </button>
</div>

 
  )}
</div>

  
  );
  
};

export default ModifyComponent_q;
