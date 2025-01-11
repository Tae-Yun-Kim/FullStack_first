import React, { useState, useEffect } from "react";
import { updateUserAddress } from "../../api/loginApi"; // 경로 수정

const AddressForm = ({ currentAddress, onAddressUpdated }) => {
  const [newAddress, setNewAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 부모 컴포넌트에서 전달받은 currentAddress를 상태로 설정
    if (currentAddress) {
      setNewAddress(currentAddress);
    }
  }, [currentAddress]);

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // 제출 중일 때는 클릭을 방지

    setIsSubmitting(true);
    setMessage(""); // 이전 메시지를 초기화

    try {
      const response = await updateUserAddress({ address: newAddress });
      if (response.success) {
        setMessage(response.message || "주소가 성공적으로 변경되었습니다.");
        onAddressUpdated(newAddress); // 부모 컴포넌트에 새로운 주소 전달
      } else {
        setMessage(response.message || "주소 업데이트 실패");
      }
    } catch (error) {
      setMessage("주소 업데이트 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white">
      <div className="flex items-center space-x-4">
        {/* 현재 주소 입력 필드 */}
        <input
          type="text"
          id="address"
          name="address"
          value={newAddress}
          onChange={handleAddressChange}
          required
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        
        {/* 변경 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-auto py-2 px-4 bg-gray-200 text-black rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "주소 변경 중..." : "변경"}
        </button>
      </div>

      {/* 메시지 표시 */}
      {message && <p className="mt-4 text-center text-sm text-gray-500">{message}</p>}
    </div>
  );
};

export default AddressForm;
