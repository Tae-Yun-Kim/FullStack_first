// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import DeleteModal from "../common/DeleteModal";

// const FavoritesPage = () => {
//   const [products, setProducts] = useState([]); // 찜한 상품 목록
//   const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부
//   const [page, setPage] = useState(1); // 현재 페이지
//   const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 여부
//   const [productToRemove, setProductToRemove] = useState(null); // 삭제할 상품 정보

//   // 더미 데이터 (서버 연결 안 된 경우를 대비)
//   const dummyData = [
//     { id: 1, name: "포로 1", image: "https://via.placeholder.com/150", description: "상품 1" },
//     { id: 2, name: "Product 2", image: "https://via.placeholder.com/150", description: "상품 2" },
//     { id: 3, name: "Product 3", image: "https://via.placeholder.com/150", description: "상품 3" },
//     { id: 4, name: "Product 4", image: "https://via.placeholder.com/150", description: "상품 4" },
//     { id: 5, name: "Product 5", image: "https://via.placeholder.com/150", description: "상품 5" }
//   ];

//   useEffect(() => {
//     loadMoreProducts();
//   }, []);

//   const loadMoreProducts = () => {
//     const newProducts = dummyData.slice((page - 1) * 5, page * 5);
//     setProducts((prevProducts) => [...prevProducts, ...newProducts]);
//     setPage((prevPage) => prevPage + 1);
//   };

//   // 찜 삭제 처리
//   const removeFromFavorites = () => {
//     if (!productToRemove) return;
//     setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productToRemove.id));
//     setIsModalOpen(false); // 모달 닫기
//     setProductToRemove(null); // 삭제 후 초기화
//   };

//   // 카트에 담기
//   const addToCart = (productId) => {
//     axios.post("http://localhost:8080/api/cart", { productId })
//       .then((response) => {
//         console.log("Product added to cart", response.data);
//       })
//       .catch((error) => {
//         console.error("Error adding product to cart:", error);
//       });
//   };

//   if (products.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex">
//       {/* 네비게이션 메뉴 */}
//       <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
//         <div className="w-full flex justify-between p-4">
//           <Link to="/" className="text-xl font-semibold text-gray-800">Logo</Link>
//           <div className="space-x-4">
//             <Link to="/mypage/favorites" className="text-lg text-gray-600 hover:text-gray-800">찜한 상품</Link>
//             <Link to="/mypage/history" className="text-lg text-gray-600 hover:text-gray-800">구매내역</Link>
//             <Link to="/mypage/posts" className="text-lg text-gray-600 hover:text-gray-800">내가 쓴 글</Link>
//           </div>
//         </div>
//       </div>

//       {/* 마이페이지 메인 */}
//       {/* <div className="w-full mt-24 flex"> */}
//       <div className="w-full flex" style={{ position: 'relative', top: '200px' }}>
//         {/* 왼쪽 3분의 1: 찜한 상품, 구매내역, 내가 쓴 글 메뉴 */}
//         <div className="w-1/3 p-4 border-r border-gray-300">
//           <div className="menu-item">
//             <Link to="/mypage/favorites" className="block text-lg text-gray-600 hover:text-gray-800 mb-4 border-b pb-2">
//               찜한 상품
//             </Link>
//             <Link to="/mypage/history" className="block text-lg text-gray-600 hover:text-gray-800 mb-4 border-b pb-2">
//               구매내역
//             </Link>
//             <Link to="/mypage/posts" className="block text-lg text-gray-600 hover:text-gray-800 border-b pb-2">
//               내가 쓴 글
//             </Link>
//           </div>
//         </div>

//         {/* 오른쪽 3분의 2: 찜한 상품 목록 */}
//         <div className="w-2/3 p-4">
//           <h2 className="text-2xl font-semibold mb-6">찜한 상품 목록</h2>

//           {/* 찜한 상품 목록 */}
//           <div className="favorite-products-list space-y-4">
//             {products.map((product) => (
//               <div key={product.id} className="product-item flex items-center mb-4 p-4 border border-gray-300 rounded-md">
//                 <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mr-4" />
//                 <div className="product-info flex-1">
//                   <h3 className="text-lg font-semibold">{product.name}</h3>
//                   <p className="text-sm text-gray-600">{product.description}</p>
//                 </div>
//                 {/* 삭제 및 담기 버튼을 한 줄로 배치 */}
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => {
//                       setProductToRemove(product);
//                       setIsModalOpen(true);
//                     }}
//                     className="text-red-600 hover:text-red-800 border border-red-600 px-4 py-2 rounded-md"
//                   >
//                     찜 삭제
//                   </button>
//                   <button
//                     onClick={() => addToCart(product.id)}
//                     className="text-blue-600 hover:text-blue-800 border border-blue-600 px-4 py-2 rounded-md"
//                   >
//                     카트에 담기
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 모달 */}
//       {isModalOpen && (
//         <DeleteModal
//           showModal={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onDelete={removeFromFavorites}
//         />
//       )}
//     </div>
//   );
// };

// export default FavoritesPage;
