import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie, removeCookie } from '../util/authCookieUtil';
import { loginPost, signupPost } from '../api/loginApi';
import axios from 'axios';


const getMemberCookie = () => {
  try {
    return JSON.parse(getCookie('member')) || {};
  } catch {
    return {};
  }
};


const initState = {
  email: getMemberCookie()?.email || null,
  name: getMemberCookie()?.name || '',
  token: getMemberCookie()?.token || null,
  adress: getMemberCookie?.adress || null,
  error: null,
  attempts: 0,
  isLocked: false,
  isLoading: false,
};

// 일반 로그인 요청
// export const loginPostAsync = createAsyncThunk(
//   'loginPostAsync',
//   async (param, { rejectWithValue }) => {
//     try {
//       const data = await loginPost(param);
//       if (data && data.token) {
//         setCookie('member', JSON.stringify(data), 1);
//         return data;
//       } else {
//         throw new Error('응답에 토큰이 없습니다.');
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || '로그인 실패');
//     }
//   }
// );

// 로그인 요청 (토큰 + 사용자 정보)
// export const loginPostAsync = createAsyncThunk(
//   "auth/loginPostAsync",
//   async (param, { rejectWithValue }) => {
//     try {
//       const loginResponse = await loginPost(param); // 로그인 요청
//       const token = loginResponse.token;

//       // 토큰으로 사용자 정보 가져오기
//       const userInfo = await fetchUserInfo(token);
//       const data = { token, ...userInfo }; // 토큰 + 사용자 정보 결합

//       setCookie("member", JSON.stringify(data), 1); // 쿠키 저장
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "로그인 실패");
//     }
//   }
// );

// 일반 로그인 요청
export const loginPostAsync = createAsyncThunk(
  "auth/loginPostAsync",
  async (param, { rejectWithValue }) => {
    try {
      const response = await loginPost(param); // 로그인 API 호출
      const data = response; // { token, email, name } 응답 데이터
      console.log("로그인 응답 데이터:", data);

      // 쿠키에 저장
      setCookie("member", JSON.stringify(data), 1);

      return data;
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "로그인 실패");
    }
  }
);

// 소셜 로그인 요청
export const socialLoginAsync = createAsyncThunk(
  'socialLoginAsync',
  async ({ token, user }, { rejectWithValue }) => {
    try {
      const data = { token, ...user }; // 소셜 로그인 데이터 구성
      setCookie('member', JSON.stringify(data), 1); // 쿠키에 저장
      return data;
    } catch (error) {
      return rejectWithValue('소셜 로그인 처리 실패');
    }
  }
);

// 회원가입 요청
export const signupPostAsync = createAsyncThunk(
  'signupPostAsync',
  async (param, { rejectWithValue }) => {
    try {
      const data = await signupPost(param);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || '회원가입 실패');
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/member", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "사용자 정보 가져오기 실패");
    }
  }
);

// const authSlice = createSlice({
//   name: 'authSlice',
//   initialState: initState,
//   reducers: {
//     login: (state, action) => {
//       const payload = action.payload;
//       setCookie('member', JSON.stringify(payload), 1);
//       return { ...state, ...payload, attempts: 0, isLocked: false };
//     },
//     logout: () => {
//       removeCookie('member');
//       return { ...initState };
//     },
//     restoreLogin: (state) => {
//       const cookieData = (() => {
//         try {
//           const data = JSON.parse(getCookie('member')) || {};
//           console.log('restoreLogin 쿠키 데이터:', data); // 디버깅 로그
//           return data;
//         } catch (error) {
//           console.error('restoreLogin 쿠키 읽기 실패:', error);
//           return {};
//         }
//       })();
//       if (cookieData.token) {
//         console.log('Redux 상태 복원:', cookieData);
//         return { ...state, ...cookieData, isLoading: false };
//       }
//       console.log('쿠키 데이터 없음, 초기 상태 유지');
//       return state;
//     },
    
  
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginPostAsync.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginPostAsync.fulfilled, (state, action) => {
//         setCookie("member", JSON.stringify(action.payload), 1);
//         return { ...state, ...action.payload, isLoading: false, error: null };
//       })
//       .addCase(loginPostAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || '로그인 실패';
//       })
//       .addCase(socialLoginAsync.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(socialLoginAsync.fulfilled, (state, action) => {
//         return { ...state, ...action.payload, isLoading: false, error: null };
//       })
//       .addCase(socialLoginAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || '소셜 로그인 실패';
//       })

//       .addCase(fetchUserInfo.fulfilled, (state, action) => {
//         console.log("사용자 정보 업데이트:", action.payload);
//         return { ...state, ...action.payload, isLoading: false, error: null };
//       })
//       .addCase(fetchUserInfo.rejected, (state, action) => {
//         state.error = action.payload || "사용자 정보 가져오기 실패";
//       });
//   },
// });
const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    restoreLogin: (state) => {
      const cookieData = getMemberCookie();
      console.log("쿠키에서 복원된 데이터:", cookieData);

      if (cookieData?.token) {
        return { ...state, ...cookieData, isLoading: false };
      }
      console.log("로그인 상태 복원 실패: 쿠키 데이터 없음");
      return state;
    },
    logout: (state) => {
      console.log("로그아웃 실행: 쿠키 삭제");
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("로그인 성공 데이터:", action.payload);
        return { ...state, ...action.payload, isLoading: false, error: null };
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.error("로그인 실패:", action.payload);
        state.isLoading = false;
        state.error = action.payload || "로그인 실패";
      })
      .addCase(signupPostAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupPostAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signupPostAsync.rejected, (state, action) => {
        console.error("회원가입 실패:", action.payload);
        state.isLoading = false;
        state.error = action.payload || "회원가입 실패";
      });
  },
});


export const { login, logout, restoreLogin } = authSlice.actions;
export default authSlice.reducer;
