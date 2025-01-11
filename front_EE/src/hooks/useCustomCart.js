// import { useState, useEffect } from "react";

// export const useCustomCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [status, setStatus] = useState("idle");

//   // 장바구니 품목 로드
//   useEffect(() => {
//     const loadCartItems = () => {
//       setStatus("loading");
//       const items = JSON.parse(localStorage.getItem("cartItems")) || []; // 로컬 스토리지에서 카트 데이터 불러오기
//       setCartItems(items);
//       setStatus("loaded");
//     };

//     loadCartItems();
//   }, []);

//   // 모든 카트 품목 삭제
//   const removeAllProductsFromCart = () => {
//     setStatus("loading");
//     setCartItems([]); 
//     localStorage.setItem("cartItems", JSON.stringify([])); // 로컬스토리지에서도 삭제된 상태로 업데이트
//     setStatus("loaded");
//   };

//   // 품목 삭제
//   const removeProductFromCart = (itemId) => {
//     setStatus("loading");
//     const updatedCart = cartItems.filter(item => item.id !== itemId); // 삭제할 아이템을 제외한 나머지 품목
//     setCartItems(updatedCart);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // 로컬 스토리지에 업데이트된 카트 저장
//     setStatus("loaded");
//   };

//   // 품목 추가
//   const addProductToCart = (item) => {
//     setStatus("loading");
//     const updatedCart = [...cartItems, item]; // 기존 카트에 새 품목 추가
//     setCartItems(updatedCart);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // 로컬 스토리지에 추가된 카트 저장
//     setStatus("loaded");
//   };

//   // 품목 수량 업데이트
//   const updateCartItemQuantity = (itemId, quantity) => {
//     setStatus("loading");
//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: quantity } : item // 수량 업데이트
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // 로컬 스토리지에 업데이트된 카트 저장
//     setStatus("loaded");
//   };

//   return { cartItems, status, removeAllProductsFromCart, removeProductFromCart, addProductToCart, updateCartItemQuantity };
// };
