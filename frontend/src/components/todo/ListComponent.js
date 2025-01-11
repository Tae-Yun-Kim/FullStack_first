// import { useEffect, useState } from "react"; // React 훅: 상태 관리와 사이드 이펙트 처리
// import { getList } from "../../api/todoApi"; // API 요청 함수: 목록 데이터를 가져옴
// import useCustomMove from "../../hooks/useCustomMove"; // 커스텀 훅: 페이지 이동 관련 로직
// import PageComponent from "../common/PageComponent"; // 페이지 네이션을 위한 공용 컴포넌트
// import useCustomLogin from "../../hooks/useCustomAuth"; // 커스텀 훅: 로그인 및 예외 처리 로직

// // 초기 상태 정의: 서버에서 받은 데이터를 저장할 기본 구조
// const initState = {
//   dtoList: [], // 할 일 목록
//   pageNumList: [], // 페이지 번호 리스트
//   pageRequestDTO: null, // 현재 페이지 요청 정보
//   prev: false, // 이전 페이지 존재 여부
//   next: false, // 다음 페이지 존재 여부
//   totalCount: 0, // 총 데이터 개수
//   prevPage: 0, // 이전 페이지 번호
//   nextPage: 0, // 다음 페이지 번호
//   totalPage: 0, // 총 페이지 수
//   current: 0, // 현재 페이지 번호
// };

// // 목록 컴포넌트 정의
// const ListComponent = () => {
//   // useCustomMove 훅에서 제공하는 페이지 이동과 관련된 함수와 변수
//   const { page, size, moveToList, refresh, moveToRead } = useCustomMove();

//   // useCustomLogin 훅에서 제공하는 예외 처리 함수
//   const { exceptionHandle } = useCustomLogin();

//   // 서버에서 받아온 데이터를 저장할 상태
//   const [serverData, setServerData] = useState(initState);

//   // 컴포넌트가 렌더링되거나 `page`, `size`, `refresh` 값이 변경될 때 데이터를 가져옴
//   useEffect(() => {
//     // 서버에서 데이터를 가져오는 API 호출
//     getList({ page, size })
//       .then((data) => {
//         console.log(data); // 가져온 데이터를 콘솔에 출력
//         setServerData(data); // 상태에 데이터를 저장
//       })
//       .catch((err) => exceptionHandle(err)); // 에러가 발생하면 예외 처리
//   }, [page, size, refresh]); // 의존성 배열: 해당 값들이 변경될 때 useEffect 실행

//   return (
//     <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
//       {/* 할 일 목록을 표시하는 영역 */}
//       <div className="flex flex-wrap mx-auto justify-center p-6">
//         {serverData.dtoList.map((todo) => (
//           <div
//             key={todo.tno} // 각 항목의 고유 키
//             className="w-full min-w-[400px] p-2 m-2 rounded shadow-md" // 스타일링 클래스
//             onClick={() => moveToRead(todo.tno)} // 항목 클릭 시 해당 할 일 읽기 페이지로 이동
//           >
//             <div className="flex">
//               <div className="font-extrabold text-2xl p-2 w-1/12">
//                 {todo.tno} {/* 할 일 번호 */}
//               </div>
//               <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
//                 {todo.title} {/* 할 일 제목 */}
//               </div>
//               <div className="text-1xl m-1 p-2 w-2/10 font-medium">
//                 {todo.dueDate} {/* 할 일 마감일 */}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* 페이지 네이션 컴포넌트 */}
//       <PageComponent
//         serverData={serverData} // 서버 데이터를 전달
//         movePage={moveToList} // 페이지 이동 함수 전달
//       ></PageComponent>
//     </div>
//   );
// };

// export default ListComponent; // 컴포넌트를 외부에서 사용할 수 있도록 내보냄
