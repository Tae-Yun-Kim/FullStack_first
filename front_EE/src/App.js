import { RouterProvider } from "react-router-dom";
import "./App.css";
import root from "./router/root";

function App() {
  return (
    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 10;
          }

          #root {
            padding-top: 200px; /* 네비게이션바 높이(100px) + 추가 여백 두 배 */
          }
        `}
      </style>
      <RouterProvider router={root} />
    </>
  );
}

export default App;
