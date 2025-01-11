import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMealkits } from "../../api/mealkitApi";
import { API_SERVER_HOST } from "../../api/todoApi";

const ChineseFoodPage = () => {
  const [mealkits, setMealkits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMealkits();
        // 카테고리가 "KOREAN"인 밀키트만 필터링
        const filteredMealkits = data.filter((mealkit) => mealkit.category === "CHINESE");
        setMealkits(filteredMealkits);
      } catch (error) {
        console.error("Failed to fetch mealkits:", error.message);
      }
    };
    fetchData();
  }, []);

  if (mealkits.length === 0) {
    return <div className="text-center mt-20">로딩 중...</div>;
  }

  return (
    <div className="container mx-auto p-16 max-w-screen-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">중식 밀키트 목록</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealkits.map((mealkit) => (
          <li key={mealkit.mid} className="border rounded-lg shadow-sm overflow-hidden">
            <Link to={`/mealkitpage/${mealkit.mid}`}>
              {/* 이미지 */}
              <img
                src={
                  mealkit.uploadFileNames.length > 0
                    ? `${API_SERVER_HOST}/mealkits/view/${mealkit.uploadFileNames[0]}`
                    : `${API_SERVER_HOST}/mealkits/view/default.jpg`
                }
                alt={mealkit.mname}
                className="w-full h-40 object-cover"
              />
              {/* 밀키트 정보 */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{mealkit.mname}</h2>
                <p className="text-lg text-gray-700">{mealkit.price}원</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChineseFoodPage;