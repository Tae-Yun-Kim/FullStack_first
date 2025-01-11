import UserLogoutComponent from "../../components/user/UserLogoutComponent";
import NavigationMenu from "../../components/menus/NavigationMenu";

const LogoutPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <NavigationMenu />

      <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
      <UserLogoutComponent />
      </div>
    </div>
  );
};

export default LogoutPage;
