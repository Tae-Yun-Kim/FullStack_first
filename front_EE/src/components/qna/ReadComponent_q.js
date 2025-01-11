// import { useEffect, useState } from "react";
// import { getQnA } from "../../api/qnaApi";
// import { useNavigate } from "react-router-dom";
// import FetchingModal from "../common/FetchingModal";
// import { useSelector } from "react-redux"; // Redux 사용 시
// import CommentComponent_q from "./CommentComponent_q";
// import useAuth from "../../hooks/useAuth";

// const initState = {
//   qno: 0,
//   qnaTitle: "",
//   qnaContent: "",
//   email: "",
//   uploadFileNames: [], // 서버에서 반환된 파일 이름 리스트
// };

// const ReadComponent_q = ({ qno }) => {
//   const [qna, setQna] = useState(initState);
//   const [fetching, setFetching] = useState(false);
//   const navigate = useNavigate();
//   const user = useAuth() || {};
//   const memberEmail = user.email || [];
//   const memberRole = user.roleNames || [];

//   const moveToList = () => {
//     navigate("/qna/list");
//   };

//   const handleModifyClick = () => {
//     if (!memberEmail) {
//       const confirmLogin = window.confirm(
//         "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
//       );
//       if (confirmLogin) {
//         navigate("/user/login");
//       }
//       return;
//     }
//     navigate(`/qna/modify/${qno}`);
//   };

//   useEffect(() => {
//     setFetching(true);
//     getQnA(qno)
//       .then((data) => {
//         if (data.isSecret && data.email !== memberEmail && memberRole !== "ADMIN") {
//         console.log("작성한 회원이 아닙니다. 접근이 차단되었습니다."); // 알림창 대신 콘솔 경고
//           navigate("/qna/list"); // 목록으로 이동
//           return;
//         }
//         setQna(data); // API에서 받은 데이터를 상태로 설정
//       })
//       .catch((error) => {
//         console.error("Error fetching QnA", error);
//         alert("QnA 데이터를 불러오는데 실패 했습니다.")
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   }, [qno, memberEmail, memberRole, navigate])

//   return (
//     <div className="border-2 border-sky-200 mt-10 m-2 p-4">
//       {fetching ? (
//         <FetchingModal />
//       ) : (
//         <>
//           <div className="flex justify-center mt-10">
//             <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//               <div className="w-1/5 p-6 text-right font-bold">QNO</div>
//               <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
//                 {qna.qno}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//               <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
//               <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
//                 {qna.qnaTitle}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//               <div className="w-1/5 p-6 text-right font-bold">CONTENT</div>
//               <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
//                 {qna.qnaContent}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//               <div className="w-1/5 p-6 text-right font-bold">작성자</div>
//               <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
//                 {qna.email || "알 수 없음"}
//               </div>
//             </div>
//           </div>

//           {/* 첨부파일 리스트 */}
//           {qna.uploadFileNames && qna.uploadFileNames.length > 0 && (
//             <div className="flex justify-center">
//               <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                 <div className="w-1/5 p-6 text-right font-bold">첨부파일</div>
//                 <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
//                   <ul>
//                     {qna.uploadFileNames.map((file, index) => (
//                       <li key={index}>
//                         {file.endsWith(".jpg") ||
//                         file.endsWith(".png") ||
//                         file.endsWith(".jpeg") ? (
//                           <img
//                             src={`http://localhost:8080/uploads/${file}`}
//                             alt={`Uploaded ${file}`}
//                             className="w-40 h-40 object-cover mb-2"
//                           />
//                         ) : (
//                           <a
//                             href={`http://localhost:8080/uploads/${file}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500 underline"
//                           >
//                             {file}
//                           </a>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex justify-end p-4">
//             <button
//               type="button"
//               className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
//               onClick={handleModifyClick}
//             >
//               Modify
//             </button>
//             <button
//               type="button"
//               className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
//               onClick={moveToList}
//             >
//               List
//             </button>
//           </div>
//         </>
//       )}
//       {/* 댓글 섹션 */}
//       <CommentComponent_q qno={qno} />
//     </div>
//   );
// };

// export default ReadComponent_q;


import { useEffect, useState } from "react";
import { getQnA } from "../../api/qnaApi";
import { useNavigate } from "react-router-dom";
import FetchingModal from "../common/FetchingModal";
import { useSelector } from "react-redux"; // Redux 사용 시
import CommentComponent_q from "./CommentComponent_q";
import useAuth from "../../hooks/useAuth";

const initState = {
  qno: 0,
  qnaTitle: "",
  qnaContent: "",
  email: "",
};

const ReadComponent_q = ({ qno }) => {
  const [qna, setQna] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();
  const user = useAuth() || {};
  const memberEmail = user.email || [];
  const memberRole = user.roleNames || [];

  const moveToList = () => {
    navigate("/qna/list");
  };

  const handleModifyClick = () => {
    if (!memberEmail) {
      const confirmLogin = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
      );
      if (confirmLogin) {
        navigate("/user/login");
      }
      return;
    }
    navigate(`/qna/modify/${qno}`);
  };

  useEffect(() => {
    setFetching(true);
    getQnA(qno)
      .then((data) => {
        if (data.isSecret && data.email !== memberEmail && memberRole !== "ADMIN") {
          console.log("작성한 회원이 아닙니다. 접근이 차단되었습니다."); // 알림창 대신 콘솔 경고
          navigate("/qna/list"); // 목록으로 이동
          return;
        }
        setQna(data); // API에서 받은 데이터를 상태로 설정
      })
      .catch((error) => {
        console.error("Error fetching QnA", error);
        alert("QnA 데이터를 불러오는데 실패 했습니다.")
      })
      .finally(() => {
        setFetching(false);
      });
  }, [qno, memberEmail, memberRole, navigate])


  return (
    <div className="mt-10 m-2">
      {fetching ? (
        <FetchingModal />
      ) : (
        <>
          <div className="border-t-2 border-b-2 border-gray-700 py-4">
            {/* 테이블 추가 */}
            <table className="table-auto w-full border-collapse">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="pl-6 py-2 font-bold text-gray-700 border-r border-gray-300 w-1/4">
                    제목
                  </td>
                  <td className="px-6 py-2 w-3/4">{qna.qnaTitle}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="pl-6 py-2 font-bold text-gray-700 border-r border-gray-300 w-1/4">
                    작성자
                  </td>
                  <td className="px-6 py-2 w-3/4">{qna.email || "알 수 없음"}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="pl-6 py-2 font-bold text-gray-700 border-r border-gray-300 w-1/4">
                    작성일
                  </td>
                  <td className="px-6 py-2 w-3/4">{qna.createdDate || "알 수 없음"}</td>
                </tr>
              </tbody>
            </table>

            {/* 작성일과 내용 사이 간격 추가 */}
            <div className="mt-6"></div>

            {/* 내용 */}
            <div className="px-4 py-2 ml-13">
              <h2 className="text-xl font-bold text-gray-800 mb-4">내용</h2>
              <div className="px-4 py-2">{qna.qnaContent}</div>
            </div>

            {/* 댓글 섹션 */}
            <div className="mt-6">
              <CommentComponent_q qno={qno} />
            </div>

 {/* 버튼 섹션 */}
<div className="flex justify-end mt-8">
  {/* 수정 버튼 */}
  <button
    type="button"
    className="px-6 py-2 mr-4 text-black bg-luxury-lightMustard hover:bg-luxury-richMustard rounded shadow-md"
    onClick={handleModifyClick}
  >
    수정
  </button>

  {/* 목록 버튼 */}
  <button
    type="button"
    className="px-6 py-2 text-black bg-luxury-lighterOlive hover:bg-luxury-vibrantOlive rounded shadow-md"
    onClick={moveToList}
  >
    목록
  </button>
</div>


          </div>
        </>
      )}
    </div>
  );
};

export default ReadComponent_q;
