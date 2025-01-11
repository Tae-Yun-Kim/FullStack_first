// import React, { useEffect, useState } from "react";
// import {
//     getQnaComments,
//     addQnaComment,
//     modifyQnaComment,
//     removeQnaComment,
// } from "../../api/qnaApi";
// import useAuth from "../../hooks/useAuth";

// const CommentComponent_q = ({ qno }) => {
//     const [comments, setComments] = useState([]); // 댓글 리스트 상태
//     const [newComment, setNewComment] = useState(""); // 새 댓글 상태
//     const [editComment, setEditComment] = useState(null); // 수정 중인 댓글 ID
//     const [editContent, setEditContent] = useState(""); // 수정 중인 댓글 내용
//     const [loading, setLoading] = useState(false); // 로딩 상태
//     const user = useAuth(); // 사용자 인증 정보 가져오기
//     const isAdmin = user?.roleNames === "ADMIN"; // ADMIN 권한 확인

//     console.log("현재 사용자 역할:", user?.roleNames);

//     // 댓글 목록 가져오기 (권한 필요 없음)
//     useEffect(() => {
//         const fetchComments = async () => {
//             setLoading(true);
//             try {
//                 const data = await getQnaComments(qno); // 서버에서 댓글 가져오기
//                 setComments(data); // 댓글 리스트 업데이트
//             } catch (error) {
//                 console.error("Error fetching comments:", error);
//             } finally {
//                 setLoading(false); // 로딩 상태 해제
//             }
//         };
//         fetchComments();
//     }, [qno]);

//     // 댓글 추가
//     const handleAddComment = async () => {
//         if (!newComment.trim()) {
//             alert("댓글 내용을 입력하세요.");
//             return;
//         }

//         try {
//             const data = await addQnaComment({
//                 qno, // QnA 게시글 번호
//                 qnaCommentContent: newComment, // 댓글 내용
//             });
//             setComments([...comments, data]); // 댓글 리스트 업데이트
//             setNewComment(""); // 입력 필드 초기화
//         } catch (error) {
//             console.error("댓글 추가 오류:", error);
//             alert("댓글 추가에 실패했습니다.");
//         }
//     };

//     // 댓글 수정
//     const handleModifyComment = async (qcno) => {
//         if (!editContent.trim()) {
//             alert("댓글 내용을 입력하세요.");
//             return;
//         }

//         try {
//             const updatedComment = await modifyQnaComment(qcno, {
//                 qnaCommentContent: editContent, // 수정된 댓글 내용
//             });
//             setComments(
//                 comments.map((comment) =>
//                     comment.qcno === qcno
//                         ? { ...comment, qnaCommentContent: updatedComment.qnaCommentContent }
//                         : comment
//                 )
//             );
//             setEditComment(null); // 수정 상태 해제
//             setEditContent(""); // 수정 필드 초기화
//         } catch (error) {
//             console.error("댓글 수정 오류:", error);
//             alert("댓글 수정에 실패했습니다.");
//         }
//     };

//     // 댓글 삭제
//     const handleDeleteComment = async (qcno) => {
//         if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

//         try {
//             await removeQnaComment(qcno); // 댓글 삭제 요청
//             setComments(comments.filter((comment) => comment.qcno !== qcno)); // 댓글 리스트 업데이트
//         } catch (error) {
//             console.error("댓글 삭제 오류:", error);
//             alert("댓글 삭제에 실패했습니다.");
//         }
//     };

//     return (
//         <div className="comment-section mt-8">
//     <h3 className="text-xl font-bold mb-4">댓글</h3>
//     {loading && <p className="text-gray-500">Loading...</p>}
//     <ul>
//         {comments.map((comment) => (
//             <li
//                 key={comment.qcno}
//                 className="mb-4 p-3 bg-gray-100 rounded relative"
//             >
//                 <p className="text-gray-800">{comment.qnaCommentContent}</p> {/* 댓글 내용 */}
//                 {isAdmin && (
//                     <div className="flex space-x-2 mt-2">
//                         <button
//                             onClick={() => {
//                                 setEditComment(comment.qcno);
//                                 setEditContent(comment.qnaCommentContent);
//                             }}
//                             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                         >
//                             수정
//                         </button>
//                         <button
//                             onClick={() => handleDeleteComment(comment.qcno)}
//                             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                         >
//                             삭제
//                         </button>
//                     </div>
//                 )}
//                 {editComment === comment.qcno && (
//                     <div className="edit-section mt-4">
//                         <textarea
//                             value={editContent}
//                             onChange={(e) => setEditContent(e.target.value)}
//                             className="w-full p-2 border rounded mb-2"
//                         ></textarea>
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 onClick={() => handleModifyComment(comment.qcno)}
//                                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                             >
//                                 저장
//                             </button>
//                             <button
//                                 onClick={() => setEditComment(null)}
//                                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                             >
//                                 취소
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </li>
//         ))}
//     </ul>
//     {isAdmin && (
//         <div className="add-comment mt-6">
//             <textarea
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="댓글을 입력하세요..."
//                 className="w-full p-2 border rounded mb-2"
//             ></textarea>
//             <button
//                 onClick={handleAddComment}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//                 댓글 추가
//             </button>
//         </div>
//     )}
// </div>
//     );
// };

// export default CommentComponent_q;

import React, { useEffect, useState } from "react";
import {
    getQnaComments,
    addQnaComment,
    modifyQnaComment,
    removeQnaComment,
} from "../../api/qnaApi";
import useAuth from "../../hooks/useAuth";

const CommentComponent_q = ({ qno }) => {
    const [comments, setComments] = useState([]); // 댓글 리스트 상태
    const [newComment, setNewComment] = useState(""); // 새 댓글 상태
    const [editComment, setEditComment] = useState(null); // 수정 중인 댓글 ID
    const [editContent, setEditContent] = useState(""); // 수정 중인 댓글 내용
    const [loading, setLoading] = useState(false); // 로딩 상태
    const user = useAuth(); // 사용자 인증 정보 가져오기
    const isAdmin = user?.roleNames === "ADMIN"; // ADMIN 권한 확인

    console.log("현재 사용자 역할:", user?.roleNames);

    // 댓글 목록 가져오기 (권한 필요 없음)
    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const data = await getQnaComments(qno); // 서버에서 댓글 가져오기
                setComments(data); // 댓글 리스트 업데이트
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };
        fetchComments();
    }, [qno]);

    // 댓글 추가
    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        try {
            const data = await addQnaComment({
                qno, // QnA 게시글 번호
                qnaCommentContent: newComment, // 댓글 내용
            });
            setComments([...comments, data]); // 댓글 리스트 업데이트
            setNewComment(""); // 입력 필드 초기화
        } catch (error) {
            console.error("댓글 추가 오류:", error);
            alert("댓글 추가에 실패했습니다.");
        }
    };

    // 댓글 수정
    const handleModifyComment = async (qcno) => {
        if (!editContent.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        try {
            const updatedComment = await modifyQnaComment(qcno, {
                qnaCommentContent: editContent, // 수정된 댓글 내용
            });
            setComments(
                comments.map((comment) =>
                    comment.qcno === qcno
                        ? { ...comment, qnaCommentContent: updatedComment.qnaCommentContent }
                        : comment
                )
            );
            setEditComment(null); // 수정 상태 해제
            setEditContent(""); // 수정 필드 초기화
        } catch (error) {
            console.error("댓글 수정 오류:", error);
            alert("댓글 수정에 실패했습니다.");
        }
    };

    // 댓글 삭제
    const handleDeleteComment = async (qcno) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

        try {
            await removeQnaComment(qcno); // 댓글 삭제 요청
            setComments(comments.filter((comment) => comment.qcno !== qcno)); // 댓글 리스트 업데이트
        } catch (error) {
            console.error("댓글 삭제 오류:", error);
            alert("댓글 삭제에 실패했습니다.");
        }
    };

    return (
        <div className="comment-section space-y-6 p-4 ml-1"> {/* 상하 간격 추가 */}
          <h3 className="text-lg font-bold">답변</h3> {/* 제목 간격 */}
          {loading && <p>Loading...</p>}
          <ul className="space-y-4"> {/* 댓글 리스트 간격 */}
            {comments.map((comment) => (
              <li key={comment.qcno} className="comment-item space-y-2"> {/* 댓글 내부 간격 */}
                <p>{comment.qnaCommentContent}</p> {/* 댓글 내용 표시 */}
                {isAdmin && (
                  <div className="space-x-2"> {/* 버튼 간격 */}
                    <button
                      onClick={() => {
                        setEditComment(comment.qcno);
                        setEditContent(comment.qnaCommentContent);
                      }}
                    >
                      수정
                    </button>
                    <button onClick={() => handleDeleteComment(comment.qcno)}>
                      삭제
                    </button>
                  </div>
                )}
                {editComment === comment.qcno && (
                  <div className="edit-section space-y-2"> {/* 수정 영역 간격 */}
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    ></textarea>
                    <div className="space-x-2"> {/* 저장/취소 버튼 간격 */}
                      <button onClick={() => handleModifyComment(comment.qcno)}>저장</button>
                      <button onClick={() => setEditComment(null)}>취소</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {/* 관리자만 댓글 추가 가능 */}
          {isAdmin && (
            <div className="add-comment space-y-2"> {/* 댓글 추가 영역 간격 */}
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="답변을 입력하세요..."
              ></textarea>
              <button onClick={handleAddComment}>답변 추가</button>
            </div>
          )}
        </div>
      );
      
};

export default CommentComponent_q;
