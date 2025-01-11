import React, { useState, useEffect } from "react";
import { createMealkit } from "../../api/mealkitApi";
import { fetchProducts } from "../../api/productApi"; // 제품 데이터 가져오는 API
import { MdUploadFile } from "react-icons/md";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


const MealkitRegisterPage = () => {
    const navigate = useNavigate();
  const [mealkit, setMealkit] = useState({
    mname: "",
    price: 0,
    recipe: "",
    category: "",
  });
  const [files, setFiles] = useState([]);
  const [products, setProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]); // 드롭다운용 데이터

  // 서버에서 제품 데이터 가져오기
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log("Fetched products:", data); // API로부터 반환된 데이터를 확인
        setAvailableProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        alert("제품 정보를 가져오는데 실패했습니다.");
      }
    };
    loadProducts();
  }, []);

  // 제품 가격 합계 계산
  useEffect(() => {
    const calculatePrice = () => {
      const totalPrice = products.reduce((sum, product) => {
        const selectedProduct = availableProducts.find(
          (p) => p.pid === parseInt(product.productId)
        );
        if (selectedProduct) {
          return sum + selectedProduct.pprice * product.quantity;
        }
        return sum;
      }, 0);
      setMealkit((prevMealkit) => ({ ...prevMealkit, price: totalPrice }));
    };

    calculatePrice();
  }, [products, availableProducts]); // products 또는 availableProducts가 변경될 때 재계산


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMealkit({ ...mealkit, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { productId: "", productName: "", quantity: 0 },
    ]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // JSON 데이터를 추가
    const mealkitData = {
      mname: mealkit.mname,
      price: mealkit.price,
      recipe: mealkit.recipe,
      category: mealkit.category,
      products: products.map((product) => ({
        product: { pid: product.productId },
        quantity: parseInt(product.quantity),
      })),
    };
    formData.append("mealkit", new Blob([JSON.stringify(mealkitData)], { type: "application/json" }));
  
    // 파일 데이터 추가
    files.forEach((file) => {
      formData.append("files", file);
    });
  
    console.log("Sending mealkit data:", formData);
  
    try {
      const result = await axios.post("http://localhost:8080/mealkits/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // 인증 정보 포함
      });
      alert(`밀키트 등록 성공! ID: ${result.data.result}`);
      navigate("/")
    } catch (error) {
      console.error("밀키트 등록 오류:", error);
      alert(`밀키트 등록 실패: ${error.message}`);
    }
  };
  

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">밀키트 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            밀키트 이름:
          </label>
          <input
            type="text"
            name="mname"
            value={mealkit.mname}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            가격:
          </label>
          <input
            type="number"
            name="price"
            value={mealkit.price}
            onChange={handleInputChange}
            readOnly
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            레시피:
          </label>
          <textarea
            name="recipe"
            value={mealkit.recipe}
            onChange={handleInputChange}
            required
            rows={4}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            카테고리:
          </label>
          <select
            name="category"
            value={mealkit.category}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
          >
            <option value="" disabled>
              선택하세요
            </option>
            <option value="KOREAN">한식</option>
            <option value="CHINESE">중식</option>
            <option value="JAPANESE">일식</option>
            <option value="WESTERN">양식</option>
            <option value="ETC">기타</option>
          </select>
        </div>

        {/* 파일 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            파일 업로드:
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-600"
          />
        </div>

        {/* 제품 추가 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            제품 추가:
          </label>
          {products.map((product, index) => (
            <div key={index} className="flex items-center space-x-4 mt-2">
              <select
                value={product.productId}
                onChange={(e) =>
                  handleProductChange(index, "productId", e.target.value)
                }
                className="p-2 block w-1/2 border rounded-md shadow-sm"
              >
                <option value="">제품 선택</option>
                {availableProducts.map((availableProduct) => (
                  <option
                    key={availableProduct.pid}
                    value={availableProduct.pid}
                  >
                    {`${availableProduct.pname} - ${availableProduct.pprice}원`}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="수량"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(index, "quantity", e.target.value)
                }
                className="p-2 block w-1/4 border rounded-md shadow-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProduct}
            className="mt-2 px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
          >
            제품 추가
          </button>
        </div>

        {/* 등록 버튼 */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default MealkitRegisterPage;
