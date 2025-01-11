// import React, { useState, useEffect } from "react"; // React 및 훅 임포트
// import { postQnA } from "../../api/qnaApi"; // QnA API 함수 임포트
// import FetchingModal from "../common/FetchingModal"; // FetchingModal 컴포넌트 임포트
// import ResultModal from "../common/ResultModal"; // ResultModal 컴포넌트 임포트
// import useCustomMove from "../../hooks/useCustomMove"; // 커스텀 훅 임포트
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// // 초기 상태 설정
// const initState = {
//   qnaTitle: "",
//   qnaContent: "",
//   isSecret: false,
//   email: "",
//   category: "",
//   files: [],
// };

// const AddComponent_q = () => {
//   const [qna, setQna] = useState({ ...initState });
//   const [fetching, setFetching] = useState(false);
//   const [result, setResult] = useState(null);
//   const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
//   const { moveToList } = useCustomMove();
//   const navigate = useNavigate();

//   // 로그인하지 않은 경우
//   useEffect(() => {
//     if (!memberEmail) {
//       alert("로그인이 필요합니다.");
//       navigate("/user/login");
//     } else {
//       setQna((prevQna) => ({
//         ...prevQna,
//         email: memberEmail,
//       }));
//     }
//   }, [memberEmail, navigate]);

//   // 입력 핸들러
//   const handleChangeQna = (e) => {
//     const { name, value, type, checked } = e.target;
//     console.log("Input Change - Name:", name, "Value:", value);

//     setQna((prevQna) => ({
//       ...prevQna,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // 파일 선택 핸들러
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setQna((prevQna) => ({
//       ...prevQna,
//       files,
//     }));
//     console.log("Selected Files:", files);
//   };

//   // 등록 버튼 클릭
//   const handleClickAdd = async () => {
//     console.log("Current QnA State:", qna);

//     if (!qna.qnaTitle.trim()) {
//       alert("제목을 입력하세요.");
//       return;
//     }
//     if (!qna.qnaContent.trim()) {
//       alert("내용을 입력하세요.");
//       return;
//     }
//     if (!qna.category.trim()) {
//       alert("카테고리를 선택하세요.");
//       return;
//     }

//     setFetching(true);

//     try {
//       const data = await postQnA(qna);
//       setResult(data);

//       // 상태 초기화
//       setQna({ ...initState, email: memberEmail });
//     } catch (error) {
//       console.error("Error adding QnA:", error);
//       alert("QnA 등록에 실패했습니다.");
//     } finally {
//       setFetching(false);
//     }
//   };

//   const closeModal = () => {
//     setResult(null);
//     moveToList({ page: 1 });
//   };

//   return (
//     <div className="border-2 border-sky-200 mt-10 m-2 p-4">
//       {fetching && <FetchingModal />}
//       {result && (
//         <ResultModal
//           title="QnA 등록 결과"
//           content={`QnA 등록이 완료되었습니다.`}
//           callbackFn={closeModal}
//         />
//       )}
//       <div className="text-2xl font-bold mb-6 text-center">QnA 등록</div>

//       <div className="flex justify-center">
//         <div className="w-full max-w-3xl">
//           <div className="mb-4">
//             <label htmlFor="qnaTitle">제목</label>
//             <input
//               id="qnaTitle"
//               name="qnaTitle"
//               type="text"
//               value={qna.qnaTitle}
//               onChange={handleChangeQna}
//               placeholder="제목을 입력하세요"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="qnaContent">내용</label>
//             <textarea
//               id="qnaContent"
//               name="qnaContent"
//               rows="6"
//               value={qna.qnaContent}
//               onChange={handleChangeQna}
//               placeholder="내용을 입력하세요"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="category">카테고리</label>
//             <select
//               id="category"
//               name="category"
//               value={qna.category}
//               onChange={handleChangeQna}
//               required
//             >
//               <option value="">카테고리를 선택하세요</option>
//               <option value="주문 및 결제">주문 및 결제</option>
//               <option value="배송 및 반품">배송 및 반품</option>
//               <option value="제품 문의">제품 문의</option>
//               <option value="회원 서비스">회원 서비스</option>
//               <option value="기타">기타</option>
//             </select>
//           </div>
//           {/* <div className="mb-4">
//             <label>첨부파일</label>
//             <input type="file" multiple onChange={handleFileChange} />
//           </div> */}
//           <div className="mb-4">
//             <label>
//               <input
//                 type="checkbox"
//                 name="isSecret"
//                 checked={qna.isSecret}
//                 onChange={handleChangeQna}
//               />
//               비밀글로 설정
//             </label>
//           </div>
//           <div className="flex justify-end">
//             <button onClick={handleClickAdd}>등록</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddComponent_q;

import React, { useState, useEffect } from "react"; // React 및 훅 임포트
import { postQnA } from "../../api/qnaApi"; // QnA API 함수 임포트
import FetchingModal from "../common/FetchingModal"; // FetchingModal 컴포넌트 임포트
import ResultModal from "../common/ResultModal"; // ResultModal 컴포넌트 임포트
import useCustomMove from "../../hooks/useCustomMove"; // 커스텀 훅 임포트
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 초기 상태 설정
const initState = {
  qnaTitle: "",
  qnaContent: "",
  isSecret: false,
  email: "",
  category: "",
};

const AddComponent_q = () => {
  const [qna, setQna] = useState({ ...initState });
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const [contentPlaceholder, setContentPlaceholder] = useState(
    `※ 아래 사항을 반드시 확인하고 작성해주세요:
    1. 전화번호, 이메일, 주소, 계좌번호 등의 개인정보는 입력하지 마세요.
    2. 주문/결제 관련 문의는 주문번호를 반드시 포함해주세요.
    3. 문제 상황을 구체적으로 작성해주시면 빠른 답변이 가능합니다.`
  ); // 경고 문구 기본값
  const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
  const { moveToList } = useCustomMove();
  const navigate = useNavigate();

  // 로그인하지 않은 경우
  useEffect(() => {
    if (!memberEmail) {
      alert("로그인이 필요합니다.");
      navigate("/user/login");
    } else {
      setQna((prevQna) => ({
        ...prevQna,
        email: memberEmail,
      }));
    }
  }, [memberEmail, navigate]);

  // 입력 핸들러
  const handleChangeQna = (e) => {
    const { name, value, type, checked } = e.target;
    setQna((prevQna) => ({
      ...prevQna,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 등록 버튼 클릭
  const handleClickAdd = async () => {
    if (!qna.qnaTitle.trim()) {
      alert("제목을 입력하세요.");
      return;
    }
    if (!qna.qnaContent.trim()) {
      alert("내용을 입력하세요.");
      return;
    }
    if (!qna.category.trim()) {
      alert("카테고리를 선택하세요.");
      return;
    }

    setFetching(true);

    try {
      const data = await postQnA(qna);
      setResult(data);
      setQna({ ...initState, email: memberEmail });
    } catch (error) {
      console.error("Error adding QnA:", error);
      alert("QnA 등록에 실패했습니다.");
    } finally {
      setFetching(false);
    }
  };

  const closeModal = () => {
    setResult(null);
    moveToList({ page: 1 });
  };

  return (
    <div className="border-t-2 border-b-2 border-gray-400 mt-10 mx-auto w-full max-w-4xl bg-white p-6">
      {fetching && <FetchingModal />}
      {result && (
        <ResultModal
          title="QnA 등록 결과"
          content="QnA 등록이 완료되었습니다."
          callbackFn={closeModal}
        />
      )}
      <div className="text-3xl font-bold mb-6 text-center">1:1 문의</div>

      <div className="space-y-6">
        {/* 유형 */}
        <div>
          <label htmlFor="category" className="block font-medium mb-2">
            유형
          </label>
          <select
            id="category"
            name="category"
            value={qna.category}
            onChange={handleChangeQna}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-sky-300"
            required
          >
            <option value="">문의 유형을 선택해주세요</option>
            <option value="주문 및 결제">주문 및 결제</option>
            <option value="배송 및 반품">배송 및 반품</option>
            <option value="제품 문의">제품 문의</option>
            <option value="회원 서비스">회원 서비스</option>
            <option value="기타">기타</option>
          </select>
        </div>

        {/* 제목 */}
        <div>
          <label htmlFor="qnaTitle" className="block font-medium mb-2">
            제목
          </label>
          <input
            id="qnaTitle"
            name="qnaTitle"
            type="text"
            value={qna.qnaTitle}
            onChange={handleChangeQna}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-sky-300"
            placeholder="제목을 입력해주세요"
            required
          />
        </div>

        {/* 내용 */}
        <div>
          <label htmlFor="qnaContent" className="block font-medium mb-2">
            내용
          </label>
          <textarea
            id="qnaContent"
            name="qnaContent"
            rows="8"
            value={qna.qnaContent}
            onChange={handleChangeQna}
            onFocus={() => setContentPlaceholder("")} // 입력 시 경고 문구 제거
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-sky-300"
            placeholder={contentPlaceholder} // 경고 문구 기본값
            required
          />
        </div>

        {/* 비밀글 옵션 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isSecret"
            checked={qna.isSecret}
            onChange={handleChangeQna}
            className="h-5 w-5 text-sky-600 focus:ring focus:ring-sky-300"
          />
          <label htmlFor="isSecret" className="ml-2 text-gray-700">
            비밀글로 설정
          </label>
        </div>

      {/* 등록 버튼 */}
<div className="text-right">
  <button
    onClick={handleClickAdd}
    className="bg-luxury-lightOlive text-white font-bold py-3 px-6 rounded-md hover:bg-luxury-deepOlive focus:outline-none focus:ring focus:ring-luxury-deepOlive"
  >
    등록
  </button>
</div>

      </div>
    </div>
  );
};

export default AddComponent_q;
