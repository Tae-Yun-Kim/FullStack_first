// import React from "react";
// import BasicLayout from "../layouts/BasicLayout"; // BasicLayout import
// import SlideBar from "../slices/SlideBar";
// import BestRecipes from "./mainpages/BestRecipes";
// import FavoriteRecipes from "./mainpages/FavoriteRecipes";
// import KoreanFoodRecipes from "./mainpages/KoreanFoodRecipes";
// import WesternFoodRecipes from "./mainpages/WesternFoodRecipes";
// import JapaneseFoodRecipes from "./mainpages/JapaneseFoodRecipes";
// import ChineseFoodRecipes from "./mainpages/ChineseFoodRecipes";
// import EtcFoodRecipes from "./mainpages/EtcFoodRecipes";

// import MealkitList from "../components/lists/MealkitList"
// import KoreanFoodPage from "./mainpages/KoreanFoodRecipes";

// const MainPage = () => {

//   console.log(SlideBar);

//   return (
//     <BasicLayout>
//         {/* <MealkitList /> */}
//       {/* <SlideBar /> */}
//       <div className="mt-10">
//         <KoreanFoodPage/>
//         {/* <BestRecipes />
//         <FavoriteRecipes/> 
//         <WesternFoodRecipes/>
//         <JapaneseFoodRecipes/>
//         <ChineseFoodRecipes/>
//         <EtcFoodRecipes/>  */}
//       </div>
//     </BasicLayout>
//   );
// };

// export default MainPage;
import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import KoreanFoodRecipes from "./mainpages/KoreanFoodRecipes";
import JapaneseFoodPage from "./foodpages/JapaneseFoodPage";
import ChineseFoodPage from "./foodpages/ChineseFoodPage";
import WesternFoodPage from "./foodpages/WesternFoodPage";
import EtcFoodPage from "./foodpages/EtcFoodPage";
import JapaneseFoodRecipes from "./mainpages/JapaneseFoodRecipes";
import ChineseFoodRecipes from "./mainpages/ChineseFoodRecipes";
import WesternFoodRecipes from "./mainpages/WesternFoodRecipes";
import EtcFoodRecipes from "./mainpages/EtcFoodRecipes";
import BestCommunityPosts from "./mainpages/BestCommunityPosts";

const MainPage = () => {
  return (
    <BasicLayout>
      
      <div className>
        {/* <h1 className="text-2xl font-bold mb-6">메인 페이지</h1> */}
        <section className="mb-10">
        <BestCommunityPosts />
        </section>
        {/* 한식 슬라이더 */}
        {/* <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">한식</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            <KoreanFoodRecipes />
          </Swiper>
        </section> */}
        <section className="mb-10">
        <KoreanFoodRecipes />
        </section>

        {/* 양식 슬라이더
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">양식</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            <WesternFoodRecipes />
          </Swiper>
        </section> */}
        <section className="mb-10">
        <WesternFoodRecipes />
        </section>

        {/* 일식 슬라이더
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">일식</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            <JapaneseFoodRecipes />
          </Swiper>
        </section> */}
        <section className="mb-10">
        <JapaneseFoodRecipes />
        </section>
        {/* 중식 슬라이더
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">중식</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            <ChineseFoodRecipes />
          </Swiper>
        </section> */}
        <section className="mb-10">
        <ChineseFoodRecipes />
        </section>

        {/* 기타 슬라이더
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">기타</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            <EtcFoodRecipes />
          </Swiper>
        </section> */}
        <EtcFoodRecipes />
      </div>
    
    </BasicLayout>
  );
};

export default MainPage;
