// // src/pages/KoreanFoodPage.jsx
// import React, { useEffect, useState } from "react";
// import { getMealkitsByCategory } from "../../api/categoryApi";
// import { Link } from "react-router-dom";
// import { getAllMealkits } from "../../api/mealkitApi";
// import { API_SERVER_HOST } from "../../api/todoApi";

// const host = API_SERVER_HOST;

// const KoreanFoodPage = () => {
//   const [mealkits, setMealkits] = useState([]);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getAllMealkits();
//         console.log(data);
//         // 한식 카테고리로 필터링
//         const filteredMealkits = data.filter((mealkit) => mealkit.category === "KOREAN");
//         console.log("Filtered Mealkits:", filteredMealkits); // 필터링된 데이터 확인
//         setMealkits(filteredMealkits);
//       } catch (error) {
//         console.error("Failed to fetch mealkits:", error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="mt-40 p-4">
//     <h1 className="text-2xl font-bold">한식 밀키트 목록</h1>
//     <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {mealkits.map((mealkit) => (
//         <li key={mealkit.mid} style={{ marginBottom: "20px" }} className="border p-4 rounded shadow">
//           <h2>{mealkit.mname}</h2>
//           <p>가격: {mealkit.price}원</p>
//           <p>레시피:</p>
//           <pre style={{ whiteSpace: "pre-wrap" }}>{mealkit.recipe}</pre>
//           {mealkit.uploadFileNames && mealkit.uploadFileNames.length > 0 && (
//             <div>
//               <h4>이미지:</h4>
//               {mealkit.uploadFileNames.map((fileName, index) => (
//                 <img
//                   key={index}
//                   src={`${host}/mealkits/view/s_${fileName}`}
//                   alt={`${mealkit.mname} 이미지`}
//                   style={{ width: "200px", margin: "10px 0" }}
//                 />
//               ))}
//             </div>
//           )}
//         </li>
//       ))}
//     </ul>
//   </div>
//   );
// };

// export default KoreanFoodPage;

// 1/2
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getAllMealkits } from "../../api/mealkitApi";
// import { API_SERVER_HOST } from "../../api/todoApi";


// const KoreanFoodPage = () => {
//   const [mealkits, setMealkits] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getAllMealkits();
//         // 카테고리가 "KOREAN"인 밀키트만 필터링
//         const filteredMealkits = data.filter((mealkit) => mealkit.category === "KOREAN");
//         setMealkits(filteredMealkits);
//       } catch (error) {
//         console.error("Failed to fetch mealkits:", error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   if (mealkits.length === 0) {
//     return <div className="text-center mt-20">로딩 중...</div>;
//   }

//   return (
//     <div className="container mx-auto p-8 max-w-screen-lg bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-6">한식 밀키트 목록</h1>
//       <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {mealkits.map((mealkit) => (
//           <li key={mealkit.mid} className="border rounded-lg shadow-sm overflow-hidden">
//             <Link to={`/mealkitpage/${mealkit.mid}`}>
//               {/* 이미지 */}
//               <img
//                 src={
//                   mealkit.uploadFileNames.length > 0
//                     ? `${API_SERVER_HOST}/mealkits/view/${mealkit.uploadFileNames[0]}`
//                     : `${API_SERVER_HOST}/mealkits/view/default.jpg`
//                 }
//                 alt={mealkit.mname}
//                 className="w-full h-40 object-cover"
//               />
//               {/* 밀키트 정보 */}
//               <div className="p-4">
//                 <h2 className="text-xl font-bold mb-2">{mealkit.mname}</h2>
//                 <p className="text-lg text-gray-700">{mealkit.price}원</p>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default KoreanFoodPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMealkits } from "../../api/mealkitApi";
import { API_SERVER_HOST } from "../../api/todoApi";

const KoreanFoodPage = () => {
  const [mealkits, setMealkits] = useState([]);
  const [displayedMealkits, setDisplayedMealkits] = useState([]); // 렌더링할 데이터
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스
  const [isLoading, setIsLoading] = useState(false);

  const ITEMS_PER_PAGE = 9; // 한 번에 보여줄 항목 수

  // 데이터를 가져오는 함수
  useEffect(() => {
    const fetchMealkits = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMealkits();
        // "KOREAN" 카테고리로 필터링
        const filteredMealkits = data.filter((mealkit) => mealkit.category === "KOREAN");
        setMealkits(filteredMealkits);
        setDisplayedMealkits(filteredMealkits.slice(0, ITEMS_PER_PAGE));
        setCurrentIndex(ITEMS_PER_PAGE);
      } catch (error) {
        console.error("Failed to fetch mealkits:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMealkits();
  }, []);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
        !isLoading
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, currentIndex, mealkits]);

  // 더 많은 데이터를 로드
  const loadMore = () => {
    if (currentIndex >= mealkits.length) return; // 더 이상 로드할 데이터가 없음
    setIsLoading(true);
    const nextIndex = currentIndex + ITEMS_PER_PAGE;
    setDisplayedMealkits((prev) => [
      ...prev,
      ...mealkits.slice(currentIndex, nextIndex),
    ]);
    setCurrentIndex(nextIndex);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-16 max-w-screen-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">한식 밀키트 목록</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedMealkits.map((mealkit) => (
          <li key={mealkit.mid} className="border rounded-lg shadow-sm overflow-hidden">
            <Link to={`/mealkitpage/${mealkit.mid}`}>
              <img
                src={
                  mealkit.uploadFileNames.length > 0
                    ? `${API_SERVER_HOST}/mealkits/view/${mealkit.uploadFileNames[0]}`
                    : `${API_SERVER_HOST}/mealkits/view/default.jpg`
                }
                alt={mealkit.mname}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{mealkit.mname}</h2>
                <p className="text-lg text-gray-700">{mealkit.price}원</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {isLoading && <div className="text-center mt-4">로딩 중...</div>}
      {currentIndex >= mealkits.length && (
        <div className="text-center mt-4">더 이상 불러올 데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default KoreanFoodPage;

