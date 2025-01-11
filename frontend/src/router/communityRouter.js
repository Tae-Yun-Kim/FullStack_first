import { createBrowserRouter } from "react-router-dom";
import IndexPage_c from "../pages/community/IndexPage_c";
import CommunityList from "../pages/community/ListPage_c";
import CommunityAdd from "../pages/community/AddPage_c";
import CommunityRead from "../pages/community/ReadPage_c";
import CommunityModify from "../pages/community/ModifyPage_c";

// communityRouter 설정
const communityRouter = [
  {
    path: "/community",
    element: <IndexPage_c />,
    children: [
      { path: "list", element: <CommunityList /> },
      { path: "add", element: <CommunityAdd /> },
      { path: "read/:tno", element: <CommunityRead /> },
      { path: "modify/:tno", element: <CommunityModify /> },
    ],
  },
];

export default communityRouter;
