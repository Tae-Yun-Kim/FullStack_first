// // React의 useEffect, useState 훅을 가져옵니다.
// import { useEffect, useState } from "react";

// // API 호출 함수들을 가져옵니다. (할 일 조회, 수정, 삭제)
// import { deleteOne, getOne, putOne } from "../../api/todoApi";

// // 페이지 이동을 위한 커스텀 훅을 가져옵니다.
// import useCustomMove from "../../hooks/useCustomMove";

// // 결과를 보여줄 모달 컴포넌트를 가져옵니다.
// import ResultModal from "../common/ResultModal";

// // 초기 상태를 정의합니다. 각 필드는 기본값으로 초기화됩니다.
// const initState = {
//   tno: 0, // 할 일 번호
//   title: "", // 제목
//   writer: "", // 작성자
//   dueDate: "", // 마감일
//   complete: false, // 완료 여부
// };

// // ModifyComponent 컴포넌트를 정의합니다.
// const ModifyComponent = ({ tno }) => {
//   // 할 일 데이터를 관리하기 위한 상태 (초기값은 initState).
//   const [todo, setTodo] = useState({ ...initState });

//   // 모달 창에 표시할 결과를 관리하는 상태 (기본값은 null).
//   const [result, setResult] = useState(null);

//   // 페이지 이동을 위한 함수들.
//   const { moveToList, moveToRead } = useCustomMove();

//   // 컴포넌트가 렌더링될 때 또는 tno가 변경될 때 실행.
//   // 서버에서 tno에 해당하는 할 일 데이터를 가져옵니다.
//   useEffect(() => {
//     getOne(tno).then((data) => setTodo(data)); // 가져온 데이터를 todo 상태에 저장.
//   }, [tno]); // tno가 변경될 때마다 실행.

//   // 수정 버튼 클릭 시 호출되는 함수.
//   const handleClickModify = () => {
//     // 현재 todo 데이터를 서버에 수정 요청.
//     putOne(todo).then((data) => {
//       console.log("modify result: " + data); // 수정 결과를 콘솔에 출력.
//       setResult("Modified"); // 결과 상태를 'Modified'로 설정하여 모달 창에 표시.
//     });
//   };

//   // 삭제 버튼 클릭 시 호출되는 함수.
//   const handleClickDelete = () => {
//     // 현재 tno를 서버에 삭제 요청.
//     deleteOne(tno).then((data) => {
//       console.log("delete result: " + data); // 삭제 결과를 콘솔에 출력.
//       setResult("Deleted"); // 결과 상태를 'Deleted'로 설정하여 모달 창에 표시.
//     });
//   };

//   // 입력 필드 값이 변경될 때 호출되는 함수.
//   const handleChangeTodo = (e) => {
//     todo[e.target.name] = e.target.value; // 입력 필드의 name 속성으로 상태 업데이트.
//     setTodo({ ...todo }); // React 상태의 불변성을 유지하면서 업데이트.
//   };

//   // 완료 여부 select 값이 변경될 때 호출되는 함수.
//   const handleChangeTodoComplete = (e) => {
//     const value = e.target.value; // 선택된 값을 가져옵니다.
//     todo.complete = value === "Y"; // 값이 "Y"이면 완료로 설정, 아니면 미완료로 설정.
//     setTodo({ ...todo }); // 상태를 업데이트.
//   };

//   // 모달 창이 닫힐 때 호출되는 함수.
//   const closeModal = () => {
//     if (result === "Deleted") {
//       moveToList(); // 삭제된 경우 리스트 페이지로 이동.
//     } else {
//       moveToRead(tno); // 수정된 경우 읽기 페이지로 이동.
//     }
//   };

//   // 컴포넌트의 UI를 렌더링합니다.
//   return (
//     <div className="border-2 border-sky-200 mt-10 m-2 p-4">
//       {/* 모달 처리: 결과 상태가 있을 경우 모달을 렌더링. */}
//       {result ? (
//         <ResultModal
//           title={"처리결과"} // 모달 제목
//           content={result} // 모달 내용 (Modified 또는 Deleted)
//           callbackFn={closeModal} // 모달 닫기 시 호출되는 함수
//         />
//       ) : (
//         <></> // 결과가 없을 경우 아무것도 렌더링하지 않음.
//       )}

//       {/* 할 일 번호 (읽기 전용) */}
//       <div className="flex justify-center mt-10">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">TNO</div>
//           <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
//             {todo.tno}
//           </div>
//         </div>
//       </div>

//       {/* 작성자 (읽기 전용) */}
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
//           <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
//             {todo.writer}
//           </div>
//         </div>
//       </div>

//       {/* 제목 입력 필드 */}
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
//           <input
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//             name="title" // 제목 필드 이름
//             type={"text"} // 텍스트 입력 필드
//             value={todo.title} // 상태에서 제목 값을 가져옴.
//             onChange={handleChangeTodo} // 값 변경 시 호출되는 함수.
//           ></input>
//         </div>
//       </div>

//       {/* 마감일 입력 필드 */}
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
//           <input
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//             name="dueDate" // 마감일 필드 이름
//             type={"date"} // 날짜 입력 필드
//             value={todo.dueDate} // 상태에서 마감일 값을 가져옴.
//             onChange={handleChangeTodo} // 값 변경 시 호출되는 함수.
//           ></input>
//         </div>
//       </div>

//       {/* 완료 여부 선택 필드 */}
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
//           <select
//             name="status" // 완료 여부 필드 이름
//             className="border-solid border-2 rounded m-1 p-2"
//             onChange={handleChangeTodoComplete} // 값 변경 시 호출되는 함수.
//             value={todo.complete ? "Y" : "N"} // 완료 여부에 따라 선택된 값 설정.
//           >
//             <option value="Y">Completed</option>
//             <option value="N">Not Yet</option>
//           </select>
//         </div>
//       </div>

//       {/* 삭제 및 수정 버튼 */}
//       <div className="flex justify-end p-4">
//         {/* 삭제 버튼 */}
//         <button
//           type="button"
//           className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
//           onClick={handleClickDelete} // 클릭 시 삭제 함수 호출.
//         >
//           Delete
//         </button>
//         {/* 수정 버튼 */}
//         <button
//           type="button"
//           className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
//           onClick={handleClickModify} // 클릭 시 수정 함수 호출.
//         >
//           Modify
//         </button>
//       </div>
//     </div>
//   );
// };

// // 컴포넌트를 내보냅니다.
// export default ModifyComponent;
