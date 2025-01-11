// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { getMealkitById } from "../../api/mealkitApi";
// import { API_SERVER_HOST } from "../../api/todoApi";

// const MealKitPage = () => {
//   const [mealKitData, setMealKitData] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [newComment, setNewComment] = useState({ name: "", content: "", rating: 0 });
//   const [showCommentForm, setShowCommentForm] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 여부 (임시로 true)

//   const { mid } = useParams(); // URL에서 밀키트 ID 가져오기
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMealkit = async () => {
//       try {
//         const data = await getMealkitById(mid);
//         console.log(data);
//         setMealKitData(data);
//       } catch (error) {
//         console.error("밀키트 정보를 가져올 수 없습니다.", error);
//       }
//     };

//     fetchMealkit();
//   }, [mid]);

//   const averageRating = comments.length
//     ? (comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length).toFixed(1)
//     : 0;

//   const handleFavoriteClick = () => {
//     if (!isLoggedIn) {
//       alert("로그인이 필요합니다.");
//       navigate("/login");
//       return;
//     }
//     setFavorites((prev) =>
//       prev.includes(mid) ? prev.filter((id) => id !== mid) : [...prev, mid]
//     );
//   };

//   const handleAddToCart = () => {
//     if (!isLoggedIn) {
//       alert("로그인이 필요합니다.");
//       navigate("/login");
//       return;
//     }
//     if (!cart.includes(mid)) {
//       setCart((prev) => [...prev, mid]);
//       alert("장바구니에 추가되었습니다.");
//     }
//   };

//   const handleAddComment = () => {
//     if (!isLoggedIn) {
//       alert("로그인이 필요합니다.");
//       navigate("/login");
//       return;
//     }
//     setComments((prev) => [
//       ...prev,
//       { id: prev.length + 1, userName: newComment.name, content: newComment.content, rating: newComment.rating },
//     ]);
//     setNewComment({ name: "", content: "", rating: 0 });
//     setShowCommentForm(false);
//   };

//   if (!mealKitData) {
//     return <div className="text-center mt-20">로딩 중...</div>;
//   }

//   return (
//     <div className="container mx-auto p-8 max-w-screen-lg bg-white shadow-lg rounded-lg">
//       {/* 밀키트 제목 */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">{mealKitData.mname}</h1>
//         <button
//           onClick={handleFavoriteClick}
//           className="text-2xl"
//           style={{ color: favorites.includes(mid) ? "red" : "gray" }}
//         >
//           {favorites.includes(mid) ? "❤️" : "🤍"}
//         </button>
//       </div>

//       {/* 밀키트 이미지 및 정보 */}
//       <div className="flex">
//         <div className="w-1/2">
//           <img
//             src={`${API_SERVER_HOST}/mealkits/view/${mealKitData.uploadFileNames[0]}`}
//             alt={mealKitData.mname}
//             className="w-full rounded-lg object-cover shadow-md"
//           />
//         </div>
//         <div className="w-1/2 pl-8">
//           <p className="text-lg mb-2">
//             <strong>가격:</strong> {mealKitData.price}원
//           </p>
//           <p className="text-lg mb-2">
//             <strong>카테고리:</strong> {mealKitData.category}
//           </p>
//           <p className="text-lg mb-2">
//             <strong>레시피:</strong> {mealKitData.recipe}
//           </p>
//           <Link
//             to={`/mealkitpage/${mid}/customize`}
//             className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
//           >
//             재료 선택 및 장바구니 담기
//           </Link>
//         </div>
//       </div>

//       {/* 평점 및 댓글 */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold">사용자 후기</h2>
//         <p className="mt-2">평점: ⭐ {averageRating}점</p>

//         {comments.length > 0 ? (
//           <ul className="space-y-4 mt-4">
//             {comments.map((comment) => (
//               <li
//                 key={comment.id}
//                 className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col"
//               >
//                 <p className="font-semibold">{comment.userName}</p>
//                 <p>{comment.content}</p>
//                 <p>평점: ⭐ {comment.rating}점</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-4">댓글이 없습니다.</p>
//         )}

//         {showCommentForm ? (
//           <div className="mt-4">
//             <input
//               type="text"
//               placeholder="이름"
//               value={newComment.name}
//               onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//             <textarea
//               placeholder="댓글을 입력하세요"
//               value={newComment.content}
//               onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
//               className="mt-2 p-2 border border-gray-300 rounded w-full"
//             />
//             <div className="mt-2">
//               <label>평점:</label>
//               <select
//                 value={newComment.rating}
//                 onChange={(e) => setNewComment({ ...newComment, rating: parseInt(e.target.value) })}
//                 className="ml-2 p-2 border border-gray-300 rounded"
//               >
//                 <option value={0}>선택</option>
//                 {[1, 2, 3, 4, 5].map((num) => (
//                   <option key={num} value={num}>
//                     {num}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               onClick={handleAddComment}
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               댓글 작성
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={() => setShowCommentForm(true)}
//             className="mt-4 bg-gray-200 px-4 py-2 rounded"
//           >
//             댓글 작성하기
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MealKitPage;


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMealkitById } from "../../api/mealkitApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import jwtAxios from "../../util/authAxiosUtil";
import { jwtDecode } from "jwt-decode";

const MealKitPage = () => {
  const [mealKitData, setMealKitData] = useState(null);
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [newComment, setNewComment] = useState({ content: "", rating: 0 });
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const { mid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMealkit();
    fetchComments();
  }, [mid]);

  const fetchMealkit = async () => {
    try {
      const data = await getMealkitById(mid);
      console.log(data);
      setMealKitData(data);
    } catch (error) {
      console.error("밀키트 정보를 가져올 수 없습니다.", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await jwtAxios.get(`${API_SERVER_HOST}/mealkits/comment/list/${mid}`);
      setComments(response.data.dtoList);
    } catch (error) {
      console.error("댓글을 불러오는데 실패했습니다:", error);
    }
  };

  const getEmailFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const decodedToken = jwtDecode(token);
      return decodedToken.email || null;
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
      return null;
    }
  };

  const handleFavoriteClick = () => {
    const email = getEmailFromToken();
    if (!email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setFavorites((prev) =>
      prev.includes(mid) ? prev.filter((id) => id !== mid) : [...prev, mid]
    );
  };

  const handleAddToCart = () => {
    const email = getEmailFromToken();
    if (!email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    if (!cart.includes(mid)) {
      setCart((prev) => [...prev, mid]);
      alert("장바구니에 추가되었습니다.");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const email = getEmailFromToken();
      if (!email) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
      await jwtAxios.post(`${API_SERVER_HOST}/mealkits/comment/register`, {
        mid: mid,
        content: newComment.content,
        rating: newComment.rating,
        email: email,
      });
      setNewComment({ content: "", rating: 0 });
      setShowCommentForm(false);
      fetchComments();
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert(error.response?.data?.message || "댓글 작성에 실패했습니다.");
    }
  };

  const handleCommentDelete = async (mcno) => {
    const email = getEmailFromToken();
    if (!email) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      await jwtAxios.delete(`${API_SERVER_HOST}/mealkits/comment/${mcno}?email=${email}`);
      fetchComments();
    } catch (error) {
      alert(error.response?.data?.ERROR || "댓글 삭제에 실패했습니다.");
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment({ ...comment });
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    try {
      const email = getEmailFromToken();
      if (!email) {
        alert("로그인이 필요합니다.");
        return;
      }
      await jwtAxios.put(`${API_SERVER_HOST}/mealkits/comment/${editingComment.mcno}`, {
        content: editingComment.content,
        rating: editingComment.rating,
        email: email,
      });
      setEditingComment(null);
      fetchComments();
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert(error.response?.data?.ERROR || "댓글 수정에 실패했습니다.");
    }
  };

  const isCommentAuthor = (comment) => {
    const email = getEmailFromToken();
    return email && email === comment.email;
  };

  if (!mealKitData) {
    return <div className="text-center mt-20">로딩 중...</div>;
  }

  const averageRating = comments.length
    ? (comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length).toFixed(1)
    : 0;

  return (
    <div className="container mx-auto p-8 max-w-screen-lg bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{mealKitData.mname}</h1>
        {/* <button
          onClick={handleFavoriteClick}
          className="text-2xl"
          style={{ color: favorites.includes(mid) ? "red" : "gray" }}
        >
          {favorites.includes(mid) ? "❤️" : "🤍"}
        </button> */}
      </div>

      <div className="flex">
        <div className="w-1/2">
          <img
            src={`${API_SERVER_HOST}/mealkits/view/${mealKitData.uploadFileNames[0]}`}
            alt={mealKitData.mname}
            className="w-full rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="w-1/2 pl-8">
          <p className="text-lg mb-2">
            <strong>가격:</strong> {mealKitData.price}원
          </p>
          <p className="text-lg mb-2">
            <strong>카테고리:</strong> {mealKitData.category}
          </p>
          <p className="text-lg mb-2">
            <strong>레시피:</strong> {mealKitData.recipe}
          </p>
          <Link
            to={`/mealkitpage/${mid}/customize`}
            className="mt-4 inline-block bg-luxury-lightOlive text-gray-600 font-bold px-6 py-2 rounded hover:bg-luxury-darkerOlive transition"
          >
            재료 선택 및 장바구니 담기
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">사용자 후기</h2>
        <p className="mt-2">평점: ⭐ {averageRating}점</p>

        {comments.length > 0 ? (
          <ul className="space-y-4 mt-4">
            {comments.map((comment) => (
              <li
                key={comment.mcno}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col relative"
              >
                {editingComment && editingComment.mcno === comment.mcno ? (
                  <form onSubmit={handleUpdateComment} className="w-full">
                    <textarea
                      value={editingComment.content}
                      onChange={(e) => setEditingComment({...editingComment, content: e.target.value})}
                      className="w-full p-2 border rounded mb-2"
                      required
                    />
                    <div className="mb-2">
                      <label>평점:</label>
                      <select
                        value={editingComment.rating}
                        onChange={(e) => setEditingComment({...editingComment, rating: parseInt(e.target.value)})}
                        className="ml-2 p-2 border rounded"
                        required
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                        수정 완료
                      </button>
                      <button type="button" onClick={() => setEditingComment(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                        취소
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="font-semibold">{comment.nickname}</p>
                    <p>{comment.content}</p>
                    <p>평점: ⭐ {comment.rating}점</p>
                    <small className="text-gray-500 block mt-2">
                      작성일: {comment.updatedAt || "N/A"}
                    </small>
                    {isCommentAuthor(comment) && (
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => handleEditComment(comment)}
                          className="text-blue-500 mr-2"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleCommentDelete(comment.mcno)}
                          className="text-red-500"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">댓글이 없습니다.</p>
        )}

        {showCommentForm ? (
          <form onSubmit={handleAddComment} className="mt-4">
            <textarea
              placeholder="댓글을 입력하세요"
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              required
            />
            <div className="mt-2">
              <label>평점:</label>
              <select
                value={newComment.rating}
                onChange={(e) => setNewComment({ ...newComment, rating: parseInt(e.target.value) })}
                className="ml-2 p-2 border border-gray-300 rounded"
                required
              >
                <option value="">선택</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              댓글 작성
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowCommentForm(true)}
            className="mt-4 bg-luxury-lightOlive font-bold px-4 py-2 rounded hover:bg-luxury-darkerOlive"
          >
            댓글 작성하기
          </button>
        )}
      </div>
    </div>
  );
};

export default MealKitPage;
