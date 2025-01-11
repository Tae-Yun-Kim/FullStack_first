// import { Suspense, lazy } from 'react';
// import { createBrowserRouter, Navigate } from 'react-router-dom';
// import todoRouter from './todoRouter';
// import productsRouter from './productsRouter';
// import userRouter from './userRouter';
// import foodRouter from './foodRouter'; // 추가
// import WriteInquiry from '../pages/customerSupport/WriteInquiry';

// const Main = lazy(() => import('../pages/MainPage'));
// const About = lazy(() => import('../pages/AboutPage'));
// const TodoIndex = lazy(() => import('../pages/todo/IndexPage'));
// const ProductsRouter = lazy(() => import('../pages/products/IndexPage'));
// const MyPageMain = lazy(() => import('../components/mypage/MyPageMain'));
// const CartPage = lazy(() => import('../components/mypage/CartPage'));
// const ProfilePage = lazy(() => import('../components/mypage/ProfilePage'));
// const HistoryPage = lazy(() => import('../components/mypage/HistoryPage'));
// const PostsPage = lazy(() => import('../components/mypage/PostsPage'));
// const ModifyPage = lazy(() => import('../pages/user/ModifyPage')); // 회원정보 수정 페이지 추가
// const PasswordConfirmPage = lazy(() =>
//   import('../pages/user/PasswordConfirmPage')
// ); // 비밀번호 확인 페이지 추가
// const CustomerSupportPage = lazy(() =>
//   import('../pages/customerSupport/CustomerSupportPage')
// );
// const NavigationMenu = lazy(() => import('../components/menus/NavigationMenu'));

// const SearchResultsPage = lazy(() => import('../pages/SearchResultsPage')); // 검색 결과 페이지 추가

// const Loading = <div>Loading...</div>;

// /**
//  * NavigationMenu를 포함하는 컴포넌트 래퍼
//  */
// const withNavigation = (Component) => (
//   <Suspense fallback={Loading}>
//     <NavigationMenu />
//     <Component />
//   </Suspense>
// );

// // 보호된 경로 (비밀번호 확인 필요)
// const PasswordProtectedRoute = ({ children }) => {
//   const isPasswordConfirmed =
//     localStorage.getItem('passwordConfirmed') === 'true'; // 값이 "true"인지 명확히 확인
//   return isPasswordConfirmed ? (
//     children
//   ) : (
//     <Navigate to="/mypage/password-confirm" />
//   );
// };

// const root = createBrowserRouter([
//   { path: '/', element: withNavigation(Main) },
//   { path: '/about', element: withNavigation(About) },
//   { path: '/todo', element: withNavigation(TodoIndex), children: todoRouter() },
//   {
//     path: '/products',
//     element: withNavigation(ProductsRouter),
//     children: productsRouter(),
//   },
//   { path: '/user', children: userRouter() },
//   { path: '/page', children: foodRouter() },

//   // 마이페이지 관련 경로
//   { path: '/mypage', element: withNavigation(MyPageMain) }, // 마이페이지 메인
//   { path: '/mypage/favorites', element: withNavigation(MyPageMain) },
//   { path: '/mypage/cart', element: withNavigation(CartPage) },
//   { path: '/mypage/profile', element: withNavigation(ProfilePage) },
//   { path: '/mypage/history', element: withNavigation(HistoryPage) },
//   { path: '/mypage/posts', element: withNavigation(PostsPage) },
//   {
//     path: '/mypage/password-confirm',
//     element: withNavigation(PasswordConfirmPage),
//   }, // 비밀번호 확인 페이지 추가
//   {
//     path: '/mypage/modify',
//     element: (
//       <PasswordProtectedRoute>
//         {withNavigation(ModifyPage)}
//       </PasswordProtectedRoute>
//     ),
//   },

//   { path: '/support', element: withNavigation(CustomerSupportPage) },
//   { path: '/write', element: withNavigation(WriteInquiry) },

//   // 검색 결과 페이지 경로 추가
//   { path: '/search', element: withNavigation(SearchResultsPage) }, // 검색 결과 페이지 경로
// ]);

// export default root;

// import { Suspense, lazy } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import todoRouter from "./todoRouter";
// import productsRouter from "./productsRouter";
// import userRouter from "./userRouter";
// import WriteInquiry from "../pages/customerSupport/WriteInquiry";
// // import qnaRouter from './qnaRouter'; // QnA 라우터 임포트
// import { Outlet } from 'react-router-dom'
// // import communityRouter from './communityRouter';
// import SearchResultPage from '../pages/foodpages/SearchResultPage';
// import CustomizeProductPage from '../pages/foodpages/CustomizeProductPage';
// import RecipePage from "../pages/mainpages/FavoriteRecipes";

// // Lazy-load 컴포넌트 정의
// const Main = lazy(() => import("../pages/MainPage"));
// const About = lazy(() => import("../pages/AboutPage"));
// const TodoIndex = lazy(() => import("../pages/todo/IndexPage"));
// const ProductsRouter = lazy(() => import("../pages/products/IndexPage"));
// // const QnAIndex = lazy(() => import('../pages/qna/IndexPage_q'));
// // const CommunityIndex = lazy(() => import('../pages/community/IndexPage_c'));


// // FoodPage 관련 컴포넌트
// const KoreanFoodPage = lazy(() => import("../pages/foodpages/KoreanFoodPage"));
// const JapaneseFoodPage = lazy(() => import("../pages/foodpages/JapaneseFoodPage"));
// const ChineseFoodPage = lazy(() => import("../pages/foodpages/ChineseFoodPage"));
// const WesternFoodPage = lazy(() => import("../pages/foodpages/WesternFoodPage"));
// const EtcFoodPage = lazy(() => import("../pages/foodpages/EtcFoodPage"));
// const MealKitPage = lazy(() => import("../pages/foodpages/MealKitPage"));

// // 마이페이지 관련 컴포넌트 Lazy-load
// const MyPageMain = lazy(() => import("../components/mypage/MyPageMain"));
// const CartPage = lazy(() => import("../components/mypage/CartPage"));
// const ProfilePage = lazy(() => import("../components/mypage/ProfilePage"));
// const HistoryPage = lazy(() => import("../components/mypage/HistoryPage"));
// const PostsPage = lazy(() => import("../components/mypage/PostsPage"));
// // const RegisterPage = lazy(() => import("../components/mypage/RegisterPage"));


// //고객센터
// const CustomerSupportPage = lazy(() => import("../pages/customerSupport/CustomerSupportPage"));

// // NavigationMenu 컴포넌트 추가 (Lazy-load 방식으로 처리 가능)
// const NavigationMenu = lazy(() => import("../components/menus/NavigationMenu"));


// const Loading = <div>Loading....</div>;

// /**
//  * 루트 경로와 하위 라우팅 설정
//  */
// const root = createBrowserRouter([
//   {
//     path: "/", // 메인 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <Main />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/about", // 소개 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <About />
//       </Suspense>
//     ),
//   },
//   {
//     path: "products", // 제품 관리 경로
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <ProductsRouter />
//       </Suspense>
//     ),
//     children: productsRouter(),
//   },
//   {
//     path: "user", // 사용자 관련 경로
//     children: userRouter(),
//   },
//   // 마이페이지 관련 독립적인 경로
//   {
//     path: "/mypage/favorites", // 마이페이지 메인
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <MyPageMain />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/mypage/cart", // 장바구니 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <CartPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/mypage/profile", // 내 정보 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <ProfilePage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/mypage/history", // 구매 내역 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <HistoryPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/mypage/posts", // 내가 쓴 글 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <PostsPage />
//       </Suspense>
//     ),
//   },
//   // Food Pages 관련 경로 추가
//   {
//     path: "/page/koreanfood", // 한식 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <KoreanFoodPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/page/japanesefood", // 일식 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <JapaneseFoodPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/page/chinesefood", // 중식 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <ChineseFoodPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/page/westernfood", // 양식 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <WesternFoodPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/page/etcfood", // 기타 음식 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <EtcFoodPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: '/mealkitpage/:mid', // 밀키트 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <MealKitPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: '/mealkitpage/:mid/customize', // 밀키트 제품 선택 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <CustomizeProductPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: '/search',
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <SearchResultPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/support", // 고객센터 페이지
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <CustomerSupportPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/write", // 문의글 작성 페이지 경로
//     element: (
//       <Suspense fallback={Loading}>
//         <NavigationMenu />
//         <WriteInquiry />
//       </Suspense>
//     ),
//   },
// ]);

// export default root;

import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import userRouter from "./userRouter";
import foodRouter from "./foodRouter";
import WriteInquiry from "../pages/customerSupport/WriteInquiry";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import communityRouter from "./communityRouter"; // communityRouter 임포트
import qnaRouter from "./qnaRouter";


// Lazy-load 컴포넌트 정의
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"));
const ProductsRouter = lazy(() => import("../pages/products/IndexPage"));
const KoreanFoodPage = lazy(() => import("../pages/foodpages/KoreanFoodPage"));
const JapaneseFoodPage = lazy(() => import("../pages/foodpages/JapaneseFoodPage"));
const ChineseFoodPage = lazy(() => import("../pages/foodpages/ChineseFoodPage"));
const WesternFoodPage = lazy(() => import("../pages/foodpages/WesternFoodPage"));
const EtcFoodPage = lazy(() => import("../pages/foodpages/EtcFoodPage"));
const MealKitPage = lazy(() => import("../pages/foodpages/MealKitPage"));
const CustomizeProductPage = lazy(() => import("../pages/foodpages/CustomizeProductPage"));
const SearchResultPage = lazy(() => import("../pages/foodpages/SearchResultPage"));
const MyPageMain = lazy(() => import("../components/mypage/MyPageMain"));
const CartPage = lazy(() => import("../components/mypage/CartPage"));
const ProfilePage = lazy(() => import("../components/mypage/ProfilePage"));
const HistoryPage = lazy(() => import("../components/mypage/HistoryPage"));
const PostsPage = lazy(() => import("../components/mypage/PostsPage"));
const CustomerSupportPage = lazy(() => import("../pages/customerSupport/CustomerSupportPage"));
const NavigationMenu = lazy(() => import("../components/menus/NavigationMenu"));
const PaymentPage = lazy(() => import("../components/payment/PaymentPage"));
const PaymentHistoryPage = lazy(() => import("../components/mypage/PaymentHistoryPage"));
const AdminPage = lazy(() => import("../pages/user/AdminPage")); // AdminPage 추가
const MealkitRegisterPage = lazy(() => import("../pages/foodpages/MealkitRegisterPage"));
const ModifyPage = lazy(() => import('../pages/user/ModifyPage')); // 회원정보 수정 페이지 추가
const PasswordConfirmPage = lazy(() =>
  import('../pages/user/PasswordConfirmPage')
); // 비밀번호 확인 페이지 추가
const Loading = <div>Loading...</div>;

/**
 * NavigationMenu를 포함하는 컴포넌트 래퍼
 */
const withNavigation = (Component) => (
  <Suspense fallback={Loading}>
    <NavigationMenu />
    <Component />
  </Suspense>
);

/**
 * 보호된 경로 (비밀번호 확인 필요)
 */
const PasswordProtectedRoute = ({ children }) => {
  const isPasswordConfirmed =
    localStorage.getItem("passwordConfirmed") === "true";
  return isPasswordConfirmed ? (
    children
  ) : (
    <Navigate to="/mypage/password-confirm" />
  );
};

/**
 * 관리자 전용 경로 보호 컴포넌트
 */
const AdminProtectedRoute = ({ children }) => {
  const user = useAuth();
  console.log("AdminProtectedRoute user:", user); // 디버깅 로그
  // roleNames가 "ADMIN"인 경우에만 접근 허용
  if (!user || user.roleNames !== "ADMIN") {
    alert("관리자 권한이 필요합니다."); // 권한 없는 사용자에게 알림
    return <Navigate to="/" />; // 권한 없으면 메인 페이지로 리다이렉트
  }

  return children; // 권한이 있으면 자식 컴포넌트를 렌더링
};

/**
 * 루트 라우터 설정
 */
const root = createBrowserRouter([
  { path: "/", element: withNavigation(Main) },
  { path: "/about", element: withNavigation(About) },
  {
    path: "/products",
    element: withNavigation(ProductsRouter),
    children: productsRouter(),
  },
  { path: "/user", children: userRouter() },
  { path: "/page", children: foodRouter() },

  // 마이페이지 관련 경로
  { path: "/mypage", element: withNavigation(MyPageMain) },
  { path: "/mypage/cart", element: withNavigation(CartPage) }, // 장바구니 페이지
  { path: "/mypage/profile", element: withNavigation(ProfilePage) },
  { path: "/mypage/history", element: withNavigation(HistoryPage) },
  { path: "/mypage/posts", element: withNavigation(PostsPage) },
  { path: '/mypage/password-confirm', element: withNavigation(PasswordConfirmPage) }, // 비밀번호 확인 페이지 추가
  { path: '/mypage/modify', element: (
      <PasswordProtectedRoute>
        {withNavigation(ModifyPage)}
      </PasswordProtectedRoute>
    ),
  },

  // Food Pages 관련 경로
  { path: "/page/koreanfood", element: withNavigation(KoreanFoodPage) },
  { path: "/page/japanesefood", element: withNavigation(JapaneseFoodPage) },
  { path: "/page/chinesefood", element: withNavigation(ChineseFoodPage) },
  { path: "/page/westernfood", element: withNavigation(WesternFoodPage) },
  { path: "/page/etcfood", element: withNavigation(EtcFoodPage) },
  // { path: "/page/register", element: withNavigation(MealkitRegisterPage) },
  {
    path: "/page/register",
    element: (
      <AdminProtectedRoute>
        {withNavigation(MealkitRegisterPage)}
      </AdminProtectedRoute>
    ),
  },
  
  // 밀키트 관련 경로
  { path: "/mealkitpage/:mid", element: withNavigation(MealKitPage) },
  {
    path: "/mealkitpage/:mid/customize",
    element: withNavigation(CustomizeProductPage),
  }, // 밀키트 커스터마이즈 페이지

  // 검색 결과 페이지
  { path: "/search", element: withNavigation(SearchResultPage) },

  // 고객센터 관련 경로
  // { path: "/support", element: withNavigation(CustomerSupportPage) },
  { path: "/write", element: withNavigation(WriteInquiry) },

  // QnA 관련 경로 추가
  { path: "/qna", children: qnaRouter() },

  // 결제 관련 경로
  { path: "/payment", element: withNavigation(PaymentPage) }, // 결제 페이지
  { path: "/mypage/payment/history", element: withNavigation(PaymentHistoryPage) }, // 결제 내역 페이지

  // 관리자 전용 경로
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        {withNavigation(AdminPage)}
      </AdminProtectedRoute>
    ),
  },

    // 커뮤니티 경로 추가 (communityRouter 배열을 병합)
    ...communityRouter, // communityRouter의 경로를 여기에 병합,

]);

export default root;
