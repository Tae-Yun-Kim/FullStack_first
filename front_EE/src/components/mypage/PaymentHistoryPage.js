// import React, { useEffect, useState } from 'react';
// import { cancelPayment, fetchPaymentHistory, requestCancelPayment } from '../../api/paymentApi';
// import { Link } from 'react-router-dom';

// const PaymentHistoryPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//       const loadPayments = async () => {
//           try {
//               setLoading(true);
//               const data = await fetchPaymentHistory();
//               setPayments(data);
//           } catch (err) {
//               setError(err.message);
//           } finally {
//               setLoading(false);
//           }
//       };

//       loadPayments();
//   }, []);

//   const handleCancel = async (impUid) => {
//     try {
//       await requestCancelPayment(impUid); // 취소 요청
//       alert("결제 취소 요청이 성공적으로 접수되었습니다.");
//       setPayments((prev) =>
//         prev.map((payment) =>
//           payment.impUid === impUid ? { ...payment, status: "REFUND_REQUESTED" } : payment
//         )
//       );
//     } catch (err) {
//       alert("결제 취소 요청 중 오류가 발생했습니다.");
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="flex">
//       <div className="w-full flex">
//     {/* 좌측 메뉴 */}
//     <div className="w-1/3 p-6 border-r">
//     <div className="menu-item">
//       <Link to="/mypage" className="block text-xl text-gray-600 mb-4 border-b">
//         찜한 상품
//       </Link>
//       <Link to="/mypage/payment/history" className="block text-xl text-gray-600 mb-4 border-b">
//         구매내역
//       </Link>
//       <Link to="/mypage/posts" className="block text-xl text-gray-600 border-b">
//         내가 쓴 글
//       </Link>
//     </div>
//   </div>
//       <div>
//           <h2>결제 내역</h2>
//           {payments.length === 0 ? (
//               <p>결제 내역이 없습니다.</p>
//           ) : (
//               <ul>
//                   {payments.map((payment) => (
//                       <li key={payment.impUid}>
//                           <p>결제 금액: {payment.amount}원</p>
//                           <p>결제 상태: {payment.status}</p>
//                           <p>결제 날짜: {new Date(payment.paymentDate).toLocaleString()}</p>
//                           <button onClick={() => handleCancel(payment.impUid)}>결제 취소</button>
//                       </li>
//                   ))}
//               </ul>
//           )}
//       </div>
//       </div>
//   </div>
//   );
// };

// export default PaymentHistoryPage;

import React, { useEffect, useState } from "react";
import { cancelPayment, fetchPaymentHistory, requestCancelPayment } from "../../api/paymentApi";
import { Link } from "react-router-dom";

const PaymentHistoryPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);
        const data = await fetchPaymentHistory();
        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  const handleCancel = async (impUid) => {
    try {
      await requestCancelPayment(impUid); // 취소 요청
      alert("결제 취소 요청이 성공적으로 접수되었습니다.");
      setPayments((prev) =>
        prev.map((payment) =>
          payment.impUid === impUid ? { ...payment, status: "REFUND_REQUESTED" } : payment
        )
      );
    } catch (err) {
      alert("결제 취소 요청 중 오류가 발생했습니다.");
    }
  };

  // 결제 상태를 한글로 변환
  const translateStatus = (status) => {
    switch (status) {
      case "SUCCESS":
        return "결제 성공";
      case "REFUNDED":
        return "환불 완료";
      case "REFUND_REQUESTED":
        return "환불 요청됨";
      default:
        return "알 수 없음";
    }
  };

  if (loading) return <div className="text-center mt-8 text-gray-600">로딩 중...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">오류: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto p-6">
      {/* 왼쪽 메뉴 */}
      <div className="w-full lg:w-1/4 bg-luxury-lightOlive p-4 rounded-lg shadow-md">
        <nav className="space-y-4">
          <Link
            to="/mypage"
            className="block text-lg font-semibold text-gray-700 hover:luxury-lightOlive hover:text-white rounded border-b pb-2"
          >
            찜한 상품
          </Link>
          <Link
            to="/mypage/payment/history"
            className="block text-lg font-semibold text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b pb-2"
          >
            결제 내역
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

      {/* 결제 내역 섹션 */}
      <div className="w-full lg:w-3/4 lg:ml-6 mt-6 lg:mt-0">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">결제 내역</h2>
        {payments.length === 0 ? (
          <p className="text-center text-gray-600">결제 내역이 없습니다.</p>
        ) : (
          <ul className="space-y-6">
            {payments.slice().reverse().map((payment) => (
              <li
                key={payment.impUid}
                className="p-4 bg-white rounded-lg shadow-md border hover:shadow-lg"
              >
                <p className="text-gray-800 font-medium">
                  결제 금액:{" "}
                  <span className="text-indigo-600 font-semibold">{payment.amount}원</span>
                </p>
                <p className="text-gray-800 font-medium">
                  결제 상태:{" "}
                  <span
                    className={`font-semibold ${
                      payment.status === "SUCCESS"
                        ? "text-green-600"
                        : payment.status === "REFUNDED"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {translateStatus(payment.status)}
                  </span>
                </p>
                <p className="text-gray-800 font-medium">
                  결제 날짜:{" "}
                  <span className="text-gray-600">{new Date(payment.paymentDate).toLocaleString()}</span>
                </p>
                {/* 환불 상태가 아닌 경우에만 결제 취소 버튼 표시 */}
                {payment.status !== "REFUNDED" && (
                  <button
                    onClick={() => handleCancel(payment.impUid)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    결제 취소
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
