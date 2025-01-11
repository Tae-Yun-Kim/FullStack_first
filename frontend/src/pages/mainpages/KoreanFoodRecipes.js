// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { getAllMealkits } from "../../api/mealkitApi";
// import { API_SERVER_HOST } from "../../api/todoApi";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";


// const KoreanFoodRecipes = () => {
//   const [mealkits, setMealkits] = useState([]);
//   const swiperRef = useRef(null); // Swiper 인스턴스를 참조하기 위한 ref

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
//       {/* Swiper 슬라이더 */}
//       <Swiper
//         onSwiper={(swiper) => (swiperRef.current = swiper)} // Swiper 인스턴스 설정
//         spaceBetween={20}
//         slidesPerView={4}
//         loop={true}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//           1280: { slidesPerView: 4 },
//         }}
//       >
//         {mealkits.map((mealkit) => (
//           <SwiperSlide key={mealkit.mid}>
//             <div className="border rounded-lg shadow-sm overflow-hidden">
//               <Link to={`/mealkitpage/${mealkit.mid}`}>
//                 <img
//                   src={
//                     mealkit.uploadFileNames.length > 0
//                       ? `${API_SERVER_HOST}/mealkits/view/${mealkit.uploadFileNames[0]}`
//                       : `${API_SERVER_HOST}/mealkits/view/default.jpg`
//                   }
//                   alt={mealkit.mname}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-bold mb-1">{mealkit.mname}</h2>
//                   <p className="text-sm text-gray-700">{mealkit.price.toLocaleString()}원</p>
//                 </div>
//               </Link>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//        {/* 왼쪽 버튼 */}
//        <button
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
//         onClick={() => swiperRef.current?.slidePrev()} // Swiper 인스턴스의 slidePrev 호출
//       >
//         {"<"}
//       </button>


//       {/* 오른쪽 버튼 */}
//       <button
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
//         onClick={() => swiperRef.current?.slideNext()} // Swiper 인스턴스의 slideNext 호출
//       >
//         {">"}
//       </button>
//     </div>
//   );
// };

// export default KoreanFoodRecipes;

//1/3
// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import { getAllMealkits } from "../../api/mealkitApi";
// import { API_SERVER_HOST } from "../../api/todoApi";

// const KoreanFoodRecipes = () => {
//   const [mealkits, setMealkits] = useState([]); // 전체 데이터
//   const [displayedMealkits, setDisplayedMealkits] = useState([]); // 현재 렌더링된 데이터
//   const itemsPerPage = 4; // 한 번에 표시할 데이터 수
//   const scrollContainerRef = useRef(null); // 스크롤 컨테이너 참조

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getAllMealkits();
//         const filteredMealkits = data.filter((mealkit) => mealkit.category === "KOREAN");
//         setMealkits(filteredMealkits);
//         setDisplayedMealkits(filteredMealkits.slice(0, itemsPerPage)); // 초기 데이터 로드
//       } catch (error) {
//         console.error("Failed to fetch mealkits:", error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   const loadMoreItems = () => {
//     const nextIndex = displayedMealkits.length;
//     if (nextIndex < mealkits.length) {
//       const nextItems = mealkits.slice(nextIndex, nextIndex + itemsPerPage);
//       setDisplayedMealkits((prev) => [...prev, ...nextItems]); // 새로운 데이터 추가
//     }
//   };

//   const handleScroll = (event) => {
//     const { scrollLeft, scrollWidth, clientWidth } = event.target;
//     const scrollableWidth = scrollWidth - clientWidth;

//     if (scrollLeft >= scrollableWidth - 10) {
//       loadMoreItems(); // 스크롤이 끝에 도달하면 데이터 추가
//     }
//   };

//   const handleScrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({
//         left: -scrollContainerRef.current.clientWidth, // 왼쪽으로 한 페이지 크기만큼 스크롤
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleScrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({
//         left: scrollContainerRef.current.clientWidth, // 오른쪽으로 한 페이지 크기만큼 스크롤
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-8 max-w-screen-lg bg-white shadow-lg rounded-lg relative">
//       <h1 className="text-3xl font-bold mb-6">한식 밀키트 목록</h1>

//       {/* 밀키트 카드 컨테이너 */}
//       <div className="relative">
//         <button
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-600 z-10"
//           onClick={handleScrollLeft}
//         >
//           {"<"}
//         </button>

//         <div
//           ref={scrollContainerRef}
//           className="relative overflow-x-auto border rounded-lg p-4"
//           onScroll={handleScroll}
//           style={{
//             whiteSpace: "nowrap",
//             overflowX: "auto",
//             scrollbarWidth: "thin",
//             scrollbarColor: "#718096 #EDF2F7",
//           }}
//         >
//           {displayedMealkits.map((mealkit) => (
//             <div
//               key={mealkit.mid}
//               className="inline-block w-64 border rounded-lg shadow-sm overflow-hidden mr-4"
//               style={{ flex: "0 0 auto" }}
//             >
//               <Link to={`/mealkitpage/${mealkit.mid}`}>
//                 <img
//                   src={
//                     mealkit.uploadFileNames.length > 0
//                       ? `${API_SERVER_HOST}/mealkits/view/${mealkit.uploadFileNames[0]}`
//                       : `${API_SERVER_HOST}/mealkits/view/default.jpg`
//                   }
//                   alt={mealkit.mname}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-bold mb-1">{mealkit.mname}</h2>
//                   <p className="text-sm text-gray-700">{mealkit.price.toLocaleString()}원</p>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>

//         <button
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-600 z-10"
//           onClick={handleScrollRight}
//         >
//           {">"}
//         </button>
//       </div>

//       {/* 더 보기 버튼 */}
//       <div className="flex justify-center mt-4">
//         <button
//           className="bg-gray-700 text-white px-6 py-2 rounded-full shadow-lg hover:bg-gray-600 transition disabled:bg-gray-400"
//           onClick={loadMoreItems}
//           disabled={displayedMealkits.length >= mealkits.length} // 모든 데이터가 로드되면 비활성화
//         >
//           더 보기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default KoreanFoodRecipes;

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllMealkits } from "../../api/mealkitApi";
import { API_SERVER_HOST } from "../../api/todoApi";

const KoreanFoodRecipes = () => {
  const [mealkits, setMealkits] = useState([]); // 전체 데이터
  const [displayedMealkits, setDisplayedMealkits] = useState([]); // 현재 렌더링된 데이터
  const itemsPerPage = 4; // 첫 화면에서 표시할 데이터 수
  const scrollContainerRef = useRef(null); // 스크롤 컨테이너 참조
  const [additionalIndex, setAdditionalIndex] = useState(itemsPerPage); // 추가 렌더링 시작 인덱스

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMealkits();
        const filteredMealkits = data.filter((mealkit) => mealkit.category === "KOREAN");
        setMealkits(filteredMealkits);
        setDisplayedMealkits(filteredMealkits.slice(0, itemsPerPage)); // 초기 데이터 로드 (4개)
      } catch (error) {
        console.error("Failed to fetch mealkits:", error.message);
      }
    };
    fetchData();
  }, []);

  const loadMoreItems = () => {
    if (additionalIndex < mealkits.length) {
      const nextItem = mealkits[additionalIndex];
      setDisplayedMealkits((prev) => [...prev, nextItem]); // 새로운 데이터 추가
      setAdditionalIndex((prev) => prev + 1); // 추가 렌더링 인덱스 증가
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.querySelector("div").clientWidth, // 카드 하나만큼 왼쪽으로 이동
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.querySelector("div").clientWidth, // 카드 하나만큼 오른쪽으로 이동
        behavior: "smooth",
      });

      // 오른쪽 버튼 클릭 시 데이터 추가
      loadMoreItems();
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-screen-lg bg-white shadow-lg rounded-lg">
  <h1 className="text-3xl font-bold mb-6">한식</h1>

  {/* 밀키트 카드 컨테이너 */}
  <div className="relative flex items-center">
    {/* 왼쪽 버튼 */}
    <button
      className="flex-shrink-0 bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-600"
      onClick={handleScrollLeft}
    >
      {"<"}
    </button>

    {/* 카드 리스트 */}
    <div
      ref={scrollContainerRef}
      className="flex gap-4 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 flex-grow"
    >
      {displayedMealkits.map((mealkit) => (
        <div
          key={mealkit.mid}
          className="flex-none border rounded-lg shadow-sm overflow-hidden"
          style={{
            width: "calc(25% - 16px)", // 4개씩 배치
            minWidth: "150px", // 최소 크기
            maxWidth: "calc(33.33% - 16px)", // 반응형에서 3개로 변경
          }}
        >
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
            <div className="p-2">
              <h2 className="text-sm font-bold mb-1">{mealkit.mname}</h2>
              <p className="text-xs text-gray-700">{mealkit.price.toLocaleString()}원</p>
            </div>
          </Link>
        </div>
      ))}
    </div>

    {/* 오른쪽 버튼 */}
    <button
      className="flex-shrink-0 bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-600"
      onClick={handleScrollRight}
    >
      {">"}
    </button>
  </div>
</div>

  );
};

export default KoreanFoodRecipes;
