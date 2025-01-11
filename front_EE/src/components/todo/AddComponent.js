// // React의 useState 훅을 가져옵니다.
// import { useState } from "react";

// // todo 추가 요청을 서버로 보내기 위한 API 호출 함수 가져오기.
// import { postAdd } from "../../api/todoApi";

// // 결과를 보여줄 모달 컴포넌트를 가져옵니다.
// import ResultModal from "../common/ResultModal";

// // 커스텀 훅을 통해 페이지 이동 기능을 가져옵니다.
// import useCustomMove from "../../hooks/useCustomMove";

// // 초기 상태를 정의합니다. 각 필드는 빈 값으로 시작합니다.
// const initState = {
//   title: "", // 할 일의 제목
//   writer: "", // 작성자
//   dueDate: "", // 마감 날짜
// };

// // AddComponent 컴포넌트를 정의합니다.
// const AddComponent = () => {
//   // todo 상태를 정의하고 초기값은 initState로 설정합니다.
//   const [todo, setTodo] = useState({ ...initState });

//   // 결과를 저장하는 상태를 정의합니다. 기본값은 null.
//   const [result, setResult] = useState(null);

//   // 커스텀 훅을 사용하여 리스트 페이지로 이동하는 함수 가져오기.
//   const { moveToList } = useCustomMove();

//   // 입력값 변경 시 상태를 업데이트하는 함수입니다.
//   const handleChangeTodo = (e) => {
//     // 입력값을 상태에 반영합니다.
//     todo[e.target.name] = e.target.value;

//     // React 상태의 불변성을 유지하기 위해 복사 후 상태를 업데이트합니다.
//     setTodo({ ...todo });
//   };

//   // "ADD" 버튼 클릭 시 호출되는 함수입니다.
//   const handleClickAdd = () => {
//     // 서버에 todo 데이터를 추가합니다.
//     postAdd(todo)
//       .then((result) => {
//         // 서버 응답 결과(TNO)를 상태에 저장.
//         console.log(result);
//         setResult(result.TNO); // 결과를 모달에 표시하기 위해 저장.

//         // 리스트 페이지로 이동.
//         moveToList();

//         // 입력 필드 초기화.
//         setTodo({ ...initState });
//       })
//       .catch((e) => {
//         // 오류 발생 시 콘솔에 에러 메시지 출력.
//         console.error(e);
//       });
//   };

//   // 모달 닫기 함수
//   const closeModal = () => {
//     // 결과 상태를 초기화하여 모달을 닫습니다.
//     setResult(null);
//   };

//   // 컴포넌트의 UI를 렌더링합니다.
//   return (
//     <div className="border-2 border-sky-200 mt-10 m-2 p-4">
//       {/* 모달 처리 */}
//       {result ? (
//         <ResultModal
//           title={"Add Result"} // 모달 제목
//           content={`New ${result} Added`} // 모달 내용
//           callbackFn={closeModal} // 모달 닫기 시 호출되는 함수
//         />
//       ) : (
//         <></> // 결과가 없으면 아무것도 렌더링하지 않습니다.
//       )}

//       {/* 제목 입력 필드 */}
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           {/* 제목 라벨 */}
//           <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
//           {/* 제목 입력창 */}
//           <input
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
//             name="title" // 입력값을 상태에 반영하기 위해 name 속성을 "title"로 설정
//             type={"text"} // 텍스트 입력 필드
//             value={todo.title} // 상태에서 title 값을 가져옴
//             onChange={handleChangeTodo} // 입력값 변경 시 호출되는 핸들러 함수
//           ></input>
//         </div>
//       </div>

//       {/* 작성자 입력 필드 */}
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           {/* 작성자 라벨 */}
//           <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
//           {/* 작성자 입력창 */}
//           <input
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
//             name="writer" // 입력값을 상태에 반영하기 위해 name 속성을 "writer"로 설정
//             type={"text"} // 텍스트 입력 필드
//             value={todo.writer} // 상태에서 writer 값을 가져옴
//             onChange={handleChangeTodo} // 입력값 변경 시 호출되는 핸들러 함수
//           ></input>
//         </div>
//       </div>

//       {/* 마감일 입력 필드 */}
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           {/* 마감일 라벨 */}
//           <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
//           {/* 마감일 입력창 */}
//           <input
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
//             name="dueDate" // 입력값을 상태에 반영하기 위해 name 속성을 "dueDate"로 설정
//             type={"date"} // 날짜 입력 필드
//             value={todo.dueDate} // 상태에서 dueDate 값을 가져옴
//             onChange={handleChangeTodo} // 입력값 변경 시 호출되는 핸들러 함수
//           ></input>
//         </div>
//       </div>

//       {/* "ADD" 버튼 */}
//       <div className="flex justify-end">
//         <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
//           {/* 버튼 클릭 시 handleClickAdd 함수 호출 */}
//           <button
//             type="button"
//             className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
//             onClick={handleClickAdd}
//           >
//             ADD {/* 버튼 텍스트 */}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // AddComponent 컴포넌트를 내보냅니다.
// export default AddComponent;
