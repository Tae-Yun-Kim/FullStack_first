
import NavigationMenu from "../components/menus/NavigationMenu";

const BasicLayout = ({ children }) => {
  return (
    <>
      {/* 기존 헤더 대신 NavigationMenu*/}
      <NavigationMenu />

      {/* 상단 여백 my-5 제거 */}
      <div className="bg-white w-full flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
        <main className="mx-auto md:w-2/3 lg:w-3.5/5 px-5 py-5 rounded-lg">
          {" "}
          {/* 상단 여백 py-40 변경 flex 제거 */}
          {children}
        </main>

      </div>
    </>
  );
};

export default BasicLayout;
