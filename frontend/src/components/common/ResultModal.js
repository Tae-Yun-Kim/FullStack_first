// ResultModal 컴포넌트 정의
// 서버 요청의 결과를 표시하는 모달 UI를 렌더링합니다.
const ResultModal = ({ title, content, callbackFn }) => {
  return (
    // 모달 배경
    <div
      className="fixed top-0 left-0 z-[1055] flex h-full w-full justify-center items-center bg-black bg-opacity-40"
      onClick={() => {
        if (callbackFn) {
          callbackFn(); // 배경 클릭 시 닫기
        }
      }}
    >
      {/* 모달 컨테이너 */}
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 text-gray-900"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 설정
      >
        {/* 모달 제목 */}
        {title && (
          <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
        )}

        {/* 모달 내용 */}
        <p className="text-center text-gray-700 text-base">{content}</p>

        {/* 하단 확인 버튼 */}
        <div className="flex justify-center mt-6">
          <button
            className="text-gray-600 font-bold border-b-2 border-gray-600 pb-1"
            onClick={() => {
              if (callbackFn) {
                callbackFn(); // 확인 버튼 클릭 시 닫기
              }
            }}
            style={{ background: "none", border: "none" }} // 버튼 배경 제거
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
