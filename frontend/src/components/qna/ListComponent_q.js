import { useEffect, useState } from 'react';
import { getQnAList } from '../../api/qnaApi';
import useCustomMove from '../../hooks/useCustomMove';
import FetchingModal from '../common/FetchingModal';
import PageComponent from '../common/PageComponent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { IoIosArrowDown } from "react-icons/io";

const faqList = [
    { qno: -1, qnaTitle: '밀키트 배송은 얼마나 걸리나요?', email: '관리자', answer: '주문 후 평균적으로 2~3일 내에 배송됩니다.', isSecret: false },
    { qno: -2, qnaTitle: '밀키트 유통기한은 얼마나 되나요?', email: '관리자', answer: '밀키트는 제조일로부터 보통 5~7일입니다. 개별 제품의 라벨을 확인하세요.', isSecret: false },
    { qno: -3, qnaTitle: '밀키트는 냉동 보관이 가능한가요?', email: '관리자', answer: '냉동 보관이 가능한 제품은 별도로 표시되어 있습니다.', isSecret: false },
    { qno: -4, qnaTitle: '재료가 손상되었거나 부족한 경우 어떻게 하나요?', nickname: '관리자', answer: '고객센터로 연락 주시면 신속히 처리해드리겠습니다.', isSecret: false },
    { qno: -5, qnaTitle: '밀키트는 몇 인분인가요?', email: '관리자', answer: '대부분의 밀키트는 2~4인분 기준으로 제공됩니다.', isSecret: false },
    { qno: -6, qnaTitle: '밀키트는 어떻게 조리하나요?', email: '관리자', answer: '간단한 조리법이 포함되어 있으며, 자세한 내용은 제품 설명서를 참조하세요.', isSecret: false },
    { qno: -7, qnaTitle: '알레르기 성분이 포함되어 있나요?', email: '관리자', answer: '제품 상세 페이지에서 알레르기 정보를 확인할 수 있습니다.', isSecret: false },
    { qno: -8, qnaTitle: '구독 서비스가 있나요?', email: '관리자', answer: '네, 정기 구독 서비스를 통해 매주 신선한 밀키트를 받을 수 있습니다.', isSecret: false },
    { qno: -9, qnaTitle: '취소 및 환불 정책은 어떻게 되나요?', email: '관리자', answer: '배송 전에는 취소가 가능하며, 배송 후 환불은 불가합니다.', isSecret: false },
    { qno: -10, qnaTitle: '다른 나라로 배송이 가능한가요?', email: '관리자', answer: '현재는 국내 배송만 가능합니다.', isSecret: false },
];

const ListComponent_q = ({searchTerm}) => {
    const { page, size, refresh, moveToList } = useCustomMove();
    const [serverData, setServerData] = useState({
        dtoList: [],
        pageNumList: [],
        pageRequestDTO: null,
        prev: false,
        next: false,
        totalCount: 0,
        prevPage: 0,
        nextPage: 0,
        totalPage: 1,
        current: 1,
    });
    const [filteredData, setFilteredData] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const navigate = useNavigate();
    // const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
    const ITEMS_PER_PAGE = 20;
    const user = useAuth() || {}; // 사용자 인증 정보 가져오기
    const memberRole = user.roleNames || []; // ADMIN 권한 확인
    const memberEmail = user.email || [];

    const handleQnaClick = (qna) => {
        // FAQ 항목인지 확인
        const isFaq = faqList.some((faq) => faq.qno === qna.qno);

        if (isFaq) {
        // FAQ 항목은 펼치기/닫기 동작 처리
        setActiveQuestion(activeQuestion === qna.qno ? null : qna.qno);
        return;
         }

         if (qna.isSecret && memberEmail !== qna.email && memberRole !== "ADMIN" ) {
            console.log(memberEmail);
            alert("작성하신 회원이 아닙니다.");
            setTimeout(() => {
                navigate('/qna/list');
            }, 0); // 0ms 딜레이
        }

        navigate(`/qna/read/${qna.qno}`);
    };

    useEffect(() => {
        setFetching(true);
        getQnAList({ page, size: ITEMS_PER_PAGE - faqList.length })
            .then((data) => {
                // FAQ와 서버에서 가져온 QnA 데이터를 결합
                const combinedData = [
                    ...faqList.map((faq) => ({ ...faq, isFaq: true })), // FAQ 표시 추가
                    ...(data?.dtoList || []).map((qna) => ({ ...qna, isFaq: false })), // QnA 표시 추가
                ];
                setServerData({
                    ...data,
                    dtoList: combinedData,
                    pageNumList: data?.pageNumList || [],
                });
            })
            .catch((error) => {
                console.error('Error fetching QnA list:', error);
                setServerData({
                    dtoList: faqList,
                    pageNumList: [],
                    totalCount: faqList.length,
                });
            })
            .finally(() => {
                setFetching(false);
            });
    }, [page, refresh]);


//     return (
//         <div className="border-2 border-blue-100 mt-10 mx-2 ">
//             {fetching && <FetchingModal />}
    
//             <div>
//                 {serverData.dtoList.length > 0 ? (
//                     <ul className="divide-y divide-gray-200">
//                         {serverData.dtoList.map((qna) => (
//                             <li
//                             key={qna.qno}
//                             className={`py-2 px-4 flex justify-between items-center cursor-pointer ${
//                                 faqList.some((faq) => faq.qno === qna.qno)
//                                     ? "bg-blue-50" // FAQ 항목의 배경색
//                                     : "bg-white"
//                             }`}
//                             onClick={() => handleQnaClick(qna)}
//                             >
//                                 <div>
//                                     <h3 className="font-extrabold text-lg text-gray-800">
//                                         {qna.isSecret && !qna.isFaq && memberEmail !== qna.email
//                                             ? '비밀글입니다'
//                                             : qna.qnaTitle}
//                                     </h3>
//                                     <p className="text-sm text-gray-500">
//                                         작성자: {qna.isFaq ? '관리자' : qna.email || '알 수 없음'}
//                                     </p>
//                                 </div>
//                                 {activeQuestion === qna.qno && qna.answer && (
//                                     <div className="text-gray-700 ml-4">{qna.answer}</div>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <div className="w-full text-center p-4 text-gray-500">
//                         QnA 목록이 없습니다.
//                     </div>
//                 )}
//             </div>
//             <PageComponent serverData={serverData} movePage={moveToList} />
//         </div>
//     );
    
// };
// export default ListComponent_q;

// import { useEffect, useState } from 'react';
// import { getQnAList } from '../../api/qnaApi';
// import useCustomMove from '../../hooks/useCustomMove';
// import FetchingModal from '../common/FetchingModal';
// import PageComponent from '../common/PageComponent';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { IoIosArrowDown } from "react-icons/io";

// const faqList = [
//     { qno: -1, qnaTitle: '밀키트 배송은 얼마나 걸리나요?', email: '관리자', answer: '주문 후 평균적으로 2~3일 내에 배송됩니다.', isSecret: false },
//     { qno: -2, qnaTitle: '밀키트 유통기한은 얼마나 되나요?', email: '관리자', answer: '밀키트는 제조일로부터 보통 5~7일입니다. 개별 제품의 라벨을 확인하세요.', isSecret: false },
//     { qno: -3, qnaTitle: '밀키트는 냉동 보관이 가능한가요?', email: '관리자', answer: '냉동 보관이 가능한 제품은 별도로 표시되어 있습니다.', isSecret: false },
//     { qno: -4, qnaTitle: '재료가 손상되었거나 부족한 경우 어떻게 하나요?', nickname: '관리자', answer: '고객센터로 연락 주시면 신속히 처리해드리겠습니다.', isSecret: false },
//     { qno: -5, qnaTitle: '밀키트는 몇 인분인가요?', email: '관리자', answer: '대부분의 밀키트는 2~4인분 기준으로 제공됩니다.', isSecret: false },
//     { qno: -6, qnaTitle: '밀키트는 어떻게 조리하나요?', email: '관리자', answer: '간단한 조리법이 포함되어 있으며, 자세한 내용은 제품 설명서를 참조하세요.', isSecret: false },
//     { qno: -7, qnaTitle: '알레르기 성분이 포함되어 있나요?', email: '관리자', answer: '제품 상세 페이지에서 알레르기 정보를 확인할 수 있습니다.', isSecret: false },
//     { qno: -8, qnaTitle: '구독 서비스가 있나요?', email: '관리자', answer: '네, 정기 구독 서비스를 통해 매주 신선한 밀키트를 받을 수 있습니다.', isSecret: false },
//     { qno: -9, qnaTitle: '취소 및 환불 정책은 어떻게 되나요?', email: '관리자', answer: '배송 전에는 취소가 가능하며, 배송 후 환불은 불가합니다.', isSecret: false },
//     { qno: -10, qnaTitle: '다른 나라로 배송이 가능한가요?', email: '관리자', answer: '현재는 국내 배송만 가능합니다.', isSecret: false },
// ];

// const ListComponent_q = ({ searchTerm }) => {
//     const { page, size, refresh, moveToList } = useCustomMove();
//     const [serverData, setServerData] = useState({
//         dtoList: [],
//         pageNumList: [],
//         totalCount: 0,
//     });
//     const [filteredData, setFilteredData] = useState([]);
//     const [fetching, setFetching] = useState(false);
//     const [activeQuestion, setActiveQuestion] = useState(null);
//     const navigate = useNavigate();
//     const memberEmail = useSelector((state) => state.auth?.email);

//     const handleQnaClick = (qna) => {
//         if (qna.isFaq) {
//             if (activeQuestion === qna.qno) {
//                 setActiveQuestion(null);
//             } else {
//                 setActiveQuestion(qna.qno);
//             }
//         } else {
//             navigate(`/qna/read/${qna.qno}`);
//         }
//     };

    const handlePageChange = (newPage) => {
        moveToList({ page: newPage });
    };

//     useEffect(() => {
//         setFetching(true);
//         getQnAList({ page, size })
//             .then((data) => {
//                 const combinedData = [
//                     ...faqList.map((faq) => ({ ...faq, isFaq: true })),
//                     ...(data?.dtoList || []).map((qna) => ({ ...qna, isFaq: false })),
//                 ];
//                 setServerData({
//                     ...data,
//                     dtoList: combinedData,
//                 });
//                 setFilteredData(combinedData);
//             })
//             .catch(() => {
//                 setServerData({
//                     dtoList: faqList,
//                     pageNumList: [],
//                     totalCount: faqList.length,
//                 });
//                 setFilteredData(faqList);
//             })
//             .finally(() => {
//                 setFetching(false);
//             });
//     }, [page, refresh]);

    useEffect(() => {
        const filtered = serverData.dtoList.filter((qna) =>
            qna.qnaTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, serverData.dtoList]);

    return (
        <div className="mt-10 mx-4 bg-white">
            {fetching && <FetchingModal />}

            <div className="border-t-2 border-b-2 border-gray-700">
                {filteredData.length > 0 ? (
                    <div className="divide-y divide-gray-300">
                        {filteredData.map((qna, index) => (
                            <div key={qna.qno}>
                                <div
                                    className={`py-4 flex items-center cursor-pointer ${
                                        index === 0 ? "border-t-0" : ""
                                    }`}
                                    onClick={() => handleQnaClick(qna)}
                                >
                                    <div className="flex items-start space-x-4 pl-8">
                                        {qna.isFaq ? (
                                            <span className="text-gray-700 font-bold uppercase">
                                                TOP
                                            </span>
                                        ) : (
                                            <div className="text-gray-500 font-semibold">
                                                {qna.qno}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 text-gray-800 font-medium pl-16">
                                        {qna.qnaTitle}
                                    </div>

                                    {qna.isFaq && (
                                        <IoIosArrowDown
                                            className={`text-gray-400 hover:text-gray-700 transform transition-transform ${
                                                activeQuestion === qna.qno ? "rotate-180" : ""
                                            }`}
                                            size={20}
                                        />
                                    )}
                                </div>

                                {qna.isFaq && activeQuestion === qna.qno && (
                                    <div className="mt-8 mb-20 text-gray-700 text-center">
                                        {qna.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
                )}
            </div>

   {/* 페이지네이션 */}
<div className="m-6 flex justify-center">
    {/* Prev 버튼 */}
    {serverData.prev && (
        <button
            className="m-2 px-4 py-2 text-black bg-luxury-lightOlive hover:bg-luxury-deepOlive rounded"
            onClick={() => handlePageChange(serverData.prevPage)}
        >
            Prev
        </button>
    )}
    {/* 페이지 번호 버튼 */}
{serverData.pageNumList.map((pageNum) => (
    <button
        key={pageNum}
        className={`m-2 px-4 py-2 rounded ${
            serverData.current === pageNum
                ? "bg-luxury-deepOlive text-white" // 현재 페이지
                : "bg-luxury-lightOlive text-black hover:bg-luxury-deepOlive hover:text-white"
        }`}
        onClick={() => handlePageChange(pageNum)}
    >
        {pageNum}
    </button>
))}


    {/* Next 버튼 */}
    {serverData.next && (
        <button
            className="m-2 px-4 py-2 text-black bg-luxury-lightOlive hover:bg-luxury-deepOlive rounded"
            onClick={() => handlePageChange(serverData.nextPage)}
        >
            Next
        </button>
    )}
</div>


        </div>
    );
};

export default ListComponent_q;