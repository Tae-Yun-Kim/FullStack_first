import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import InfiniteScroll from "react-infinite-scroll-component";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]); // 레시피 데이터 상태
  const [favorites, setFavorites] = useState([]); // 찜한 레시피 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부
  const [page, setPage] = useState(1); // 페이지 상태
  const swiperRef = useRef(null);

  useEffect(() => {
    // 첫 번째 페이지 데이터 로드
    loadMoreRecipes();
  }, []);

  const loadMoreRecipes = () => {
    // 레시피 데이터를 직접 넣은 부분으로 대체
    const newRecipes = 
    [
      // {id:1, name:"수육 맛있게 삶는법 백종원 레시피로 부드럽게", image:"https://recipe1.ezmember.co.kr/cache/recipe/2019/07/02/e619096726a2452b3887e7638ed17ac51_m.jpg", recipeLink:"https://www.10000recipe.com/recipe1.ezmember.co.kr/recipe/6915139"},
      {id:2, name:"엄마의 레시피, 소고기 미역국 끓이는 법", image:"https://recipe1.ezmember.co.kr/cache/recipe/2017/07/28/860484b80033e84a3584a366ae903a0d1_m.jpg", recipeLink:"https://recipe1.ezmember.co.kr/recipe/6873683"},
      {id:3, name:"돼지고기 김치찌개 맛내는 비법", image:"https://recipe1.ezmember.co.kr/cache/recipe/2015/08/25/a01d013a6b6f9d526c43f4659db2cd61_m.jpg", recipeLink:"https://recipe1.ezmember.co.kr/recipe/1785098"},
      {id:4, name:"순두부찌개. 바지락, 고기 없이도 기가 막힌 순두부찌개 만드는 법", image:"https://recipe1.ezmember.co.kr/cache/recipe/2019/08/07/8683a91920e8857cc7aba8fd79da46a91_m.jpg", recipeLink:"https://recipe1.ezmember.co.kr/recipe/6912220"},
      {id:5, name:"절대 실패없는 제육볶음 황금레시피 감칠맛과 매운맛이 좋아요~!!", image:"https://recipe1.ezmember.co.kr/cache/recipe/2019/01/31/e8cab950076b23a80f16dd7858dd514e1_m.jpg", recipeLink:"https://recipe1.ezmember.co.kr/recipe/6905743"},
      {id:6, name:"국물이 너무 개운해요~맑은콩나물국 맛있게 끓이는법", image:"https://recipe1.ezmember.co.kr/cache/recipe/2019/01/25/8bed3206ef470a0d7d23d565564805261_m.jpg", recipeLink:"https://recipe1.ezmember.co.kr/recipe/6905196"},
      {id:7, name:"시금치무침 만드는 법 시금치나물무침", image:"https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/4b18778769ccdab54b57d7ddbc753f501_m.jpg", recipeLink:"https://recipe1.ezmember.co.kr/recipe/6840346"},
      {id:8, name:"두부조림 양념장 만드는 법", image:"https://recipe1.ezmember.co.kr/cache/recipe/2018/06/26/b423d8a43b45d4f8dd820f82fb37a9461_m.jpg", recipeLink:"https://recipe1.ezmember.co.kr/recipe/6891526"},
        { id: 9, name: "백종원레시피로 만든 콩나물무침으로 밥 한 끼 뚝딱 ~", image: "https://recipe1.ezmember.co.kr/cache/recipe/2017/03/22/93dd58483544283879abe07cb3ca75961_m.jpg", recipeLink: "/recipe/6867256" },
        { id: 10, name: "오징어 볶음, 향과 맛이 일품! 백종원 오징어 볶음", image: "https://recipe1.ezmember.co.kr/cache/recipe/2019/01/04/518d5bf35102aa51bf58078f7a25dc751_m.jpg", recipeLink: "/recipe/6903507" },
        { id: 11, name: "닭볶음탕 닭도리탕 황금레시피 짱짱맛 칼칼함이 남달라", image: "https://recipe1.ezmember.co.kr/cache/recipe/2018/02/13/e0649f3f0b446f39c9a7bdff70d953691_m.jpg", recipeLink: "/recipe/6883937" },
        { id: 12, name: "꼬막무침 삶는방법부터 양념장까지 완벽하게!!", image: "https://recipe1.ezmember.co.kr/cache/recipe/2017/05/10/2decfca86fe2d199b862cc1e38349b9e1_m.jpg", recipeLink: "/recipe/6869539" },
        { id: 13, name: "생생정보통 잡채 황금레시피 이거였네", image: "https://recipe1.ezmember.co.kr/cache/recipe/2017/11/14/a2d4839b5743d121d4d2b46fdbc9aa5b1_m.jpg", recipeLink: "/recipe/6879533" },
        { id: 14, name: "닭볶음탕 진짜진짜 황금레시피 알려 드려요~~^^", image: "https://recipe1.ezmember.co.kr/cache/recipe/2017/09/12/e082636233ee03a012fc656d428df5971_m.jpg", recipeLink: "/recipe/6876357" },
        { id: 15, name: "무생채 만드는 법, 절이지 않고 10분 만에 휘리릭 ~", image: "https://recipe1.ezmember.co.kr/cache/recipe/2018/07/29/52046ea43391de69233f594b0b52bb311_m.JPG", recipeLink: "/recipe/6893285" },
        { id: 16, name: "소불고기 황금 양념 레시피", image: "https://recipe1.ezmember.co.kr/cache/recipe/2017/11/07/ca8c24608189aaf9d376f14b3f3be57c1_m.jpg", recipeLink: "/recipe/6879215" },
        { id: 17, name: "마지막 한 젓가락까지 바삭하고 고소한 간장 멸치볶음(아이밑반찬,간단반찬)멸치볶음", image: "https://recipe1.ezmember.co.kr/cache/recipe/2018/07/02/760e92406112f6a0ad98d84844cbfc7e1_m.jpg", recipeLink: "/recipe/6891816" }

    ];
    
      
  
    setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
    setPage((prevPage) => prevPage + 1); // 다음 페이지로 이동

    if (newRecipes.length < 4) {
      setHasMore(false); // 더 이상 데이터가 없으면 hasMore를 false로 설정
    }
  };

  const handleFavoriteClick = (id) => {
    // 찜한 레시피 상태 변경
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favorite) => favorite !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleRecipeClick = (link) => {
    // 레시피 이미지 클릭 시 해당 레시피 페이지로 이동
    window.location.href = link;
  };

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="slider-container bg-gray-100 p-10 relative">
      <h2 className="text-2xl font-semibold mb-6">인기 레시피</h2>

      <InfiniteScroll
        dataLength={recipes.length}
        next={loadMoreRecipes}
        hasMore={hasMore}
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {recipes.map((recipe) => (
            <SwiperSlide key={recipe.id}>
              <div className="slide-item bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-60 object-cover cursor-pointer"
                  onClick={() => handleRecipeClick(recipe.recipeLink)}
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

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center">
        <button
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="prev-button bg-transparent text-black p-3 rounded-full shadow-lg"
        >
          <span className="text-2xl">{`<`}</span>
        </button>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center">
        <button
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="next-button bg-transparent text-black p-3 rounded-full shadow-lg"
        >
          <span className="text-2xl">{`>`}</span>
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
