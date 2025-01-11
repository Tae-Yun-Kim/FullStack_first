import React, { useState } from "react"; // useState 임포트 추가
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

const SliderBar = ({ items = [], hasMore, loadMoreRecipes }) => {  // items의 기본값을 빈 배열로 설정
  const [favorites, setFavorites] = useState([]); // 찜한 레시피 상태

  const handleFavoriteClick = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favorite) => favorite !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleRecipeClick = (link) => {
    window.location.href = link;
  };

  if (!items || items.length === 0) {
    return <div>백이랑 연결 X</div>;  // items가 없으면 로딩 메시지를 출력
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMoreRecipes} // 더 불러올 데이터가 있으면 호출
      hasMore={hasMore}
    >
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {items.map((recipe) => (
          <SwiperSlide key={recipe.id}>
            <div className="slide-item bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={recipe.image} // 서버에서 받은 이미지 URL 사용
                alt={recipe.name}
                className="w-full h-60 object-cover cursor-pointer"
                onClick={() => handleRecipeClick(recipe.recipeLink)} // 이미지 클릭 시 해당 레시피 링크로 이동
              />
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{recipe.name}</h3>
                <button
                  onClick={() => handleFavoriteClick(recipe.id)}
                  className="mt-1 p-1 bg-transparent text-red-500 rounded-full"
                >
                  {favorites.includes(recipe.id) ? (
                    <FaHeart size={20} />
                  ) : (
                    <FaRegHeart size={20} />
                  )}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </InfiniteScroll>
  );
};

export default SliderBar;
