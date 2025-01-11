// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import DeleteModal from "../common/DeleteModal";
// import { toggleFavorite } from "../../slices/favoritesSlice";

// const MyPageMain = () => {
//   const dispatch = useDispatch();
//   const [favorites, setFavorites] = useState([]);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   // 로컬 스토리지에서 찜한 상품 초기화
//   useEffect(() => {
//     const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(savedFavorites);
//   }, []);

//   // 찜한 상품 상태가 변경될 때마다 로컬 스토리지에 저장
//   useEffect(() => {
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }, [favorites]);

//   const deleteProduct = (product) => {
//     setProductToDelete(product);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDeleteProduct = () => {
//     if (productToDelete) {
//       setFavorites((prevFavorites) =>
//         prevFavorites.filter((item) => item.postId !== productToDelete.postId)
//       );
//       dispatch(toggleFavorite(productToDelete));
//       setIsDeleteModalOpen(false);
//       setProductToDelete(null);
//     }
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setProductToDelete(null);
//   };

//   return (
//     <div className="flex">
//       {/* 네비게이션 바 */}
//       <div className="w-full flex" style={{ position: "relative" }}>
//         <div className="w-1/3 p-6 border-r border-gray-300">
//           <div className="menu-item">
//             <Link
//               to="/mypage"
//               className="block text-xl text-gray-600 hover:text-gray-800 mb-4 border-b pb-2"
//             >
//               찜 목록
//             </Link>
//             <Link
//               to="/mypage/payment/history"
//               className="block text-xl text-gray-600 hover:text-gray-800 mb-4 border-b pb-2"
//             >
//               구매내역
//             </Link>
//             <Link
//               to="/mypage/posts"
//               className="block text-xl text-gray-600 hover:text-gray-800 border-b pb-2"
//             >
//               내가 쓴 글
//             </Link>
//           </div>
//         </div>

//         <div className="w-2/3 p-6">
//           <h2 className="text-2xl font-semibold mb-6">찜 목록</h2>

//           {/* 찜한 상품 목록 */}
//           <div className="favorite-products-list space-y-4">
//             {favorites.length > 0 ? (
//               favorites.map((product) => (
//                 <div
//                   key={product.postId}
//                   className="product-item flex items-center mb-4 p-4 border border-gray-300 rounded-md"
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-24 h-24 object-cover mr-4"
//                   />
//                   <div className="product-info flex-1">
//                     <h3 className="text-lg font-semibold">{product.name}</h3>
//                   </div>
//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => deleteProduct(product)}
//                       className="text-red-600 hover:text-red-800 border border-red-600 px-4 py-2 rounded-md"
//                     >
//                       삭제
//                     </button>
//                     <button
//                       className="text-blue-600 hover:text-blue-800 border border-blue-600 px-4 py-2 rounded-md"
//                     >
//                       정보 및 재료 선택
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>찜한 상품이 없습니다.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 삭제 모달 */}
//       {isDeleteModalOpen && (
//         <DeleteModal
//           showModal={isDeleteModalOpen}
//           onClose={closeDeleteModal}
//           onDelete={confirmDeleteProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default MyPageMain;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteModal from "../common/DeleteModal";
import { toggleFavorite } from "../../slices/favoritesSlice";

const MyPageMain = () => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // 로컬 스토리지에서 찜한 상품 초기화
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // 찜한 상품 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const deleteProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.postId !== productToDelete.postId)
      );
      dispatch(toggleFavorite(productToDelete));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto p-6">
      {/* 좌측 메뉴 */}
      <div className="w-full lg:w-1/4 bg-luxury-lightOlive p-4 rounded-lg shadow-md">
        <nav className="space-y-4">
          <Link
            to="/mypage"
            className="block text-lg font-semibold text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b pb-2"
          >
            찜한 상품
          </Link>
          <Link
            to="/mypage/payment/history"
            className="block text-lg font-semibold text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b pb-2"
          >
            구매내역
          </Link>
          <Link
            to="/mypage/posts"
            className="block text-lg font-semibold text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b pb-2"
          >
            내가 쓴 글
          </Link>
          <Link
            to="/mypage/modify"
            className="block text-lg font-semibold text-gray-700 hover:bg-luxury-lightOlive hover:text-white rounded border-b pb-2"
          >
            개인 정보 수정
          </Link>
        </nav>
      </div>

      {/* 찜 목록 */}
      <div className="w-full lg:w-3/4 lg:ml-6 mt-6 lg:mt-0">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">찜 목록</h2>
        {favorites.length > 0 ? (
          <ul className="space-y-6">
            {favorites.map((product) => (
              <li
                key={product.postId}
                className="p-4 bg-white rounded-lg shadow-md border hover:shadow-lg flex items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover mr-4 rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => deleteProduct(product)}
                    className="text-red-600 hover:text-red-800 border border-red-600 px-4 py-2 rounded-md"
                  >
                    삭제
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-800 border border-blue-600 px-4 py-2 rounded-md"
                  >
                    정보 및 재료 선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">찜한 상품이 없습니다.</p>
        )}
      </div>

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <DeleteModal
          showModal={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={confirmDeleteProduct}
        />
      )}
    </div>
  );
};

export default MyPageMain;
