// import React from 'react';
// import { Link } from 'react-router-dom';

// const SidebarPage = () => {
//   return (
//     <aside className="w-64 bg-luxury-lightOlive h-full rounded-lg shadow-md">
//       <nav className="flex flex-col p-4 space-y-4">
//         <Link
//           to="/qna/list"
//           className="p-2 text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b p-2"
//         >
//           QnA List
//         </Link>
//         <Link
//           to="/qna/add"
//           className="p-2 text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b p-2"
//         >
//           Add QnA
//         </Link>
//         <Link
//           to="/qna/one-to-one" // 1:1문의 페이지로 경로 변경
//           className="p-2 text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b p-2"
//         >
//           1:1 문의
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default SidebarPage;


import React from 'react';
import { Link } from 'react-router-dom';

const SidebarPage = () => {
  return (
    <aside className="w-64 bg-luxury-lighterOlive font-bold h-full rounded-lg shadow-md"> {/* Light Olive 배경색 */}
      <nav className="flex flex-col p-4 space-y-4">
        <Link
          to="/qna/list"
          className="p-2 text-gray-700 hover:bg-neutralOlive hover:text-white rounded border-b"
        >
          QnA List
        </Link>
        <Link
          to="/qna/add"
          className="p-2 text-gray-700 hover:bg-neutralOlive hover:text-white rounded border-b"
        >
          Add QnA
        </Link>
        <Link
          to="/qna/one-to-one" // 1:1문의 페이지로 경로 변경
          className="p-2 text-gray-700 hover:bg-neutralOlive hover:text-white rounded border-b"
        >
          1:1 문의
        </Link>
      </nav>
    </aside>
  );
};

export default SidebarPage;
