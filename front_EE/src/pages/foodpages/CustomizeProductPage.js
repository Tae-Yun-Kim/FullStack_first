import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMealkitById } from "../../api/categoryApi";
import { addToCartThunk, updateCartItemThunk } from "../../slices/cartSlice";
import { updateCartItem } from "../../api/cartApi";
import { updateProductQuantity } from "../../api/mealkitApi";

const CustomizeProductPage = () => {
  const { mid } = useParams(); // 밀키트 ID 가져오기
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items); // Redux 상태에서 가져오기
  const [products, setProducts] = useState([]); // 재료 목록
  const [selectedProducts, setSelectedProducts] = useState({}); // 선택된 재료와 수량
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격
  const memberEmail = useSelector((state) => state.auth?.email); // 로그인한 사용자 이메일
  const existingItem = cartItems.find(item => item.mid === Number(mid)); // mid가 동일한 항목 검색
  const [selectedQuantity, setSelectedQuantity] = useState(1); // 기본값을 1로 설정

  // 로그인하지 않은 경우
  useEffect(() => {
    if (!memberEmail) {
      alert("로그인이 필요합니다.");
      navigate("/user/login");
    }
  }, [memberEmail, navigate]);

  // 밀키트 정보 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getMealkitById(mid); // 서버에서 밀키트 정보 가져오기
        const formattedProducts = data.products.map((item) => ({
          mpid: item.mpid,
          pid: item.product.pid,
          name: item.product.pname,
          price: item.product.pprice,
          quantity: item.quantity,
        }));
        const initialSelection = formattedProducts.reduce(
          (acc, product) => ({ ...acc, [product.mpid]: product.quantity }),
          {}
        );
        setProducts(formattedProducts);
        setSelectedProducts(initialSelection);
      } catch (error) {
        console.error("밀키트 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchProducts();
  }, [mid]);


//   const handleQuantityChange = async (mpid, newQuantity) => {
//     try {
//         await updateProductQuantity(mpid, newQuantity);
//         alert("수량이 업데이트되었습니다.");
//         // 상태를 업데이트하거나, 새로운 데이터를 가져옵니다.
//     } catch (error) {
//         alert("수량 업데이트에 실패했습니다.");
//     }
// };

  //재료 수량 변경
  const handleQuantityChange = async (mpid, newQuantity) => {
    if (newQuantity < 0) return; // 수량이 음수일 경우 무시
    try {
      await updateProductQuantity(mpid, newQuantity); // 서버 업데이트
      setSelectedProducts((prev) => ({
        ...prev,
        [mpid]: newQuantity,
     }));
    } catch (error) {
      console.error("수량 업데이트 실패:", error);
      alert("수량 업데이트에 실패했습니다.");
    }
  };

  // 총 가격 계산
  useEffect(() => {
    const total = products.reduce((sum, product) => {
      const quantity = selectedProducts[product.mpid] || 0;
      return sum + product.price * quantity;
    }, 0);
    setTotalPrice(total);
  }, [selectedProducts, products]);

  // 장바구니 담기
  const handleAddToCart = async () => {
    const cartItemDTO = {
      ciid: existingItem?.ciid || null, // 수정 시에는 기존 ciid 사용
      email: memberEmail,
      mid: Number(mid), // Mealkit ID
      quantity: selectedQuantity,
      totalPrice, //계산된 총금액
      products: Object.entries(selectedProducts).map(([mpid, quantity]) => ({
        mpid : Number(mpid),
        quantity,
      })),
    };

    // const cartItemDTO = {
    //   email: memberEmail,
    //   mealkitId: mid,
    //   products: Object.entries(selectedProducts).map(([mpid, quantity]) => ({
    //     mpid: Number(mpid),
    //     quantity,
    //   })),
    // };

  
    console.log("장바구니 요청 데이터:", cartItemDTO); // 데이터 확인
  
    try {
      await dispatch(updateCartItemThunk(cartItemDTO)).unwrap();
      alert("장바구니에 추가되었습니다.");
      
      setSelectedProducts(products.reduce((acc, product) => {
        acc[product.mpid] = product.quantity;
        return acc;
      }, {}));
      setSelectedQuantity(1);
      
      navigate("/mypage/cart");
    } catch (error) {
      console.error("장바구니 추가 실패:", error); // 에러 로그 출력
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-md bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">밀키트 구성</h1>

      {/* 재료 목록 */}
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.mpid}
            className="flex items-center justify-between border border-gray-300 rounded-lg p-4 bg-white shadow"
          >
            {/* 재료 정보 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.price}원</p>
            </div>

            {/* 수량 조정 */}
            <div className="flex items-center">
              <button
                onClick={() =>
                  handleQuantityChange(
                    product.mpid,
                    selectedProducts[product.mpid] - 1
                  )
                }
                disabled={selectedProducts[product.mpid] <= 0}
                className={`w-8 h-8 bg-luxury-lightOlive text-white rounded-l hover:bg-luxury-darkerOlive ${
                  selectedProducts[product.mpid] <= 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : ""
                }`}
              >
                -
              </button>
              <input
                type="text"
                value={selectedProducts[product.mpid]}
                readOnly
                className="w-12 text-center border border-gray-300 rounded-md mx-2"
              />
              <button
                onClick={() =>
                  handleQuantityChange(
                    product.mpid,
                    selectedProducts[product.mpid] + 1
                  )
                }
                className="w-8 h-8 bg-luxury-lightOlive text-white rounded-r hover:bg-luxury-darkerOlive"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 총 가격 및 장바구니 담기 */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          총 가격: {totalPrice.toLocaleString()}원
        </h2>
        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-luxury-lightOlive text-gray-600 font-bold rounded-lg hover:bg-luxury-darkerOlive"
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default CustomizeProductPage;
