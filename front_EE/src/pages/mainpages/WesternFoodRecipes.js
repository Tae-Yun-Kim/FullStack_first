import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllMealkits } from "../../api/mealkitApi";
import { API_SERVER_HOST } from "../../api/todoApi";

const WesternFoodRecipes = () => {
  const [mealkits, setMealkits] = useState([]); // 전체 데이터
  const [displayedMealkits, setDisplayedMealkits] = useState([]); // 현재 렌더링된 데이터
  const itemsPerPage = 4; // 첫 화면에서 표시할 데이터 수
  const scrollContainerRef = useRef(null); // 스크롤 컨테이너 참조
  const [additionalIndex, setAdditionalIndex] = useState(itemsPerPage); // 추가 렌더링 시작 인덱스

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMealkits();
        const filteredMealkits = data.filter((mealkit) => mealkit.category === "WESTERN");
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
      <h1 className="text-3xl font-bold mb-6">양식</h1>
    
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

export default WesternFoodRecipes;
