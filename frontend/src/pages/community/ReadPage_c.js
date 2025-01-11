import { useParams } from "react-router-dom";
import ReadComponent_c from "../../components/community/ReadComponent_c";

const ReadPage_c = () => {
  const { tno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">커뮤니티 게시글 조회</div>
      <ReadComponent_c tno={tno}></ReadComponent_c>
    </div>
  );
};

export default ReadPage_c;
