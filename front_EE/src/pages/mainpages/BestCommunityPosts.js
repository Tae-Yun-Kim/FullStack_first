import React, { useState, useEffect, useRef } from 'react';
import { getCommunityList, increaseViewCount } from '../../api/communityApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const BestCommunityPosts = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [serverData, setServerData] = useState({
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
  });
  const page = 1;
  const size = 10;

  // 데이터 로드
  useEffect(() => {
    getCommunityList({ page, size })
      .then((data) => {
        if (data && data.dtoList) {
          const sortedData = {
            ...data,
            dtoList: data.dtoList.sort((a, b) => b.viewCount - a.viewCount),
          };
          setServerData(sortedData);
        } else {
          console.error('예상치 못한 응답 데이터 형식:', data);
        }
      })
      .catch((error) => {
        console.error('데이터 로드 오류:', error);
      });
  }, [page, size]);

  // 5초마다 오른쪽 버튼 자동 클릭
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.slideNext(); // 오른쪽으로 슬라이드 이동
      }
    }, 5000); // 5초마다 실행

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 제거
  }, []);

  // 게시글 클릭 시 조회수 증가 및 상세 페이지 이동
  const handlePostClick = async (post) => {
    try {
      await increaseViewCount(post.tno);
      setServerData((prevData) => ({
        ...prevData,
        dtoList: prevData.dtoList.map((item) =>
          item.tno === post.tno
            ? { ...item, viewCount: item.viewCount + 1 }
            : item
        ),
      }));
      navigate(`/community/read/${post.tno}`);
    } catch (error) {
      console.error('조회수 증가 실패:', error);
      navigate(`/community/read/${post.tno}`);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-screen-lg bg-luxury-lightOlive shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">BEST👍</h2>

      {serverData.dtoList.length > 0 ? (
        <div className="relative flex items-center">
          {/* 왼쪽 버튼 */}
          <button
            className="flex-shrink-0 bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-600"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            {"<"}
          </button>

          {/* 슬라이더 */}
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={16}
            slidesPerView={4}
            loop={true} // 무한 루프 활성화
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="flex-grow"
          >
            {serverData.dtoList.slice(0, 6).map((post) => (
              <SwiperSlide key={post.tno}>
                <div
                  className="flex-none border rounded-lg shadow-sm overflow-hidden"
                  onClick={() => handlePostClick(post)}
                >
                  <img
                    src={`http://localhost:8080/api/community/view/${post.uploadFileNames?.[0] || 'default.jpg'}`}
                    alt={post.communityTitle}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2 bg-white">
                    <h3 className="text-sm font-bold mb-1">{post.communityTitle}</h3>
                    <p className="text-xs text-gray-700">
                      {post.nickname} | 조회수: {post.viewCount}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 오른쪽 버튼 */}
          <button
            className="flex-shrink-0 bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-600"
            onClick={() => swiperRef.current?.slideNext()}
          >
            {">"}
          </button>
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default BestCommunityPosts;
