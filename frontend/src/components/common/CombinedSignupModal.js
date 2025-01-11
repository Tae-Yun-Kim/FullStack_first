import React from "react";

const CombinedSignupModal = ({ title, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        {/* 모달 제목 */}
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        {/* 모달 내용 */}
        <div className="overflow-y-auto max-h-96 text-gray-700 whitespace-pre-line text-sm">
          {title === "서비스 이용 약관" ? (
            <>
              <p className="font-bold text-lg mb-2">서비스 이용 약관</p>
              <p>
                제1조 [목적]
                <br />
                이 약관은 밀키트 쇼핑몰(이하 "사이트")에서 제공하는 전자상거래 관련 서비스를 이용함에 있어,
                회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
              <p>
                제2조 [정의]
                <br />
                1. "사이트"란 회사가 운영하는 온라인 플랫폼으로, 밀키트 상품 및 관련 서비스를 제공하는
                웹사이트 및 모바일 애플리케이션을 의미합니다.
                <br />
                2. "회원"이란 사이트에 회원 등록을 하고, 지속적으로 서비스를 이용할 수 있는 권한을 가진 자를 의미합니다.
                <br />
                3. "상품"이란 사이트에서 판매하는 밀키트, 재료 및 관련 상품을 의미합니다.
              </p>
              <p>
                제3조 [서비스의 제공 및 변경]
                <br />
                회사는 다음과 같은 서비스를 제공합니다:
                <br />
                - 밀키트 및 재료 판매 서비스
                <br />
                - 개인 레시피 저장 및 공유 서비스
                <br />
                - 찜 및 맞춤형 추천 기능
              </p>
              <p>
                제4조 [회원의 의무]
                <br />
                회원은 다음과 같은 의무를 준수해야 합니다:
                <br />
                - 회원 가입 시 정확한 정보를 제공해야 합니다.
                <br />
                - 타인의 정보를 도용하거나 부정 사용하지 않아야 합니다.
                <br />
                - 사이트 이용 시 법령 및 공공질서를 준수해야 합니다.
              </p>
              <p>
                제5조 [서비스 이용 제한]
                <br />
                회사는 다음과 같은 경우 회원의 서비스 이용을 제한할 수 있습니다:
                <br />
                - 부정한 목적으로 서비스를 이용하는 경우
                <br />
                - 사이트 운영을 방해하는 행위를 하는 경우
              </p>
            </>
          ) : (
            <>
              <p className="font-bold text-lg mb-2">개인정보 처리방침</p>
              <p>
                제1조 [수집하는 개인정보 항목]
                <br />
                회사는 다음과 같은 개인정보를 수집합니다:
                <br />
                - 필수정보: 이름, 이메일, 비밀번호, 전화번호
                <br />
                - 선택정보: 주소, 생년월일
              </p>
              <p>
                제2조 [개인정보의 수집 및 이용 목적]
                <br />
                회사는 수집한 개인정보를 다음의 목적으로 이용합니다:
                <br />
                - 회원 관리 및 서비스 제공
                <br />
                - 맞춤형 상품 추천 및 마케팅
                <br />
                - 주문 및 배송 처리
              </p>
              <p>
                제3조 [개인정보의 보유 및 이용 기간]
                <br />
                회사는 개인정보를 법령에서 정한 기간 동안 보유하며, 회원 탈퇴 시 즉시 삭제됩니다.
              </p>
              <p>
                제4조 [개인정보 제3자 제공]
                <br />
                회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법령에 따라 요구될 경우 예외로 합니다.
              </p>
              <p>
                제5조 [개인정보 처리 위탁]
                <br />
                회사는 서비스 제공을 위해 필요한 경우 개인정보 처리를 외부 업체에 위탁할 수 있으며, 위탁 시 이용자의 권익 보호를 위해 적절한 조치를 취합니다.
              </p>
            </>
          )}
        </div>
        {/* 닫기 버튼 */}
        <div className="mt-4 flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombinedSignupModal;
