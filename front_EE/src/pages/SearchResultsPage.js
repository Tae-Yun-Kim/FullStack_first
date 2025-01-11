// SearchResultsPage.js

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const SearchResultsPage = () => {
  const [results, setResults] = useState([]); // 현재 페이지의 데이터
  const [allResults, setAllResults] = useState([]); // 전체 데이터
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // 현재 페이지
  const [sortOption, setSortOption] = useState("recommend"); // 정렬 옵션

  const ITEMS_PER_PAGE = 40; // 페이지당 표시할 항목 개수

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); // 검색어 가져오기

  // 더미 데이터를 생성
  const generateDummyData = (count = 200) => {
    return Array.from({ length: count }, (_, index) => ({
      id: `dummy-${index + 1}`,
      name: `[monttoto] 상품 ${index + 1}`,
      price: (index + 1) * 10000,
      description: `고급스러운 디자인으로 제작된 상품 ${index + 1}.`,
      imageUrl: `https://via.placeholder.com/400x500?text=Product+${index + 1}`,
      createdAt: Date.now() - index * 1000 * 60, // 최근 생성 시간
      sales: Math.floor(Math.random() * 100), // 판매량
    }));
  };

  // 초기 데이터 로드
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const dummyData = generateDummyData(200); // 200개의 데이터 생성
        setAllResults(dummyData); // 전체 데이터 설정
        setResults(dummyData.slice(0, ITEMS_PER_PAGE)); // 첫 페이지 데이터 설정
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    const start = (newPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setResults(allResults.slice(start, end));
    setPage(newPage);

    // 페이지 이동 후 화면 맨 위로 이동
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  // 정렬 변경 핸들러
  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedResults = [...allResults];

    if (option === "latest") {
      sortedResults.sort((a, b) => b.createdAt - a.createdAt); // 최신순
    } else if (option === "popular") {
      sortedResults.sort((a, b) => b.sales - a.sales); // 판매량순
    } else if (option === "lowPrice") {
      sortedResults.sort((a, b) => a.price - b.price); // 낮은 가격순
    } else if (option === "highPrice") {
      sortedResults.sort((a, b) => b.price - a.price); // 높은 가격순
    }

    setAllResults(sortedResults);
    setResults(sortedResults.slice(0, ITEMS_PER_PAGE)); // 첫 페이지 데이터 재설정
    setPage(1); // 첫 페이지로 이동

    // 정렬 변경 후 화면 맨 위로 이동
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  if (loading) return <div>Loading...</div>;

  const totalPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);

  return (
    <div className="p-8">
      {/* 상단 제목 */}
      <h1 className="text-2xl font-bold text-center mb-4">
        '{query}'에 대한 검색결과
      </h1>

      {/* 검색 결과 개수 및 정렬 */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600 text-sm">총 {allResults.length}건</p>
        <div className="flex space-x-4 text-gray-700 text-sm">
          <button
            onClick={() => handleSortChange("recommend")}
            className={`${
              sortOption === "recommend" ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            추천순
          </button>
          <button
            onClick={() => handleSortChange("latest")}
            className={`${
              sortOption === "latest" ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            신상품순
          </button>
          <button
            onClick={() => handleSortChange("popular")}
            className={`${
              sortOption === "popular" ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            판매량순
          </button>
          <button
            onClick={() => handleSortChange("lowPrice")}
            className={`${
              sortOption === "lowPrice" ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            낮은 가격순
          </button>
          <button
            onClick={() => handleSortChange("highPrice")}
            className={`${
              sortOption === "highPrice" ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            높은 가격순
          </button>
        </div>
      </div>

      {/* 상품 카드 리스트 */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((result) => (
          <li
            key={result.id}
            className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Link to={`/product/${result.id}`} className="block">
              <img
                src={result.imageUrl}
                alt={result.name}
                className="w-full h-72 object-cover mb-4 rounded-md"
              />
              <h2 className="text-sm font-semibold text-gray-900">{result.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{result.description}</p>
              <p className="text-lg font-bold text-gray-900 mt-4">
                {result.price.toLocaleString()}원
              </p>
              <p className="text-sm text-green-500 mt-1">무료배송</p>
            </Link>
            <button className="w-full mt-4 bg-gray-100 py-2 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200">
              담기
            </button>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          이전
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              page === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SearchResultsPage;
