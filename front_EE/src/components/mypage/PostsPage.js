// import { useEffect, useState } from "react";
// import { getCommunityList, increaseViewCount } from "../../api/communityApi";
// import { Link, useNavigate } from "react-router-dom";
// import useCustomMove from '../../hooks/useCustomMove';  // 커스텀 훅 사용
// import FetchingModal from "../common/FetchingModal";
// import PageComponent from "../common/PageComponent";
// import DeleteModal from "../common/DeleteModal";

// const initState = {
//   dtoList: [],
//   pageNumList: [],
//   pageRequestDTO: null,
//   prev: false,
//   next: false,
//   totalCount: 0,
//   prevPage: 0,
//   nextPage: 0,
//   totalPage: 0,
//   current: 0,
// };

// const PostsPage = () => {
//   const navigate = useNavigate();
//   const { page, size, refresh, moveToPost, moveToPostList } = useCustomMove();  // moveToPost 가져오기
//   const [serverData, setServerData] = useState(initState);
//   const [fetching, setFetching] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [postToDelete, setPostToDelete] = useState(null);

//   useEffect(() => {
//     setFetching(true);
//     getCommunityList({ page, size })
//       .then((data) => {
//         setServerData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   }, [page, size]);

//   const handlePostClick = async (post) => {
//     try {
//       await increaseViewCount(post.tno);
//       // 조회수 증가를 UI에 즉시 반영
//       setServerData((prev) => ({
//         ...prev,
//         dtoList: prev.dtoList.map((item) =>
//           item.tno === post.tno
//             ? { ...item, viewCount: item.viewCount + 1 }
//             : item
//         ),
//       }));
//       moveToPost(post.tno);  // moveToRead 호출로 포스트 페이지로 이동
//     } catch (error) {
//       moveToPost(post.tno);  // 오류 발생 시에도 이동
//     }
//   };

//   const handleDeletePost = (postId) => {
//     setPostToDelete(postId);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDeletePost = () => {
//     setServerData((prevData) => ({
//       ...prevData,
//       dtoList: prevData.dtoList.filter((post) => post.tno !== postToDelete),
//     }));
//     setIsDeleteModalOpen(false);
//     setPostToDelete(null);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setPostToDelete(null);
//   };

//   return (
//     <div className="flex">
//       <div className="w-full flex">
//         {/* 좌측 메뉴 */}
//         <div className="w-1/3 p-6 border-r">
//           <div className="menu-item">
//             <Link to="/mypage" className="block text-xl text-gray-600 mb-4 border-b">
//               찜한 상품
//             </Link>
//             <Link to="/mypage/payment/history" className="block text-xl text-gray-600 mb-4 border-b">
//               구매내역
//             </Link>
//             <Link to="/mypage/posts" className="block text-xl text-gray-600 border-b">
//               내가 쓴 글
//             </Link>
//           </div>
//         </div>

//         {/* 메인 콘텐츠 */}
//         <div className="w-2/3 p-6">
//           <div className="flex items-center mb-4">
//             <h2 className="text-2xl font-semibold mb-2">내가 쓴 글 목록</h2>
//             <button
//               onClick={() => navigate("/community/add")}
//               className="bg-blue-500 text-white ml-[335px] px-4 py-2 rounded-md"
//             >
//               글 추가
//             </button>
//           </div>

//           <div className="post-list w-2/3 space-y-4">
//             {/* 내가 쓴 글 목록 출력 */}
//             {fetching ? (
//               <FetchingModal />
//             ) : (
//               serverData.dtoList.length > 0 ? (
//                 serverData.dtoList.map((post) => (
//                   <div key={post.tno} className="post-item flex justify-between items-center mb-4 p-4 border rounded-md">
//                     <div className="flex items-center">
//                       <div
//                         onClick={() => handlePostClick(post)}  // 글 클릭 시 포스트 페이지로 이동
//                         className="text-lg font-semibold text-black cursor-pointer"
//                       >
//                         {post.communityTitle}
//                       </div>
//                       <Link to={`/community/read/${post.tno}#comments`} className="text-blue-600 ml-4">
//                         댓글
//                       </Link>
//                     </div>
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => handleDeletePost(post.tno)}  // 삭제할 글의 ID 전달
//                         className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
//                       >
//                         삭제
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="w-full text-center p-4 text-gray-500">게시글이 없습니다.</div>
//               )
//             )}
//           </div>

//           {/* 페이지 컴포넌트 */}
//           <PageComponent serverData={serverData}  movePage={moveToPostList}  // 페이지 변경 함수로 수정
//           />
//         </div>
//       </div>

//       {/* 삭제 모달 */}
//       {isDeleteModalOpen && (
//         <DeleteModal
//           showModal={isDeleteModalOpen}
//           onClose={closeDeleteModal}
//           onDelete={confirmDeletePost}
//         />
//       )}
//     </div>
//   );
// };

// export default PostsPage;


import { useEffect, useState } from "react";
import { getCommunityList, increaseViewCount } from "../../api/communityApi";
import { Link, useNavigate } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove"; // 커스텀 훅 사용
import FetchingModal from "../common/FetchingModal";
import PageComponent from "../common/PageComponent";
import DeleteModal from "../common/DeleteModal";
import { jwtDecode } from 'jwt-decode';
import { API_SERVER_HOST } from "../../api/todoApi";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const host = API_SERVER_HOST;

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

const isPostAuthor = (post) => {
  try {
    const loggedInEmail = getEmailFromToken();
    return loggedInEmail && loggedInEmail === post.email; // 게시글 작성자 이메일과 비교
  } catch (error) {
    console.error('작성자 확인 중 오류:', error);
    return false;
  }
};

const PostsPage = () => {
  const navigate = useNavigate();
  const { page, size, refresh, moveToPost, moveToPostList, moveToComment } = useCustomMove(); // moveToElement 가져오기
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    setFetching(true);
    getCommunityList({ page, size })
      .then((data) => {
        setServerData(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [page, size]);

  const handlePostClick = async (post) => {
    try {
      await increaseViewCount(post.tno);
      setServerData((prev) => ({
        ...prev,
        dtoList: prev.dtoList.map((item) =>
          item.tno === post.tno
            ? { ...item, viewCount: item.viewCount + 1 }
            : item
        ),
      }));
      moveToPost(post.tno); // 포스트 페이지로 이동
    } catch (error) {
      moveToPost(post.tno); // 오류 발생 시에도 이동
    }
  };

  const handleClickComment = (tno) => {
    moveToPost(tno); // 게시글 상세 페이지로 이동
    // 페이지 이동 후 댓글 섹션으로 부드럽게 스크롤
    setTimeout(() => {
      moveToComment(tno); // 댓글 섹션으로 부드럽게 스크롤
      console.log("tno:", tno);
    }, 200); // 페이지 이동 후 약간의 지연
  };

  const handleClickDelete = (postId) => {
    setFetching(true);
    fetch(`${host}/api/community/${postId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setServerData((prevData) => ({
          ...prevData,
          dtoList: prevData.dtoList.filter((post) => post.tno !== postId),
        }));
        setIsDeleteModalOpen(false);
        setPostToDelete(null);
        setFetching(false);
        navigate("/mypage/posts");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        setFetching(false);
      });
  };

  const handleDeletePost = (postId) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto p-6">
        {/* 왼쪽 메뉴 */}
        <div className="w-full lg:w-1/4 bg-luxury-lightOlive p-4 rounded-lg shadow-md">
          <nav className="space-y-4">
            <Link
              to="/mypage"
              className="block text-lg font-semibold text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b pb-2"
            >
              찜한 상품
            </Link>
            <Link
              to="/mypage/payment/history"
              className="block text-lg font-semibold text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b pb-2"
            >
              구매내역
            </Link>
            <Link
              to="/mypage/posts"
              className="block text-lg font-semibold text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b pb-2"
            >
              내가 쓴 글
            </Link>
            <Link
              to="/mypage/modify"
              className="block text-lg font-semibold text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b pb-2"
            >
              개인 정보 수정
            </Link>
          </nav>
        </div>
  
        {/* 오른쪽 콘텐츠 */}
        <div className="w-full lg:w-3/4 p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-2xl font-semibold whitespace-nowrap">내가 쓴 글 목록</h2>
            <button
              onClick={() => navigate("/community/add")}
              className="bg-luxury-lightOlive text-gray-600 font-bold hover:bg-luxury-darkerOlive px-4 py-2 rounded-md"
            >
              글 추가
            </button>
          </div>
  
          {/* 게시글 리스트 */}
          <div className="post-list space-y-4">
            {fetching ? (
              <FetchingModal />
            ) : serverData.dtoList.length > 0 ? (
              serverData.dtoList
                .filter((post) => isPostAuthor(post)) // 작성자만 필터링
                .map((post) => (
                  <div
                    key={post.tno}
                    className="post-item flex justify-between items-center mb-4 p-4 border rounded-md"
                  >
                    <div className="flex items-center flex-wrap min-w-0">
                      <div
                        onClick={() => handlePostClick(post)}
                        className="text-lg font-semibold text-black cursor-pointer truncate hover:text-luxury-beige"
                      >
                        {post.communityTitle}
                      </div>
                      <div
                        onClick={() => handleClickComment(post.tno)}
                        className="text-blue-600 ml-4 cursor-pointer"
                      >
                        댓글
                      </div>
                    </div>
                    <div className="ml-auto">
                      <button
                        onClick={() => handleDeletePost(post.tno)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="w-full text-center p-4 text-gray-500">게시글이 없습니다.</div>
            )}
          </div>
  
          {/* 페이지네이션 */}
          <div className="flex items-center justify-center">
            <PageComponent serverData={serverData} movePage={moveToPostList} />
          </div>
        </div>
      </div>
  
      {isDeleteModalOpen && (
        <DeleteModal
          showModal={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={() => handleClickDelete(postToDelete)}
        />
      )}
    </div>
  );
  
};

export default PostsPage;

{/* <div>
      <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto p-6">
        {/* 왼쪽 메뉴 */}
      //         <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
      //           <nav className="space-y-4">
      //             <Link
      //               to="/mypage"
      //               className="block text-lg font-semibold text-gray-700 hover:text-gray-900 border-b pb-2"
      //             >
      //               찜한 상품
      //             </Link>
      //             <Link
      //               to="/mypage/payment/history"
      //               className="block text-lg font-semibold text-gray-700 hover:text-gray-900 border-b pb-2"
      //             >
      //               구매내역
      //             </Link>
      //             <Link
      //               to="/mypage/posts"
      //               className="block text-lg font-semibold text-gray-700 hover:text-gray-900 border-b pb-2"
      //             >
      //               내가 쓴 글
      //             </Link>
      //             <Link
      //                to="/mypage/modify"
      //               className="block text-lg font-semibold text-gray-700 hover:text-gray-900 border-b pb-2"
      //             >
      //               개인 정보 수정
      //             </Link>
      //           </nav>
      //         </div>

      //   <div className="w-2/3 p-6">
      //     <div className="flex items-center mb-4">
      //       <h2 className="text-2xl font-semibold mb-2">내가 쓴 글 목록</h2>
      //       <button
      //         onClick={() => navigate("/community/add")}
      //         className="bg-blue-500 text-white ml-[335px] px-4 py-2 rounded-md"
      //       >
      //         글 추가
      //       </button>
      //     </div>

      //     <div className="post-list w-2/3 space-y-4">
      //       {fetching ? (
      //         <FetchingModal />
      //       ) : (
      //         serverData.dtoList.length > 0 ? (
      //           serverData.dtoList
      //             .filter((post) => isPostAuthor(post)) // 작성자만 필터링
      //             .map((post) => (
      //               <div key={post.tno} className="post-item flex justify-between items-center mb-4 p-4 border rounded-md">
      //                 <div className="flex items-center">
      //                   <div
      //                     onClick={() => handlePostClick(post)}
      //                     className="text-lg font-semibold text-black cursor-pointer"
      //                   >
      //                     {post.communityTitle}
      //                   </div>
      //                 </div>
      //                 <div className="flex items-center">
      //                   <button
      //                     onClick={() => handleDeletePost(post.tno)}
      //                     className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
      //                   >
      //                     삭제
      //                   </button>
      //                 </div>

      //                  {/* 댓글 섹션 */}
      //                 <div id={`comment-${post.tno}`} className="mt-8"></div>

      //               </div>
      //             ))
      //         ) : (
      //           <div className="w-full text-center p-4 text-gray-500">게시글이 없습니다.</div>
      //         )
      //       )}
      //     </div>


      //     <PageComponent serverData={serverData} movePage={moveToPostList} />
      //   </div>
      // </div>

      // {isDeleteModalOpen && (
      //   <DeleteModal
      //     showModal={isDeleteModalOpen}
      //     onClose={closeDeleteModal}
      //     onDelete={() => handleClickDelete(postToDelete)}
      //   />
      // )}
    // </div> */}