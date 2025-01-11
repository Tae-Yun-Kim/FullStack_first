// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCartItemsThunk, updateCartItemThunk, removeCartItemThunk } from "../../slices/cartSlice";
// import AddressForm from "../../components/user/AddressForm";
// import { processPayment } from "../../api/payMentApi";

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const [address, setAddress] = useState("서울특별시 강남구 테헤란로 123");
//   const [paymentStatus, setPaymentStatus] = useState(null);

//   // 장바구니 데이터 가져오기
//   useEffect(() => {
//     dispatch(fetchCartItemsThunk());
//   }, [dispatch]);

//   // 배송지 업데이트
//   const handleAddressUpdated = (newAddress) => {
//     setAddress(newAddress);
//     alert("배송지가 성공적으로 업데이트되었습니다!");
//   };

//   // 결제 처리
//   const handlePayment = async () => {
//     if (!address) {
//       alert("배송지 주소를 입력해주세요!");
//       return;
//     }
//     const paymentData = { cartItems, address };
//     const result = await processPayment(paymentData);
//     setPaymentStatus(result.success ? "결제 성공!" : `결제 실패: ${result.message}`);
//   };

//   // 수량 증가
//   const handleIncreaseQuantity = (itemId) => {
//     const item = cartItems.find((item) => item.id === itemId);
//     if (item) {
//       const newQuantity = (item.quantity || 1) + 1;
//       dispatch(updateCartItemThunk({ ciid: item.id, quantity: newQuantity }));
//     }
//   };

//   // 수량 감소
//   const handleDecreaseQuantity = (itemId) => {
//     const item = cartItems.find((item) => item.id === itemId);
//     if (item) {
//       if (item.quantity === 1) {
//         handleRemoveItem(itemId);
//       } else {
//         const newQuantity = item.quantity - 1;
//         dispatch(updateCartItemThunk({ ciid: item.id, quantity: newQuantity }));
//       }
//     }
//   };

//   // 항목 삭제
//   const handleRemoveItem = (itemId) => {
//     dispatch(removeCartItemThunk(itemId));
//   };

//   // 전체 항목 삭제
//   const handleRemoveAllItems = () => {
//     cartItems.forEach((item) => dispatch(removeCartItemThunk(item.id)));
//   };

//   // 총 가격 계산
//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
//   };

//   return (
//     <div className="container mx-auto py-8 bg-gray-100">
//       <h1 className="text-center text-2xl font-semibold mb-6">장바구니</h1>
//       <div className="flex mb-8">
//         <div className="w-2/3 pr-4">
//           {cartItems.length === 0 ? (
//             <div className="flex flex-col justify-center items-center h-full">
//               <span role="img" aria-label="empty-cart" className="text-4xl mb-4 text-gray-500">🛒</span>
//               <p className="text-2xl text-gray-500">장바구니에 담긴 상품이 없습니다.</p>
//             </div>
//           ) : (
//             <div className="bg-white p-4 shadow-md rounded-lg border border-gray-300">
//               <div className="flex justify-between items-center py-4 border-b">
//                 <button onClick={handleRemoveAllItems} className="text-red-500 font-semibold">전체 삭제</button>
//               </div>
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex justify-between items-center py-6 border-b">
//                   <div className="flex items-center">
//                     <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4" />
//                     <div>
//                       <div className="font-medium text-gray-700">{item.name}</div>
//                       <div className="text-gray-500">{item.price.toLocaleString()}원</div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => handleDecreaseQuantity(item.id)}
//                           className={`px-3 py-1 rounded-l ${
//                             item.quantity <= 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
//                           }`}
//                           disabled={item.quantity <= 1}
//                         >
//                           -
//                         </button>
//                         <span>{item.quantity || 1}</span>
//                         <button
//                           onClick={() => handleIncreaseQuantity(item.id)}
//                           className="px-3 py-1 rounded-r bg-blue-500 text-white hover:bg-blue-600"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 px-2 py-1 border border-red-500 rounded-md">삭제</button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="w-2/5 pl-4">
//           <div className="mb-8">
//             <div className="bg-white p-4 shadow-md rounded-lg mb-6 border border-gray-300">
//               <div className="flex items-center mb-4">
//                 <span role="img" aria-label="delivery" className="text-2xl mr-4">🚚</span>
//                 <h2 className="text-xl font-semibold">배송지</h2>
//               </div>
//               <AddressForm currentAddress={address} onAddressUpdated={handleAddressUpdated} />
//             </div>
//             <div className="bg-white p-4 shadow-md rounded-lg border border-gray-300">
//               <h2 className="text-xl font-semibold mb-4">💰 결제금액</h2>
//               <div className="mb-4">
//                 <div className="flex p-2 justify-between text-gray-700">
//                   <span>상품금액</span>
//                   <span>{calculateTotalPrice().toLocaleString()}원</span>
//                 </div>
//                 <div className="flex p-2 justify-between text-gray-700">
//                   <span>배송비</span>
//                   <span>3,000원</span>
//                 </div>
//                 <div className="flex p-2 justify-between text-xl font-semibold">
//                   <span>합계</span>
//                   <span>{(calculateTotalPrice() + 3000).toLocaleString()}원</span>
//                 </div>
//               </div>
//               <button onClick={handlePayment} className="w-full bg-gray-200 text-black py-3 rounded-md text-lg mt-2">
//                 주문하기
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {paymentStatus && <div className="text-center text-lg font-semibold mt-6">{paymentStatus}</div>}
//     </div>
//   );
// };

// export default CartPage;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCartItemsThunk, updateCartItemThunk } from "../../slices/cartSlice";
// import axios from "axios";
// import { API_SERVER_HOST } from "../../api/todoApi";
// import { Navigate, useNavigate } from "react-router-dom";

// const CartPage = () => {
//   const navigate = useNavigate(); // 최상위에서 훅 호출
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const { email, name } = useSelector((state) => state.auth); // Redux에서 회원 정보 가져오기
//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   useEffect(() => {
//     if (email) {
//       dispatch(fetchCartItemsThunk({email}))
//         .unwrap()
//         .then((data) => console.log("장바구니 데이터:", data)) // 성공 시 데이터 확인
//         .catch((error) => console.error("장바구니 데이터 로드 실패:", error)); // 에러 확인
//     }
//   }, [email, dispatch]);

//   // 수량 변경 핸들러
//   const handleQuantityChange = async (ciid, mid, currentQuantity, type) => {
//     let newQuantity = currentQuantity;
  
//     // 수량 계산
//     if (type === "increase") {
//       newQuantity = currentQuantity + 1;
//     } else if (type === "decrease" && currentQuantity > 1) {
//       newQuantity = currentQuantity - 1;
//     } else if (type === "decrease" && currentQuantity === 1) {
//       // 수량이 1 이하인 경우 삭제 로직
//       if (window.confirm("상품을 삭제하시겠습니까?")) {
//         await handleDeleteCartItem(ciid); // 삭제 로직 호출
//         return;
//       }
//     }

//     console.log("수량 변경 요청 데이터:", { ciid, mid, newQuantity, type });
  
//     // 수량 변경 요청 전송
//     try {
//       const response = await axios.post("http://localhost:8080/cart/change", {
//         ciid,        // 장바구니 항목 ID
//         mid,         // Mealkit ID
//         quantity: newQuantity, // 변경할 수량
//         email: email,    // 사용자 이메일
//       });
  
//       console.log("수량 변경 성공:", response.data);
//       dispatch(fetchCartItemsThunk(email)); // 최신 장바구니 데이터 로드
//     } catch (error) {
//       console.error("수량 변경 실패:", error.response?.data || error.message);
//       alert("수량 변경 중 문제가 발생했습니다.");
//     }
//   };

//   const handleDeleteCartItem = async (ciid) => {
//     try {
//       const response = await axios.delete(`http://localhost:8080/cart/${ciid}`);
//       console.log("장바구니 항목 삭제 성공:", response.data);
  
//       // 장바구니 데이터 새로 고침
//       dispatch(fetchCartItemsThunk(email));
//     } catch (error) {
//       console.error("장바구니 항목 삭제 실패:", error.response?.data || error.message);
//       alert("항목 삭제 중 문제가 발생했습니다.");
//     }
//   };

//   // 총 가격 계산
//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
//   };

//   // 결제 버튼 핸들러
//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("장바구니가 비어 있습니다.");
//       return;
//     }

//     // 결제 페이지로 이동하며 데이터 전달
//     navigate("/payment", { state: { email, name, totalPrice } });
//   };

//   return (
//     <div>
//       <h1>장바구니</h1>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.ciid} style={{ marginBottom: "10px", listStyle: "none" }}>
//             <div>
//               <strong>{item.mname}</strong> ({item.price.toLocaleString()}원)
//             </div>
//             <div className="flex items-center space-x-2">
//             <img
//               src={`http://localhost:8080/mealkits/view/${item.imageFile}`} // 이미지 경로 설정
//               alt={item.mname}
//               style={{ width: "200px", height: "200px" }}
//             />
//               <button
//                onClick={() => handleQuantityChange(item.ciid, item.mid, item.quantity, "decrease")}
//                className={`px-3 py-1 rounded-l ${
//                   item.quantity <= 1
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                }`}
//                disabled={item.quantity <= 1}
//               >
//                 -
//              </button>
//              <span>{item.quantity || 1}</span>
//              <button
//                onClick={() => handleQuantityChange(item.ciid, item.mid, item.quantity, "increase")}
//                className="px-3 py-1 rounded-r bg-blue-500 text-white hover:bg-blue-600"
//              >
//                +
//              </button>
//              <button
//   onClick={() => handleDeleteCartItem(item.ciid)}
//   className="text-red-500 px-2 py-1 border border-red-500 rounded-md"
// >
//   삭제
// </button>
//             </div>
//             <div>상품 총액: {(item.price * item.quantity).toLocaleString()}원</div>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <h2>총 결제 금액: {totalPrice.toLocaleString()}원</h2>
//         <button
//           onClick={handleCheckout}
//           className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//         >
//           결제하기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemsThunk, updateCartItemThunk } from "../../slices/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태
  const reduxCartItems = useSelector((state) => state.cart.items);
  const { email, name } = useSelector((state) => state.auth);

  // 로컬 상태
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Redux에서 가져온 데이터를 로컬 상태에 저장
  useEffect(() => {
    setCartItems(reduxCartItems);
  }, [reduxCartItems]);

  // 총 금액 업데이트
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // 장바구니 데이터 초기 로드
  useEffect(() => {
    if (email) {
      dispatch(fetchCartItemsThunk({ email }))
        .unwrap()
        .then((data) => console.log("장바구니 데이터 로드 성공:", data))
        .catch((error) => console.error("장바구니 데이터 로드 실패:", error));
    }
  }, [email, dispatch]);

  // 수량 변경 핸들러
  const handleQuantityChange = async (ciid, mid, currentQuantity, type) => {
    let newQuantity = currentQuantity;

    if (type === "increase") {
      newQuantity = currentQuantity + 1;
    } else if (type === "decrease" && currentQuantity > 1) {
      newQuantity = currentQuantity - 1;
    } else if (type === "decrease" && currentQuantity === 1) {
      if (window.confirm("상품을 삭제하시겠습니까?")) {
        await handleDeleteCartItem(ciid);
        return;
      }
    }

    // 로컬 상태 업데이트
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.ciid === ciid ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      await axios.post("http://localhost:8080/cart/change", {
        ciid,
        mid,
        quantity: newQuantity,
        email,
      });
      dispatch(fetchCartItemsThunk({ email })); // Redux 상태 동기화
    } catch (error) {
      console.error("수량 변경 실패:", error.response?.data || error.message);
      alert("수량 변경 중 문제가 발생했습니다.");
    }
  };

  // 항목 삭제 핸들러
  const handleDeleteCartItem = async (ciid) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${ciid}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.ciid !== ciid));
      dispatch(fetchCartItemsThunk({ email })); // Redux 상태 동기화
    } catch (error) {
      console.error("항목 삭제 실패:", error.response?.data || error.message);
      alert("항목 삭제 중 문제가 발생했습니다.");
    }
  };

  // 결제 버튼 핸들러
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }

    navigate("/payment", { state: { email, name, totalPrice } });
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50">
  <h1 className="text-2xl font-semibold text-center mb-6">장바구니</h1>
  <ul className="space-y-4">
    {cartItems.map((item) => (
      <li
        key={item.ciid}
        className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between border border-gray-200"
      >
        {/* 상품 이미지와 정보 */}
        <div className="flex items-center">
          <img
            src={`http://localhost:8080/mealkits/view/${item.imageFile}`}
            alt={item.mname}
            className="w-24 h-24 rounded-md object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{item.mname}</h3>
            <p className="text-sm text-gray-500">{item.price.toLocaleString()}원</p>
          </div>
        </div>

        {/* 수량 조절 및 삭제 버튼 */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button
              onClick={() =>
                handleQuantityChange(item.ciid, item.mid, item.quantity, "decrease")
              }
              className={`px-3 py-1 rounded-l ${
                item.quantity <= 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-luxury-lightOlive text-gray-600 fint-bold hover:bg-luxury-darkerOlive"
              }`}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="text-lg font-medium mx-2">{item.quantity || 1}</span>
            <button
              onClick={() =>
                handleQuantityChange(item.ciid, item.mid, item.quantity, "increase")
              }
              className="px-3 py-1 rounded-r bg-luxury-lightOlive text-gray-600 font-bold hover:bg-luxury-darkerOlive"
            >
              +
            </button>
          </div>
          <button
            onClick={() => handleDeleteCartItem(item.ciid)}
            className="text-red-500 px-2 py-1 border border-red-500 rounded-md hover:bg-red-600 hover:text-white"
          >
            삭제
          </button>
        </div>
      </li>
    ))}
  </ul>

  {/* 총 결제 금액 및 결제 버튼 */}
  <div className="bg-white p-4 rounded-lg shadow-md mt-6 text-right">
    <h2 className="text-xl font-semibold text-gray-800">
      총 결제 금액: {totalPrice.toLocaleString()}원
    </h2>
    <button
      onClick={handleCheckout}
      className="mt-4 px-6 py-3 bg-luxury-lightOlive text-gray-600 font-bold rounded-md shadow hover:bg-luxury-darkerOlive"
    >
      결제하기
    </button>
  </div>
</div>
  );
};

export default CartPage;
