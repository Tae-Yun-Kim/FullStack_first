import React, { useState, useEffect } from "react";
import axios from "axios";
import SliderBar from "../../slices/SlideBar";  // SliderBar 임포트

const BestRecipes = () => {
  const [recipes, setRecipes] = useState([]); // 레시피 데이터 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부
  const [page, setPage] = useState(1); // 페이지 상태

  useEffect(() => {
    // 첫 번째 페이지 데이터 로드
    loadMoreRecipes();
  }, []);

  const loadMoreRecipes = () => {
    axios
      .get(`http://localhost:8080/api/recipes?page=${page}`) // 실제 API 엔드포인트 사용
      .then((response) => {
        const newRecipes = response.data.data;  // 응답 구조가 data 객체 안에 있을 경우
        if (Array.isArray(newRecipes)) {
          setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
          setPage((prevPage) => prevPage + 1); // 다음 페이지로 이동
  
          if (newRecipes.length === 0) {
            setHasMore(false); // 더 이상 데이터가 없으면 hasMore를 false로 설정
          }
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="slider-container bg-gray-100 p-10 relative">
      <h2 className="text-2xl font-semibold mb-6">베스트 레시피</h2>

      {/* SliderBar에 레시피 데이터 전달 */}
      <SliderBar items={recipes} hasMore={hasMore} loadMoreRecipes={loadMoreRecipes} />
    </div>
  );
};

export default BestRecipes;
