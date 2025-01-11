// import { useParams } from "react-router-dom";
// import ReadComponent_q from "../../components/qna/ReadComponent_q";

// const ReadPage = () => {
//   const { qno } = useParams();

//   return (
//     <div className="p-4 w-full bg-white">
//       <div className="text-3xl font-extrabold">QnA Read Page</div>
//       <ReadComponent_q qno={qno}></ReadComponent_q>
//     </div>
//   );
// };

// export default ReadPage;


import { useParams } from "react-router-dom";
import ReadComponent_q from "../../components/qna/ReadComponent_q";

const ReadPage = () => {
  const { qno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">상세페이지</div>
      <ReadComponent_q qno={qno}></ReadComponent_q>
    </div>
  );
};

export default ReadPage;