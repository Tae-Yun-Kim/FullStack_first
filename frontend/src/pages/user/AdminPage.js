import React, { useEffect, useState } from "react";
import { fetchCancelRequests, handleApproval } from "../../api/paymentApi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MealkitRegisterPage from "../foodpages/MealkitRegisterPage";

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cancelRequests, setCancelRequests] = useState([]);
  const navigate = useNavigate();
  const user = useAuth();

  // ADMIN 권한 확인
  useEffect(() => {
    if (!user?.roleNames === "ADMIN") {
      alert("관리자 권한이 필요합니다.");
      navigate("/"); // 메인 페이지로 리다이렉트
    }
  }, [user, navigate]);

  useEffect(() => {
    setIsLoading(true);
    fetchCancelRequests()
      .then(data => {
        console.log("받은 취소 요청 데이터:", data);
        setCancelRequests(data);
      })
      .catch((error) => {
        console.error("취소 요청 가져오기 실패:", error);
        alert("취소 요청 데이터를 불러오는데 문제가 발생했습니다.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const approveRequest = async (impUid) => {
    try {
      if (window.confirm('이 결제를 취소 승인하시겠습니까?')) {
        await handleApproval(impUid, true);
        alert("결제 취소가 승인되었습니다.");
        // 목록 새로고침
        const updatedRequests = await fetchCancelRequests();
        setCancelRequests(updatedRequests);
      }
    } catch (error) {
      alert("오류 발생: " + (error.response?.data || error.message));
      console.error(error);
    }
  };

  const rejectRequest = async (impUid) => {
    try {
      if (window.confirm('이 결제 취소 요청을 거부하시겠습니까?')) {
        await handleApproval(impUid, false);
        alert("결제 취소 요청이 거부되었습니다.");
        // 목록 새로고침
        const updatedRequests = await fetchCancelRequests();
        setCancelRequests(updatedRequests);
      }
    } catch (error) {
      alert("오류 발생: " + (error.response?.data || error.message));
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="p-4">로딩 중...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>

      {/* 결제 취소 요청 관리 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">결제 취소 요청 관리</h2>
        {cancelRequests.length === 0 ? (
          <p>처리할 결제 취소 요청이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {cancelRequests.map((request) => (
              <li key={request.impUid} className="border p-4 rounded">
                <p>결제 ID: {request.impUid}</p>
                <p>결제 금액: {request.amount?.toLocaleString()}원</p>
                <p>사용자 이메일: {request.member?.email}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => approveRequest(request.impUid)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => rejectRequest(request.impUid)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    거부
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 밀키트 등록 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">밀키트 등록</h2>
        <MealkitRegisterPage /> {/* 밀키트 등록 컴포넌트 추가 */}
      </section>
    </div>
  );
};

export default AdminPage;
