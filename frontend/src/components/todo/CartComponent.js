// import React from "react";

// const CartComponent = ({ item, onRemove, onAdd }) => {
//   return (
//     <div className="flex justify-between items-center p-4 border-b">
//       <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
//       <div>
//         <p className="font-semibold">{item.name}</p>
//         <p>{item.price} 원</p>
//         <p>수량: {item.quantity}</p>
//       </div>
//       <div>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded-md"
//           onClick={() => onRemove(item.id)}
//         >
//           삭제
//         </button>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
//           onClick={() => onAdd(item)}
//         >
//           추가
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartComponent;
