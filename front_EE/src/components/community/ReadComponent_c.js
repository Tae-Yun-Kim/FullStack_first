// import { useEffect, useState } from 'react';
// import { getCommunity } from '../../api/communityApi';
// import { API_SERVER_HOST } from '../../api/todoApi';
// import useCustomMove from '../../hooks/useCustomMove';
// import FetchingModal from '../common/FetchingModal';
// import { jwtDecode } from 'jwt-decode';
// import jwtAxios from '../../util/authAxiosUtil';
// import { Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const initState = {
//   tno: 0,
//   communityTitle: '',
//   communityContent: '',
//   category: '',
//   ingredients: '',
//   nickname: '',
//   email: '',
//   viewCount: 0,
//   likeCount: 0,
//   createdAt: null,
//   updatedAt: null,
//   uploadFileNames: [],
//   liked: false,
// };

// const host = API_SERVER_HOST;

// const ReadComponent_c = ({ tno }) => {
//   const [community, setCommunity] = useState(initState);
//   const { moveToList, moveToModify } = useCustomMove();
//   const [fetching, setFetching] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [CommentId, setCommentId] = useState(null);
//   const [CommentContent, setCommentContent] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     setFetching(true);
  
//     const fetchCommunity = async () => {
//       try {
//         const email = getEmailFromToken(); // 로그인된 사용자 이메일 가져오기
//         const data = await getCommunity(tno, email); // 이메일 전달
//         setCommunity(data); // 커뮤니티 데이터 설정
//         setLiked(data.liked || false); // 좋아요 상태 설정
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setFetching(false);
//       }
//     };
  
//     fetchCommunity();
//     fetchComments(); // 댓글 초기화
//   }, [tno]);

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(`${host}/api/community/comment/list/${tno}`);
//       setComments(response.data.dtoList);
//     } catch (error) {
//       console.error('댓글 불러오기 실패:', error);
//     }
//   };

//   const getEmailFromToken = () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return null;
//       const decodedToken = jwtDecode(token);
//       console.log("Decoded Token Email:", decodedToken.email);
//       return decodedToken.email || null;
//     } catch (error) {
//       console.error('토큰 디코딩 실패:', error);
//       return null;
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const email = getEmailFromToken();
//       if (!email) {
//         alert('로그인이 필요합니다.');
//         navigate("/user/login");
//       }

//       await jwtAxios.post(`${host}/api/community/comment/register`, {
//         tno: tno,
//         communityCommentContent: newComment,
//         email: email,
//       });

//       setNewComment('');
//       fetchComments();
//     } catch (error) {
//       console.error('댓글 등록 실패:', error);
//       alert(error.response?.data?.message || '댓글 작성에 실패했습니다.');
//     }
//   };

//   const toggleLike = async () => {
//     try {
//       const email = getEmailFromToken();
//       if (!email) {
//         throw new Error('로그인이 필요합니다.');
//       }

//       const response = await jwtAxios.patch(
//         `${host}/api/community/${tno}/like?userEmail=${email}`
//       );

//       const data = response.data;
//       setCommunity((prevCommunity) => ({
//         ...prevCommunity,
//         likeCount: data.likeCount,
//       }));
//       setLiked(data.liked);
//     } catch (error) {
//       console.error('좋아요 토글 중 오류:', error);
//       alert(error.message || '좋아요 처리 중 오류가 발생했습니다.');
//     }
//   };

//   const handleCommentEdit = (comment) => {
//     setCommentId(comment.cno);
//     setCommentContent(comment.communityCommentContent);
//   };

//   const handleCommentUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const email = getEmailFromToken();
//       if (!email) {
//         throw new Error('로그인이 필요합니다.');
//       }

//       await jwtAxios.put(`${host}/api/community/comment/${CommentId}`, {
//         communityCommentContent: CommentContent,
//         email: email,
//       });

//       setCommentId(null);
//       setCommentContent('');
//       fetchComments();
//     } catch (error) {
//       console.error('댓글 수정 실패:', error);
//       alert(error.response?.data?.ERROR || '댓글 수정에 실패했습니다.');
//     }
//   };

//   const handleCommentDelete = async (cno) => {
//     const email = getEmailFromToken();
//     if (!email) {
//       alert('로그인이 필요합니다.');
//       return;
//     }
  
//     try {
//       await jwtAxios.delete(`${host}/api/community/comment/${cno}?email=${email}`);
//       fetchComments();
//     } catch (error) {
//       alert(error.response?.data?.ERROR || '댓글 삭제에 실패했습니다.');
//     }
//   };
  
//   const isCommentAuthor = (comment) => {
//     const email = getEmailFromToken();
//     return email && email === comment.email;
//   };

//   const isPostAuthor = () => {
//     try {
//       const loggedInEmail = getEmailFromToken();
//       return loggedInEmail && loggedInEmail === community.email;
//     } catch (error) {
//       console.error('작성자 확인 중 오류:', error);
//       return false;
//     }
//   };

//   const renderImages = () =>
//     community.uploadFileNames && community.uploadFileNames.length > 0 ? (
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">이미지</div>
//           <div className="w-4/5 justify-center flex flex-wrap items-start">
//             {community.uploadFileNames.map((imgFile, i) => (
//               <div className="flex justify-center flex-col w-1/3" key={i}>
//                 <img
//                   src={`${host}/api/community/view/${imgFile}`}
//                   alt={`uploaded-${i}`}
//                   className="w-full h-auto rounded-lg mb-2"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     ) : (
//       <div className="text-gray-500">이미지가 없습니다.</div>
//     );

//   return (
//     <div className="flex justify-center p-10">
//       {fetching && <FetchingModal />}
//       {!fetching && (
//         <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-3xl font-bold mb-4">{community.communityTitle}</h1>
//           <div className="text-gray-500 text-sm mb-4">
//             <span>작성자: {community.nickname}</span> |
//             <span> 작성일: {community.updatedAt || 'N/A'}</span> |
//             <span> 조회수: {community.viewCount}</span> |
//             <span> 좋아요: {community.likeCount}</span>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">카테고리:</h2>
//             <p>{community.category}</p>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">재료 정보:</h2>
//             <p>{community.ingredients || '재료 정보가 없습니다.'}</p>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">요리 순서:</h2>
//             <p>{community.communityContent}</p>
//           </div>
//           {renderImages()}
//           <div className="flex justify-end mt-4">
//             {isPostAuthor() && (
//               <button
//                 onClick={() => moveToModify(tno)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
//               >
//                 수정
//               </button>
//             )}
//             <button
//               onClick={() => moveToList({ page: 1 })}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg"
//             >
//               목록으로
//             </button>
//             <button
//               onClick={toggleLike}
//               className={`px-4 py-2 rounded-lg ml-2 ${
//                 liked ? 'bg-blue-500 text-white' : 'bg-gray-300'
//               }`}
//             >
//               {liked ? '좋아요 취소' : '좋아요'}
//             </button>
//           </div>
//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-4">댓글</h3>
//             {comments.map((comment) => (
//               <div
//                 key={comment.cno}
//                 className="mb-4 p-3 bg-gray-100 rounded relative"
//               >
//                 {CommentId === comment.cno ? (
//                   <form onSubmit={handleCommentUpdate}>
//                     <textarea
//                       value={CommentContent}
//                       onChange={(e) => setCommentContent(e.target.value)}
//                       className="w-full p-2 border rounded"
//                       required
//                     />
//                     <div className="flex justify-end mt-2">
//                       <button
//                         type="submit"
//                         className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                       >
//                         수정 완료
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setCommentId(null)}
//                         className="bg-gray-500 text-white px-4 py-2 rounded"
//                       >
//                         취소
//                       </button>
//                     </div>
//                   </form>
//                 ) : (
//                   <>
//                     <div className="flex justify-between items-start">
//                       <p>{comment.communityCommentContent}</p>
//                       {isCommentAuthor(comment) && (
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleCommentEdit(comment)}
//                             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                           >
//                             수정
//                           </button>
//                           <button
//                             onClick={() => handleCommentDelete(comment.cno)}
//                             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                           >
//                             삭제
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                     <small className="text-gray-500 block mt-2">
//                       <span>작성자: {comment.nickname}</span> |
//                       <span> 작성일: {comment.updatedAt || 'N/A'}</span>
//                     </small>
//                   </>
//                 )}
//               </div>
//             ))}
//             <form onSubmit={handleCommentSubmit} className="mt-4">
//               <textarea
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="댓글을 입력하세요"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 댓글 작성
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReadComponent_c;


import { useEffect, useState } from 'react';
import { getCommunity } from '../../api/communityApi';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import FetchingModal from '../common/FetchingModal';
import { jwtDecode } from 'jwt-decode';
import jwtAxios from '../../util/authAxiosUtil';
import { useNavigate } from 'react-router-dom';

const initState = {
  tno: 0,
  communityTitle: '',
  communityContent: '',
  category: '',
  ingredients: '',
  nickname: '',
  email: '',
  viewCount: 0,
  likeCount: 0,
  createdAt: null,
  updatedAt: null,
  uploadFileNames: [],
  liked: false,
};

const host = API_SERVER_HOST;

const ReadComponent_c = ({ tno }) => {
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가
  const [community, setCommunity] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [CommentId, setCommentId] = useState(null);
  const [CommentContent, setCommentContent] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   setFetching(true);
  //   getCommunity(tno)
  //     .then((data) => {
  //       setCommunity(data);
  //       setLiked(data.liked || false);
  //     })
  //     .catch((error) => console.error('Error:', error))
  //     .finally(() => setFetching(false));

  //   fetchComments();
  // }, [tno]);
  useEffect(() => {
    setFetching(true);
  
    const fetchCommunity = async () => {
      try {
        const email = getEmailFromToken(); // 로그인된 사용자 이메일 가져오기
        const data = await getCommunity(tno, email); // 이메일 전달
        setCommunity(data); // 커뮤니티 데이터 설정
        setLiked(data.liked || false); // 좋아요 상태 설정
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setFetching(false);
      }
    };
    fetchCommunity();
    fetchComments(); // 댓글 초기화
  }, [tno]);

  const fetchComments = async () => {
    try {
      const response = await jwtAxios.get(`${host}/api/community/comment/list/${tno}`);
      setComments(response.data.dtoList);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  };

  const getEmailFromToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const decodedToken = jwtDecode(token);
      return decodedToken.email || null;
    } catch (error) {
      console.error('토큰 디코딩 실패:', error);
      return null;
    }
  };

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const email = getEmailFromToken();
  //     if (!email) {
  //       throw new Error('로그인이 필요합니다.');
  //     }

  //     await jwtAxios.post(`${host}/api/community/comment/register`, {
  //       tno: tno,
  //       communityCommentContent: newComment,
  //       email: email,
  //     });

  //     setNewComment('');
  //     fetchComments();
  //   } catch (error) {
  //     console.error('댓글 등록 실패:', error);
  //     alert(error.response?.data?.message || '댓글 작성에 실패했습니다.');
  //   }
  // };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = getEmailFromToken();
      if (!email) {
        alert('로그인이 필요합니다.');
        navigate("/user/login");
      }

      await jwtAxios.post(`${host}/api/community/comment/register`, {
        tno: tno,
        communityCommentContent: newComment,
        email: email,
      });

      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert(error.response?.data?.message || '댓글 작성에 실패했습니다.');
    }
  };

  const toggleLike = async () => {
    try {
      const email = getEmailFromToken();
      if (!email) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await jwtAxios.patch(
        `${host}/api/community/${tno}/like?userEmail=${email}`
      );

      const data = response.data;
      setCommunity((prevCommunity) => ({
        ...prevCommunity,
        likeCount: data.likeCount,
      }));
      setLiked(data.liked);
    } catch (error) {
      console.error('좋아요 토글 중 오류:', error);
      alert(error.message || '좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCommentEdit = (comment) => {
    setCommentId(comment.cno);
    setCommentContent(comment.communityCommentContent);
  };

  const handleCommentUpdate = async (e) => {
    e.preventDefault();
    try {
      const email = getEmailFromToken();
      if (!email) {
        throw new Error('로그인이 필요합니다.');
      }

      await jwtAxios.put(`${host}/api/community/comment/${CommentId}`, {
        communityCommentContent: CommentContent,
        email: email,
      });

      setCommentId(null);
      setCommentContent('');
      fetchComments();
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert(error.response?.data?.ERROR || '댓글 수정에 실패했습니다.');
    }
  };

  const handleCommentDelete = async (cno) => {
    const email = getEmailFromToken();
    if (!email) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      await jwtAxios.delete(`${host}/api/community/comment/${cno}?email=${email}`);
      fetchComments();
    } catch (error) {
      alert(error.response?.data?.ERROR || '댓글 삭제에 실패했습니다.');
    }
  };
  
  const isCommentAuthor = (comment) => {
    const email = getEmailFromToken();
    return email && email === comment.email;
  };

  const isPostAuthor = () => {
    try {
      const loggedInEmail = getEmailFromToken();
      return loggedInEmail && loggedInEmail === community.email;
    } catch (error) {
      console.error('작성자 확인 중 오류:', error);
      return false;
    }
  };

  const renderImages = () =>
    community.uploadFileNames && community.uploadFileNames.length > 0 ? (
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 text-start font-bold text-lg mr-10">레시피 사진</div>
          <div className="w-full justify-center flex flex-wrap items-start">
            {community.uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <img
                  src={`${host}/api/community/view/${imgFile}`}
                  alt={`uploaded-${i}`}
                  className="w-full h-auto rounded-lg mb-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="text-gray-500">이미지가 없습니다.</div>
    );

  return (
    <div className="flex justify-center p-10">
      {fetching && <FetchingModal />}
      {!fetching && (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">{community.communityTitle}</h1>
          <div className="text-gray-500 text-sm mb-4">
            <span>작성자: {community.nickname}</span> |
            <span> 작성일: {community.updatedAt || 'N/A'}</span> |
            <span> 조회수: {community.viewCount}</span> |
            <span> 좋아요: {community.likeCount}</span>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">카테고리</h2>
            <p>{community.category}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">재료 정보</h2>
            <p>{community.ingredients || '재료 정보가 없습니다.'}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">요리 순서</h2>
            <p>{community.communityContent}</p>
          </div>
          {renderImages()}
          <div className="flex justify-end mt-4">
            {isPostAuthor() && (
              <button
                onClick={() => moveToModify(tno)}
                className="bg-gray-300 font-bold text-black px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
              >
                수정
              </button>
            )}
            <button
              onClick={() => moveToList({ page: 1 })}
              className="bg-luxury-lightOlive font-bold text-black px-4 py-2 rounded-lg hover:bg-luxury-darkerOlive"
            > 
              리스트
            </button>
            <button
              onClick={toggleLike}
              className={`px-4 py-2 rounded-lg ml-2 ${
                liked ? 'bg-luxury-darkerOlive font-bold text-black hover:bg-luxury-lightOlive' : 'bg-luxury-darkerOlive font-bold hover:bg-luxury-lightOlive '
              }`}
            >
              {liked ? '좋아요 취소' : '좋아요'}
            </button>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">댓글</h3>
            {comments.map((comment) => (
              <div
                key={comment.cno}
                className="mb-4 p-3 bg-gray-100 rounded relative"
              >
                {CommentId === comment.cno ? (
                  <form onSubmit={handleCommentUpdate}>
                    <textarea
                      value={CommentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        className="bg-gray-300 font-bold text-black px-4 py-2 rounded mr-2 hover:bg-gray-400"
                      >
                        수정 완료
                      </button>
                      <button
                        type="button"
                        onClick={() => setCommentId(null)}
                        className="bg-red-400 font-bold text-black px-4 py-2 rounded hover:bg-red-500"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <p>{comment.communityCommentContent}</p>
                      {isCommentAuthor(comment) && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleCommentEdit(comment)}
                            className="bg-gray-300 font-bold text-black px-3 py-1 rounded hover:bg-gray-400"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleCommentDelete(comment.cno)}
                            className="bg-red-400 font-bold text-black px-3 py-1 rounded hover:bg-red-500"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                    <small className="text-gray-500 block mt-2">
                      <span>작성자: {comment.nickname}</span> |
                      <span> 작성일: {comment.updatedAt || 'N/A'}</span>
                    </small>
                  </>
                )}
              </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="댓글을 입력하세요"
                required
              />
              <button
                disabled={isLoading}
                className={`m-2 p-2 w-25 font-bold text-center cursor-pointer rounded ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "text-gray-600 bg-luxury-lightOlive hover:bg-luxury-darkerOlive"
                }`}
              >
                댓글 작성
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadComponent_c;