import { useEffect, useState } from 'react';
import { getQnAList } from '../../api/qnaApi';
import FetchingModal from '../../components/common/FetchingModal';
import PageComponent from '../../components/common/PageComponent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OneToOneInquiryPage = () => {
  const [serverData, setServerData] = useState({
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    totalPage: 1,
    current: 1,
  });
  const [fetching, setFetching] = useState(false);
  const ITEMS_PER_PAGE = 10;
  const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일

  const navigate = useNavigate();
//   const userEmail = JSON.parse(localStorage.getItem('member'))?.email || null;

  // 로그인하지 않은 경우
    useEffect(() => {
      if (!memberEmail) {
        alert("로그인이 필요합니다.");
        navigate("/user/login");
      }
    }, [memberEmail, navigate]);

    useEffect(() => {
    setFetching(true);
    getQnAList({ page: serverData.current, size: ITEMS_PER_PAGE })
      .then((data) => {
        if (!data || !data.dtoList) {
          throw new Error('서버에서 데이터를 받을 수 없습니다.');
        }

        console.log('Fetched data:', data); // 서버 응답 디버깅

        const userInquiries = data.dtoList.filter((qna) => qna.email === memberEmail);
        console.log('Filtered inquiries by user email:', userInquiries); // 필터링 결과 디버깅

        setServerData({
          ...data,
          dtoList: userInquiries,
          current: data.pageRequestDTO?.page || 1,
          totalPage: Math.max(1, Math.ceil(data.totalCount / ITEMS_PER_PAGE)),
          prev: data.prev || false,
          next: data.next || false,
        });
      })
      .catch((error) => {
        console.error('Error fetching inquiries:', error);
        alert(error.message || '문의글을 불러오는 중 오류가 발생했습니다.');
      })
      .finally(() => {
        console.log('API 호출 종료');
        setFetching(false);
      });
  }, [memberEmail, serverData.current, navigate]);

  const handlePageChange = (page) => {
    console.log('페이지 변경 요청:', page);
    setServerData((prev) => ({ ...prev, current: page }));
  };

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold mb-4">1:1 문의</div>
      {fetching ? (
        <FetchingModal />
      ) : serverData.dtoList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {serverData.dtoList.map((inquiry) => (
            <div
              key={inquiry.qno}
              className="p-4 border rounded shadow-md bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/qna/read/${inquiry.qno}`)}
            >
              <h3 className="text-xl font-bold">{inquiry.qnaTitle}</h3>
              {/* 작성자 정보 표시 */}
              <p className="text-sm text-gray-500">작성자: {inquiry.email || '알 수 없음'}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">문의글이 없습니다.</div>
      )}
      <PageComponent serverData={serverData} movePage={handlePageChange} />
    </div>
  );
};

export default OneToOneInquiryPage;

// import { useEffect, useState } from 'react';
// import { getQnAList } from '../../api/qnaApi';
// import FetchingModal from '../../components/common/FetchingModal';
// import PageComponent from '../../components/common/PageComponent';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const OneToOneInquiryPage = () => {
//   const [serverData, setServerData] = useState({
//     dtoList: [],
//     pageNumList: [],
//     pageRequestDTO: null,
//     prev: false,
//     next: false,
//     totalCount: 0,
//     totalPage: 1,
//     current: 1,
//   });
//   const [fetching, setFetching] = useState(false);
//   const ITEMS_PER_PAGE = 10;
//   const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
//   const adminEmail = "admin@example.com"; // 관리자 이메일 하드코딩 (또는 상태 관리 필요)

//   const navigate = useNavigate();

//   // 로그인하지 않은 경우
//   useEffect(() => {
//     if (!memberEmail) {
//       alert("로그인이 필요합니다.");
//       navigate("/user/login");
//     }
//   }, [memberEmail, navigate]);

//   useEffect(() => {
//     setFetching(true);
//     getQnAList({ page: serverData.current, size: ITEMS_PER_PAGE })
//       .then((data) => {
//         if (!data || !data.dtoList) {
//           throw new Error('서버에서 데이터를 받을 수 없습니다.');
//         }

//         const userInquiries = data.dtoList.filter((qna) => qna.email === memberEmail);

//         setServerData({
//           ...data,
//           dtoList: userInquiries,
//           current: data.pageRequestDTO?.page || 1,
//           totalPage: Math.max(1, Math.ceil(data.totalCount / ITEMS_PER_PAGE)),
//           prev: data.prev || false,
//           next: data.next || false,
//         });
//       })
//       .catch((error) => {
//         console.error('Error fetching inquiries:', error);
//         alert(error.message || '문의글을 불러오는 중 오류가 발생했습니다.');
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   }, [memberEmail, serverData.current, navigate]);

//   const handlePageChange = (page) => {
//     setServerData((prev) => ({ ...prev, current: page }));
//   };

//   const handleAddComment = (qno, comment) => {
//     if (memberEmail !== adminEmail) {
//       alert("관리자만 댓글을 작성할 수 있습니다.");
//       return;
//     }

//     setServerData((prev) => {
//       const updatedList = prev.dtoList.map((item) => {
//         if (item.qno === qno) {
//           return { ...item, status: '답변완료', comment: comment || "관리자가 답변을 작성했습니다." };
//         }
//         return item;
//       });
//       return { ...prev, dtoList: updatedList };
//     });
//     alert('답변 상태가 변경되었습니다.');
//   };

//   return (
//     <div className="p-4 w-full bg-white">
//       <div className="text-3xl font-extrabold mb-6 py-4">1:1 문의</div>
//       <div className="border-t-2 border-b-2 border-gray-700 mb-6">
//         <div className="flex justify-between px-6 py-4 font-bold border-b border-gray-300">
//           <div className="flex-1">제목</div>
//           <div className="w-40 text-center">작성일</div>
//           <div className="w-40 text-center">답변상태</div>
//         </div>
//         {fetching ? (
//           <FetchingModal />
//         ) : serverData.dtoList.length > 0 ? (
//           <div>
//             {serverData.dtoList.map((inquiry, index) => (
//               <div key={inquiry.qno}>
//                 <div
//                   className="py-4 px-6 flex justify-between items-center cursor-pointer hover:bg-gray-50"
//                   onClick={() => navigate(`/qna/read/${inquiry.qno}`)}
//                 >
//                   <div className="flex-1 text-gray-800">{inquiry.qnaTitle}</div>
//                   <div className="w-40 text-center text-gray-500">{inquiry.date || "N/A"}</div>
//                   <div className="w-40 text-center text-gray-500">{inquiry.status || "답변대기"}</div>
//                   {memberEmail === adminEmail && (
//                     <div
//                       className="w-40 text-center text-blue-500 cursor-pointer hover:underline"
//                       onClick={(e) => {
//                         e.stopPropagation(); // 부모의 onClick 이벤트 방지
//                         const comment = prompt("답변 내용을 입력하세요:");
//                         if (comment) handleAddComment(inquiry.qno, comment);
//                       }}
//                     >
//                       답변 작성
//                     </div>
//                   )}
//                 </div>
//                 {index < serverData.dtoList.length - 1 && (
//                   <div className="border-t border-gray-300" />
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-500 py-10">문의글이 없습니다.</div>
//         )}
//       </div>
//       <PageComponent serverData={serverData} movePage={handlePageChange} />
//     </div>
//   );
// };

// export default OneToOneInquiryPage;

