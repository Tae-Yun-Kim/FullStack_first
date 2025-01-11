// import { useRef, useState, useEffect } from "react";
// import FetchingModal from "../common/FetchingModal";
// import ResultModal from "../common/ResultModal";
// import useCustomMove from "../../hooks/useCustomMove";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// const initState = {
//   pname: "",
//   pdesc: "",
//   category: "",
//   ingredients: "",
//   createdAt: null,
//   updatedAt: null,
// };

// const AddComponent_c = () => {
//   const [product, setProduct] = useState({ ...initState });
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const uploadRef = useRef();
//   const [fetching, setFetching] = useState(false);
//   const [result, setResult] = useState(null);
//   const [userEmail, setUserEmail] = useState(""); // 이메일 상태 관리
//   const { moveToList } = useCustomMove();
//   const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//       if (!memberEmail) {
//         alert("로그인이 필요합니다.");
//         navigate("/user/login");
//       }
//     }, [memberEmail, navigate]);

//   const handleChangeProduct = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setPreviewUrls([]);
//     const urls = files.map((file) => {
//       const reader = new FileReader();
//       return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result);
//         reader.readAsDataURL(file);
//       });
//     });
//     Promise.all(urls).then(setPreviewUrls);
//   };

//   const handleClickAdd = async () => {
//     if (!memberEmail) {
//       alert("로그인 후 레시피를 등록할 수 있습니다.");
//       return;
//     }

//     const files = Array.from(uploadRef.current.files);
//     if (!files || files.length === 0) {
//       alert("이미지를 첨부해주세요.");
//       return;
//     }

//     const formData = new FormData();

//     // 파일 데이터 추가
//     files.forEach((file) => {
//       formData.append("files", file);
//     });

//     // 레시피 데이터 추가
//     formData.append("communityTitle", product.pname);
//     formData.append("communityContent", product.pdesc);
//     formData.append("category", product.category);
//     formData.append("ingredients", product.ingredients);
//     formData.append("registerDate", product.registerDate);

//     // 로그인된 사용자의 이메일 추가
//     formData.append("email", memberEmail); // 이메일 추가

//     console.log("Form Data being sent:", formData); // 디버깅: 전송할 데이터 확인

//     setFetching(true);

//     try {
//       const response = await fetch("http://localhost:8080/api/community/register", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setResult(data.TNO);
//     } catch (error) {
//       alert("레시피 등록에 실패했습니다: " + error.message);
//     } finally {
//       setFetching(false);
//     }
//   };

//   const closeModal = () => {
//     setResult(null);
//     moveToList({ page: 1 });
//   };

//   const isFormValid = () => {
//     return (
//       product.pname.trim() !== "" &&
//       product.category.trim() !== "" &&
//       product.ingredients.trim() !== "" &&
//       product.pdesc.trim() !== "" &&
//       uploadRef.current.files.length > 0
//     );
//   };

//   return (
//     <div className="flex justify-center p-10">
//       {fetching && <FetchingModal />}
//       {result && (
//         <ResultModal
//           title="상품 등록 결과"
//           content={`등록 성공! ID: ${result}`}
//           callbackFn={closeModal}
//         />
//       )}
//       <div className="w-2/3 bg-white rounded-lg">
//         <h1 className="text-3xl font-semibold text-center mb-8">게시글 등록</h1>
//         <form>
//           {/* 상품명 */}
//           <div className="flex justify-center mb-8">
//             <div className="relative flex w-full items-stretch">
//               <div className="w-1/5 text-right font-bold p-6">게시글 제목</div>
//               <input
//                 type="text"
//                 name="pname"
//                 className="w-4/5 p-6 border border-gray-300 rounded-lg shadow-md"
//                 value={product.pname}
//                 onChange={handleChangeProduct}
//                 placeholder="제목을 입력하세요"
//                 required
//               />
//             </div>
//           </div>

//           {/* 카테고리 */}
//           <div className="flex justify-center mb-8">
//             <div className="relative flex w-full items-stretch">
//               <div className="w-1/5 text-right font-bold p-6">카테고리</div>
//               <select
//                 name="category"
//                 className="w-4/5 p-6 border border-gray-300 rounded-lg shadow-md"
//                 value={product.category}
//                 onChange={handleChangeProduct}
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
//               <div className="w-1/5 text-right font-bold p-6">재료 정보</div>
//               <textarea
//                 name="ingredients"
//                 rows="4"
//                 className="w-4/5 p-6 border border-gray-300 rounded-lg shadow-md resize-y"
//                 value={product.ingredients}
//                 onChange={handleChangeProduct}
//                 placeholder="재료 정보를 입력하세요"
//                 required
//               />
//             </div>
//           </div>

//           {/* 요리 순서 */}
//           <div className="flex justify-center mb-8">
//             <div className="relative flex w-full items-stretch">
//               <div className="w-1/5 text-right font-bold p-6">요리 순서</div>
//               <textarea
//                 name="pdesc" // 요리 순서 필드
//                 rows="4"
//                 className="w-4/5 p-6 border border-gray-300 rounded-lg shadow-md resize-y"
//                 value={product.pdesc}
//                 onChange={handleChangeProduct}
//                 placeholder="요리 순서를 입력하세요"
//                 required
//               />
//             </div>
//           </div>

//           {/* 등록 버튼 */}
//           <div className="flex justify-center">
//             <button
//               type="button"
//               className="bg-luxury-lightbeige text-gray-600 px-6 py-3 rounded-lg text-xl font-semibold w-1/3 hover:bg-luxury-beige"
//               onClick={handleClickAdd}
//               disabled={fetching || !isFormValid()}
//             >
//               {fetching ? "등록 중..." : "상품 등록"}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* 상품 사진 업로드 */}
//       <div className="w-1/3 ml-10 bg-white rounded-lg">
//         <h3 className="text-3xl font-semibold text-center mb-8">상품 사진 업로드</h3>
//         <input
//           type="file"
//           ref={uploadRef}
//           multiple
//           className="border-2 p-4 rounded-lg w-full text-lg"
//           onChange={handleFileChange}
//         />
//         {/* 미리보기 */}
//         {previewUrls.length > 0 && (
//           <div className="mt-6">
//             {previewUrls.map((url, index) => (
//               <img
//                 key={index}
//                 src={url}
//                 alt={`미리보기-${index}`}
//                 className="w-full h-auto rounded-lg border-2 mb-4"
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddComponent_c;

import { useRef, useState, useEffect } from "react";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const initState = {
  pname: "",
  pdesc: "",
  category: "",
  ingredients: "",
  createdAt: null,
  updatedAt: null,
};

const AddComponent_c = () => {
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가
  const [product, setProduct] = useState({ ...initState });
  const [previewUrls, setPreviewUrls] = useState([]);
  const uploadRef = useRef();
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // 이메일 상태 관리
  const { moveToList } = useCustomMove();
  const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!memberEmail) {
      alert("로그인이 필요합니다.");
      navigate("/user/login");
    }
  }, [memberEmail, navigate]);

  const handleChangeProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewUrls([]); 
    const urls = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(urls).then(setPreviewUrls);
  };

  const handleClickAdd = async () => {
    if (!memberEmail) {
      alert("로그인 후 레시피를 등록할 수 있습니다.");
      return;
    }

    const formData = new FormData();
  
    // 레시피 데이터 추가
    formData.append("communityTitle", product.pname);
    formData.append("communityContent", product.pdesc);
    formData.append("category", product.category);
    formData.append("ingredients", product.ingredients);
    formData.append("registerDate", product.registerDate);
  
    // 로그인된 사용자의 이메일 추가
    formData.append("email", memberEmail);

    // 이미지 파일이 있을 경우에만 formData에 추가
    const files = Array.from(uploadRef.current.files);
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }else {
      // 이미지가 없으면 빈 파일 배열로 전송
      // 빈 파일이 여러 개 필요할 경우에 대비해 빈 파일을 하나라도 추가해주는 방식
      const emptyFile = new File([], "empty.jpg", { type: "image/jpeg" }); // 빈 파일 하나 추가
    formData.append("files", emptyFile); // 빈 파일을 하나라도 추가
    }
  
    console.log("Form Data being sent:", formData); // 디버깅: 전송할 데이터 확인
  
    setFetching(true);
  
    try {
      const response = await fetch("http://localhost:8080/api/community/register", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setResult(data.TNO);
    } catch (error) {
      alert("레시피 등록에 실패했습니다: " + error.message);
    } finally {
      setFetching(false);
    }
  };
  
  const closeModal = () => {
    setResult(null);
    moveToList({ page: 1 });
  };

  const isFormValid = () => {
    return (
      product.pname.trim() !== "" &&
      product.category.trim() !== "" &&
      product.ingredients.trim() !== "" &&
      product.pdesc.trim() !== ""
    );
  };

  return (
    <div className="flex justify-center p-10">
  {fetching && <FetchingModal />}
  {result && (
    <ResultModal
      title="레시피 등록 결과"
      content={`등록 성공! ID: ${result}`}
      callbackFn={closeModal}
    />
  )}
  <div className="w-full bg-white rounded-lg border rounded p-3 mb-8">
    <h1 className="text-3xl font-semibold whitespace-nowrap text-center mt-12 mb-8">레시피 등록</h1>
    <form>
      
{/* 레시피 제목 */}
<div className="flex justify-start mb-8">
  <div className="w-1/5 text-center font-bold p-4">레시피 제목</div>
  <input
    type="text"
    name="pname"
    className="w-3/5 p-6 border border-gray-300 rounded-lg shadow-md"
    value={product.pname}
    onChange={handleChangeProduct}
    placeholder="레시피 제목을 입력하세요"
    required
  />
</div>

      {/* 카테고리 */}
      <div className="flex justify-start mb-8">
        <div className="w-1/5 text-center font-bold p-4">카테고리</div>
        <select
          name="category"
          className="w-3/5 p-6 border border-gray-300 rounded-lg shadow-md"
          value={product.category}
          onChange={handleChangeProduct}
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
        <div className="w-1/5 text-center font-bold p-4">재료 정보</div>
        <textarea
          name="ingredients"
          rows="4"
          className="w-3/5 p-6 border border-gray-300 rounded-lg shadow-md"
          onChange={handleChangeProduct}
          placeholder="재료 정보를 입력하세요"
          required
        />
      </div>

      {/* 레시피 순서 */}
      <div className="flex justify-start mb-8">
        <div className="w-1/5 text-center font-bold p-4">레시피 순서</div>
        <textarea
          name="pdesc"
          rows="4"
          className="w-3/5 p-6 border border-gray-300 rounded-lg shadow-md"
          value={product.pdesc}
          onChange={handleChangeProduct}
          placeholder="레시피 순서를 입력하세요"
          required
        />
      </div>

        {/* 레시피 사진 업로드 */}
<div className="flex justify-start mb-8">
  <div className="w-1/5 text-center font-bold p-4">레시피 사진</div>
  <input
    type="file"
    ref={uploadRef}
    multiple
    className="w-3/5 p-6 border border-gray-300 rounded-lg shadow-md"
    onChange={handleFileChange}
  />
</div>

{/* 미리보기 */}
{previewUrls.length > 0 && (
  <div className="flex justify-center">
  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
    <div className="w-4/5 justify-center flex flex-wrap items-start">
      {/* 기존 이미지는 previewUrls로만 렌더링 */}
      {previewUrls.map((url, index) => (
        <div className="flex justify-center flex-col w-2/3 ml-20">
          <img
          key={index}
          src={url}
          alt={`미리보기-${index}`}
          className="w-full h-auto justify-center rounded-lg border-2 mb-4 ml-12" 
        />
        </div>
      ))}
    </div>
  </div>
  </div>
)}


      {/* 등록 버튼 */}
      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={handleClickAdd}
          className={`m-3 p-2 w-1/5 font-bold text-center cursor-pointer ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "text-gray-600 bg-luxury-lightOlive font-bold hover:bg-luxury-darkerOlive rounded-lg"
          }`}
        >
          {fetching ? "등록 중..." : "레시피 등록"}
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default AddComponent_c;