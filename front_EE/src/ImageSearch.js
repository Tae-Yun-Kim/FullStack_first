// import React, { useState } from "react";
// import * as mobilenet from "@tensorflow-models/mobilenet";
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgl"; // 또는 "@tensorflow/tfjs-backend-wasm"
// import { useNavigate } from "react-router-dom";

// function ImageSearch() {
//   const [image, setImage] = useState(null);
//   const [results, setResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate(); // 검색 페이지로 이동하기 위한 hook

//   // WebGL 백엔드 초기화
//   React.useEffect(() => {
//     tf.setBackend("webgl").then(() => {
//       console.log("WebGL backend initialized");
//     });
//   }, []);

//   // 이미지 업로드 핸들러
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setImage(imageUrl);
//     }
//   };

//   // 분석 상태 초기화
//   const resetState = () => {
//     setImage(null);
//     setResults(null);
//     setIsLoading(false);
//     document.getElementById("file-input").value = ""; // 파일 선택 초기화
//   };

//   // 클래스 이름 번역 함수
//   const translateClassName = async (className) => {
//     try {
//       const response = await fetch(
//         `https://api.mymemory.translated.net/get?q=${className}&langpair=en|ko`
//       );
//       const data = await response.json();
//       return data.responseData.translatedText || className;
//     } catch (error) {
//       console.error("Error translating class name:", error);
//       return className;
//     }
//   };

//   const cleanClassName = (className) => {
//     // 공통 키워드 사전을 정의
//     const keywords = ["소고기", "돼지고기", "피자", "스파게티", "햄버거", "치킨", "샐러드", "파스타", "감자", "토마토"];
  
//     // 클래스 이름이 사전의 키워드에 포함되어 있는지 확인
//     for (const keyword of keywords) {
//       if (className.toLowerCase().includes(keyword.toLowerCase())) {
//         return keyword; // 공통 키워드 반환
//       }
//     }
  
//     // 사전에 없는 경우, 원본 클래스 이름 반환
//     return className;
//   };

//   // 이미지 분석
//   const analyzeImage = async () => {
//     if (!image) {
//       alert("Please upload an image first.");
//       return;
//     }
  
//     setIsLoading(true);
  
//     try {
//       const cocoModel = await cocoSsd.load();
//       const mobileNetModel = await mobilenet.load();
  
//       const imgElement = document.getElementById("uploaded-image");
//       const cocoPredictions = await cocoModel.detect(imgElement);
//       const mobileNetPredictions = await mobileNetModel.classify(imgElement);
  
//       const combinedResults = [
//         ...cocoPredictions.map((prediction) => ({
//           className: prediction.class,
//           probability: prediction.score,
//         })),
//         ...mobileNetPredictions,
//       ];
  
//       setResults(combinedResults);
  
//       // 가장 높은 확률의 클래스 선택
//       const bestResult = combinedResults.reduce((prev, current) =>
//         prev.probability > current.probability ? prev : current
//       );
  
//       // 키워드 정제: "pizza, pizza pie" → "pizza"
//       const cleanedClassName = bestResult.className
//         .split(",")[0] // 쉼표 기준으로 첫 번째 단어만 선택
//         .trim(); // 공백 제거
  
//       // 한글로 번역
//       const translatedClassName = await translateClassName(cleanedClassName);
  
//       // 검색 페이지로 이동
//       navigate(`/search?query=${translatedClassName}`);
//     } catch (error) {
//       console.error("Error analyzing the image:", error);
//       alert("Error analyzing the image.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   return (
//     <div style={{ textAlign: "center", margin: "20px" }}>
//       <h1>이미지 검색</h1>

//       {/* 이미지 업로드 */}
//       <input
//         id="file-input"
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//       />

//       {/* 업로드된 이미지 미리보기 */}
//       {image && (
//         <div>
//           <img
//             id="uploaded-image"
//             src={image}
//             alt="Uploaded Preview"
//             style={{ maxWidth: "50%", height: "50%", margin: "20px 0" }}
//           />
//         </div>
//       )}

//       {/* 분석 버튼 */}
//       <button onClick={analyzeImage} disabled={isLoading}>
//         {isLoading ? "분석 중..." : "이미지 분석하기"}
//       </button>

//       {/* 지우기 버튼 */}
//       <button
//         onClick={resetState}
//         style={{
//           marginLeft: "10px",
//           backgroundColor: "#f44336",
//           color: "white",
//           border: "none",
//           padding: "10px 20px",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Reset
//       </button>

//       {/* 분석 결과 */}
//       {results && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Analysis Results:</h2>
//           <ul>
//             {results.map((result, index) => (
//               <li key={index}>
//                 <strong>{result.className}</strong>:{" "}
//                 {(result.probability * 100).toFixed(2)}%
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageSearch;

import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { useNavigate } from "react-router-dom";

function ImageSearch() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 이미지 검색 창 상태
  const navigate = useNavigate();

  useEffect(() => {
    tf.setBackend("webgl").then(() => {
      console.log("WebGL backend initialized");
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const resetState = () => {
    setImage(null);
    setIsLoading(false);
    document.getElementById("file-input").value = ""; // 파일 선택 초기화
  };

  const translateClassName = async (className) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${className}&langpair=en|ko`
      );
      const data = await response.json();
      return data.responseData.translatedText || className;
    } catch (error) {
      console.error("Error translating class name:", error);
      return className;
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      alert("이미지를 먼저 업로드하세요.");
      return;
    }

    setIsLoading(true);

    try {
      const cocoModel = await cocoSsd.load();
      const mobileNetModel = await mobilenet.load();

      const imgElement = document.getElementById("uploaded-image");
      const cocoPredictions = await cocoModel.detect(imgElement);
      const mobileNetPredictions = await mobileNetModel.classify(imgElement);

      const combinedResults = [
        ...cocoPredictions.map((prediction) => ({
          className: prediction.class,
          probability: prediction.score,
        })),
        ...mobileNetPredictions,
      ];

      const bestResult = combinedResults.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );

      const translatedClassName = await translateClassName(
        bestResult.className.split(",")[0].trim()
      );

      navigate(`/search?query=${translatedClassName}`);

      resetState(); // 검색 완료 후 초기화
      setIsModalOpen(false); // 검색 창 닫기
    } catch (error) {
      console.error("Error analyzing the image:", error);
      alert("이미지 분석 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* 이미지 검색 버튼 */}
      {!isModalOpen && (
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)} // 검색 창 열기
            className="px-6 py-2 rounded bg-luxury-lightOlive text-gray-600 font-bold hover:bg-luxury-darkerOlive"
          >
            이미지 검색
          </button>
        </div>
      )}

      {/* 이미지 검색 창 */}
      {isModalOpen && (
        <div className="p-6 bg-gray-50 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">이미지 검색</h1>

          {/* 이미지 업로드 */}
          <div className="flex flex-col items-center mb-6">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4 border rounded px-4 py-2 text-gray-700"
            />
            {image && (
              <div className="w-64 h-64 mb-4">
                <img
                  id="uploaded-image"
                  src={image}
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover rounded shadow"
                />
              </div>
            )}
          </div>

          {/* 버튼들 */}
          <div className="flex justify-center gap-4">
            <button
              onClick={analyzeImage}
              disabled={isLoading}
              className={`px-6 py-2 rounded text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "text-gray-600 bg-luxury-lightOlive hover:bg-luxury-darkerOlive"
              }`}
            >
              {isLoading ? "분석 중..." : "이미지 분석하기"}
            </button>
            <button
              onClick={() => {
                resetState();
                setIsModalOpen(false); // 검색 창 닫기
              }}
              className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSearch;
