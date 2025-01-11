import React from "react";

const AddModal = ({ showModal, onClose, onConfirm  }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">장바구니에 담으시겠습니까?</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            취소
          </button>
          <button
            onClick={onConfirm}  // onConfirm 실행되면 confirmAddToCart가 호출되어 카트에 담긴다.
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            담기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
