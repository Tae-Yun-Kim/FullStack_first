import { useParams } from "react-router-dom";
import ModifyComponent_c from "../../components/community/ModifyComponent_c";

const ModifyPage_c = () => {
  const { tno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold mb-4">커뮤니티 게시글 수정</div>
      <ModifyComponent_c tno={tno} />
    </div>
  );
};

export default ModifyPage_c;
