// src/pages/community/IndexPage.jsx

import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";


const IndexPage_c = () => {
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate({ pathname: "list" });
  }, [navigate]);

  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "add" });
  }, [navigate]);

  return (
    <BasicLayout>
      <div className="w-full flex p-2">
        <div
          onClick={handleClickList}
           className="text-xl m-1 p-2 w-20 font-bold text-center cursor-pointer hover:text-luxury-darkerOlive"

        >
          리스트
        </div>
        <div
          className="text-xl m-1 p-2 w-20 font-bold text-center cursor-pointer hover:text-luxury-darkerOlive"
          onClick={handleClickAdd}
        >
          글추가
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        <Outlet />
      </div>
    </BasicLayout>
  );
};

export default IndexPage_c;