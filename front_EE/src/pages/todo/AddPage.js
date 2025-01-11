// AddComponent 컴포넌트를 import합니다.
// AddComponent는 todo 추가 기능을 담당하는 컴포넌트입니다.
import AddComponent from "../../components/todo/AddComponent";

// AddPage 컴포넌트를 정의합니다.
const AddPage = () => {
  // 컴포넌트의 UI를 렌더링합니다.
  return (
    <div className="p-4 w-full bg-white">
      {/* 페이지 상단 제목 영역 */}
      <div className="text-3xl font-extrabold">
        Todo Add Page {/* 제목 텍스트 */}
      </div>

      {/* AddComponent를 렌더링합니다. */}
      <AddComponent />
    </div>
  );
};

// AddPage 컴포넌트를 내보냅니다.
export default AddPage;
