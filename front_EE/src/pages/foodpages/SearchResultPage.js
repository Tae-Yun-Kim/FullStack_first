// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom"
// import { getAllMealkits } from "../../api/mealkitApi";
// import { API_SERVER_HOST } from "../../api/todoApi";

// const SearchResultPage = () => {
//     const location = useLocation();
//     const query = new URLSearchParams(location.search).get("query") //검색어 가져오기
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchResult = async () => {
//             try{
//                 const allMealkits = await getAllMealkits();
                
//                 //검색어에 따라 필터링
//                 const filteredResult = allMealkits.filter((mealkit) => 
//                 mealkit.mname.toLowerCase().includes(query.toLowerCase())
//             );
//             setResults(filteredResult);
//             } catch (error) {
//                 console.error("검색결과를 찾을 수 없습니다.", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         if(query) {
//             fetchResult();
//         }
//     }, [query]);

//     if(loading) return <div>Loading...</div>;
//     if(results.length === 0) return <div>검색 결과가 없습니다.</div>;

//     return (
//         <div className="container mx-auto p-8 max-w-screen-lg bg-white shadow-lg rounded-lg">
//             <h1 className="text-3x1 font-bold mb-6">"{query}" 검색결과</h1>
//             <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {results.map((mealkit) => (
//                     <li key={mealkit.mid} className="border p-4 rounded shadow">
//                         <Link to={`/mealkitpage/${mealkit.mid}`} className="block">
//                         <img
//                         src={
//                             mealkit.uploadFileNames
//                               ? `${API_SERVER_HOST}/mealkits/view/${mealkit.uploadFileNames}`
//                               : "/default.jpg" // 기본 이미지 경로
//                           }
//                         alt={mealkit.mname}
//                         className="w-full h-48 object-cover mb-2"/>
//                         <h2 className="text-x1 font-semibold">{mealkit.mname}</h2>
//                         <p>{mealkit.mprice ? `${mealkit.mprice}원` : "가격 정보 없음"}</p>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SearchResultPage;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllMealkits } from "../../api/mealkitApi";
import { API_SERVER_HOST } from "../../api/todoApi";

const SearchResultPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); // 검색어 가져오기
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const allMealkits = await getAllMealkits();

        console.log("API에서 가져온 밀키트 데이터:", allMealkits);

        // 검색어에 따라 필터링
        const filteredResult = allMealkits.filter((mealkit) => {
          // 이름 검색
          const nameMatch = mealkit.mname
            ?.toLowerCase()
            .includes(query.toLowerCase());

          // 재료 검색
          const ingredientMatch = mealkit.products?.some((product) => {
            console.log(
              "재료 이름:",
              product.product.pname,
              "검색어:",
              query.toLowerCase()
            );
            return product.product.pname
              ?.toLowerCase()
              .includes(query.toLowerCase());
          });

          return nameMatch || ingredientMatch; // 이름 또는 재료 검색
        });

        setResults(filteredResult || []);
      } catch (error) {
        console.error("검색 결과를 찾을 수 없습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResult();
    }
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (results.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <div className="container mx-auto p-8 max-w-screen-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-3x1 font-bold mb-6">"{query}" 검색결과</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((mealkit) => (
          <li key={mealkit.mid} className="border p-4 rounded shadow">
            <Link to={`/mealkitpage/${mealkit.mid}`} className="block">
              <img
                src={
                  mealkit.uploadFileNames.length > 0
                    ? `${API_SERVER_HOST}/mealkits/view/${mealkit.uploadFileNames[0]}`
                    : "/default.jpg" // 기본 이미지 경로
                }
                alt={mealkit.mname}
                className="w-full h-48 object-cover mb-2"
              />
              <h2 className="text-x1 font-semibold">{mealkit.mname}</h2>
              <p>{mealkit.price ? `${mealkit.price}원` : "가격 정보 없음"}</p>
              <p className="text-sm text-gray-500">
                재료:{" "}
                {mealkit.products
                  ? mealkit.products
                      .map((product) => product.product.pname || "알 수 없음")
                      .join(", ")
                  : "정보 없음"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultPage;
