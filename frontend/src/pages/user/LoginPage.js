import NavigationMenu from "../../components/menus/NavigationMenu";
import UserLoginComponent from "../../components/user/UserLoginComponent"; // 로그인 컴포넌트 가져오기

const LoginPage = () => {
  return (
    <div className="min-h-screen ">
      {/* 내비게이션 메뉴 */}
      <NavigationMenu />

      {/* 메인 로그인 섹션 */}
      <div className="flex flex-col items-center justify-start pt-20 px-4">
        {/* 로그인 컴포넌트 렌더링 */}
        <div className="w-full max-w-lg">
          <UserLoginComponent />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
