// import ListComponent_q from '../../components/qna/ListComponent_q';

// const ListPage_q = () => {
//   return (
//     <div className="p-4 w-full bg-white">
//       <div className="text-3xl font-extrabold mb-4">QnA List Page</div>
//       <ListComponent_q />
      
//     </div>
//   );
// };

// export default ListPage_q;


import { useState, useEffect } from 'react';
import ListComponent_q from '../../components/qna/ListComponent_q';
import { FaSearch } from 'react-icons/fa'; // FaSearch 아이콘 추가

const ListPage_q = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [searchCount, setSearchCount] = useState(0); // 검색된 항목 개수 상태
  const [isSearching, setIsSearching] = useState(false); // 검색 상태

  // 검색 핸들러
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setIsSearching(event.target.value.trim() !== '');
  };

  // 검색 결과 개수 업데이트 핸들러
  const handleSearchCountUpdate = (count) => {
    setSearchCount(count);
  };

  return (
    <div className="p-4 w-full bg-white">
    {/* 고객센터 제목 */}
    <div className="text-2xl font-bold text-center mt-10 mb-14 leading-relaxed"> {/* 줄 간격 조정 */}
  <span>검색창에 키워드를 입력하고</span>
  <br />
  <span>답변을 확인해보세요.</span>
</div>


      {/* 검색창 */}
      <div className="flex justify-center items-center mb-30"> {/* 검색창 하단 간격 조정 */}
        <div className="relative w-3/5 max-w-lg">
          <input
            type="text"
            placeholder="무엇을 도와드릴까요?"
            className="border-b border-black w-full text-center py-2 text-gray-500 placeholder-gray-400 focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* 검색된 항목 개수 */}
      {isSearching && (
       <div className="text-center text-gray-700 mb-20"> {/* 간격 조정 */}
          총 <span className="font-bold">{searchCount}</span>개가 검색되었습니다.
        </div>
      )}

      {/* 리스트 컴포넌트 */}
      <div className="mt-20"> {/* 검색창과 리스트 간 간격 추가 */}
        <ListComponent_q searchTerm={searchTerm} onSearchCountUpdate={handleSearchCountUpdate} />
      </div>
    </div>
  );
};

export default ListPage_q;
