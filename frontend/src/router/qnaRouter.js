// import { Suspense, lazy } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import SidebarPage from '../pages/qna/SidebarPage'; // 사이드바 추가
// import NavigationMenu from '../components/menus/NavigationMenu'; // 네비게이션 메뉴 추가

// const QnAList = lazy(() => import('../pages/qna/ListPage_q'));
// const QnAAdd = lazy(() => import('../pages/qna/AddPage_q'));
// const QnARead = lazy(() => import('../pages/qna/ReadPage_q'));
// const QnAModify = lazy(() => import('../pages/qna/ModifyPage_q'));
// const OneToOneInquiryPage = lazy(() => import('../pages/qna/OneToOneInquiryPage'));

// const Loading = <div>Loading...</div>;

// // 공통 레이아웃 컴포넌트
// const Layout = () => (
//   <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto p-6">
//     <NavigationMenu /> {/* 네비게이션 메뉴 추가 */}
//     <div className="flex flex-1 block text-lg font-semibold text-gray-700 hover:text-gray-900 border-b pb-2">
//       <SidebarPage /> {/* 사이드바 추가 */}
//       <div className="flex-1 p-4">
//         <Suspense fallback={Loading}>
//           <Outlet /> {/* 자식 라우트 렌더링 */}
//         </Suspense>
//       </div>
//     </div>
//   </div>
// );

// // QnA Router 정의
// const qnaRouter = () => [
//   {
//     path: '',
//     element: (
//       <Suspense fallback={Loading}>
//         <Layout />
//       </Suspense>
//     ),
//     children: [
//       // 기본 경로 -> 리스트 페이지로 리다이렉트
//       {
//         path: '',
//         element: <Navigate replace to="list" />,
//       },
//       // QnA 리스트 페이지
//       {
//         path: 'list',
//         element: <QnAList />,
//       },
//       // QnA 작성 페이지
//       {
//         path: 'add',
//         element: <QnAAdd />,
//       },
//       // QnA 상세 조회 페이지
//       {
//         path: 'read/:qno',
//         element: <QnARead />,
//       },
//       // QnA 수정 페이지
//       {
//         path: 'modify/:qno',
//         element: <QnAModify />,
//       },
//       // 1:1 문의 페이지
//       {
//         path: 'one-to-one',
//         element: <OneToOneInquiryPage />,
//       },
//     ],
//   },
//   // 모든 잘못된 경로 -> 리스트 페이지로 리다이렉트
//   {
//     path: '*',
//     element: <Navigate replace to="/qna/list" />,
//   },
// ];

// export default qnaRouter;


import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import QnaLayout from '../pages/qna/QnaLayout'; // QnaLayout 컴포넌트 가져오기

const QnAList = lazy(() => import('../pages/qna/ListPage_q'));
const QnAAdd = lazy(() => import('../pages/qna/AddPage_q'));
const QnARead = lazy(() => import('../pages/qna/ReadPage_q'));
const QnAModify = lazy(() => import('../pages/qna/ModifyPage_q'));
const OneToOneInquiryPage = lazy(() => import('../pages/qna/OneToOneInquiryPage'));

const Loading = <div>Loading...</div>;

// QnA Router 정의
const qnaRouter = () => [
  {
    path: '',
    element: (
      <Suspense fallback={Loading}>
        <QnaLayout> {/* QnaLayout을 공통 레이아웃으로 설정 */}
          <Outlet /> {/* 자식 라우트를 QnaLayout의 children으로 전달 */}
        </QnaLayout>
      </Suspense>
    ),
    children: [
      // 기본 경로 -> 리스트 페이지로 리다이렉트
      {
        path: '',
        element: <Navigate replace to="list" />,
      },
      // QnA 리스트 페이지
      {
        path: 'list',
        element: <QnAList />,
      },
      // QnA 작성 페이지
      {
        path: 'add',
        element: <QnAAdd />,
      },
      // QnA 상세 조회 페이지
      {
        path: 'read/:qno',
        element: <QnARead />,
      },
      // QnA 수정 페이지
      {
        path: 'modify/:qno',
        element: <QnAModify />,
      },
      // 1:1 문의 페이지
      {
        path: 'one-to-one',
        element: <OneToOneInquiryPage />,
      },
    ],
  },
  // 모든 잘못된 경로 -> 리스트 페이지로 리다이렉트
  {
    path: '*',
    element: <Navigate replace to="/qna/list" />,
  },
];

export default qnaRouter;
