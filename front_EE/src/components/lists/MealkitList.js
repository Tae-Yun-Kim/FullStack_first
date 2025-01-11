// import React, { useEffect, useState } from "react";
// import { getAllMealkits } from "../../api/mealkitApi";

// const MealkitList = () => {
//   const [mealkits, setMealkits] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMealkits = async () => {
//       try {
//         const data = await getAllMealkits();
//         setMealkits(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchMealkits();
//   }, []);

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <h1>Mealkits</h1>
//       <ul>
//         {mealkits.map((mealkit) => (
//           <li key={mealkit.mid}>
//             <h2>{mealkit.mname}</h2>
//             <p>Price: {mealkit.mprice}</p>
//             <p>Recipe: {mealkit.recipe}</p>
//             <p>Category: {mealkit.category}</p>
//             <ul>
//               {mealkit.products.map((product) => (
//                 <li key={product.pid}>
//                   {product.pname} - {product.quantity}
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MealkitList;
