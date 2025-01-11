// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchCartItems, updateCartItem, removeCartItem } from '../api/cartApi';

// // 장바구니 데이터 가져오기
// export const fetchCartItemsThunk = createAsyncThunk(
//   'cart/fetchCartItems',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchCartItems();
//       return response; // 서버에서 받은 데이터를 그대로 반환
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // 장바구니 항목 추가 또는 수정
// export const updateCartItemThunk = createAsyncThunk(
//   'cart/updateCartItem',
//   async (item, { rejectWithValue }) => {
//     try {
//       const response = await updateCartItem(item);
//       return response; // 갱신된 데이터 반환
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // 장바구니 항목 삭제
// export const removeCartItemThunk = createAsyncThunk(
//   'cart/removeCartItem',
//   async (ciid, { rejectWithValue }) => {
//     try {
//       const response = await removeCartItem(ciid);
//       return response; // 갱신된 데이터 반환
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Redux Slice 생성
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [], // 장바구니 항목
//     status: 'idle', // 상태 (idle, loading, succeeded, failed)
//     error: null, // 오류 상태
//   },
//   reducers: {}, // 추가적인 동기 액션을 원한다면 여기서 정의
//   extraReducers: (builder) => {
//     builder
//       // Fetch Cart Items
//       .addCase(fetchCartItemsThunk.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload || []; // 가져온 데이터로 상태 업데이트
//       })
//       .addCase(fetchCartItemsThunk.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || action.error.message;
//       })
//       // Update Cart Item
//       .addCase(updateCartItemThunk.fulfilled, (state, action) => {
//         state.items = action.payload || []; // 업데이트된 데이터로 상태 갱신
//       })
//       // Remove Cart Item
//       .addCase(removeCartItemThunk.fulfilled, (state, action) => {
//         state.items = action.payload || []; // 삭제 후 갱신된 데이터로 상태 갱신
//       });
//   },
// });

// export default cartSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCartItems, updateCartItem, removeCartItem } from '../api/cartApi';

// 장바구니 데이터 가져오기
// export const fetchCartItemsThunk = createAsyncThunk(
//   'cart/fetchCartItems',
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await fetchCartItems(email);
//       return response; // 서버에서 받은 데이터를 그대로 반환
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
export const fetchCartItemsThunk = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const email = state.auth?.email;
    const token = state.auth?.token;

    if (!email || !token) {
      return rejectWithValue("사용자 정보가 없습니다.");
    }

    try {
      const response = await fetchCartItems(email, token);
      return response; // 서버에서 받은 데이터를 그대로 반환
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 장바구니 항목 추가 또는 수정
export const updateCartItemThunk = createAsyncThunk(
  'cart/updateCartItem',
  async (cartItemDTO, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(cartItemDTO);
      if (!Array.isArray(response) || response.some((item) => !item.ciid)) {
        throw new Error("응답 데이터에 유효하지 않은 항목이 포함되어 있습니다.");
      }
      return response; // 추가 또는 수정된 항목 반환
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 장바구니 항목 삭제
export const removeCartItemThunk = createAsyncThunk(
  'cart/removeCartItem',
  async (ciid, { rejectWithValue }) => {
    try {
      const response = await removeCartItem(ciid);
      return { ciid, updatedItems: response }; // 삭제된 항목 반환
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux Slice 생성
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // 장바구니 항목
    status: 'idle', // 상태 (idle, loading, succeeded, failed)
    error: null, // 오류 상태
  },
  reducers: {
    resetCart(state) {
      // 장바구니 초기화 액션
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
    addToCart: (state, action) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice; // 총 가격 저장
    },
    updateTotalPrice: (state, action) => {
      state.totalPrice = action.payload; // 총 가격 업데이트
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItemsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload || []; // 가져온 데이터로 상태 업데이트
      })
      .addCase(fetchCartItemsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Update Cart Item
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        const updatedItems = action.payload || []; // 서버에서 반환된 데이터
        updatedItems.forEach((updatedItem) => {
            if (!updatedItem.ciid) {
                console.error("ciid가 없는 항목:", updatedItem);
                return; // 잘못된 항목은 무시
            }
    
            const existingIndex = state.items.findIndex((item) => item.ciid === updatedItem.ciid);
            if (existingIndex !== -1) {
                // 기존 항목 업데이트
                state.items[existingIndex] = { ...state.items[existingIndex], ...updatedItem };
            } else {
                // 새 항목 추가
                state.items.push(updatedItem);
            }
        });
    })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // Remove Cart Item
      .addCase(removeCartItemThunk.fulfilled, (state, action) => {
        const removedCiid = action.payload.ciid;
        state.items = state.items.filter((item) => item.ciid !== removedCiid); // 삭제된 항목 제외
      })
      .addCase(removeCartItemThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCart, addToCart, updateTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
