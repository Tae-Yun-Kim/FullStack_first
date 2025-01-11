import useCustomLogin from "../hooks/useCustomAuth";
import BasicLayout from "../layouts/BasicLayout";
const AboutPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    return moveToLoginReturn();
  }
  return (
    <BasicLayout>
      <div className="text-3xl">About Page</div>
    </BasicLayout>
  );
};

export default AboutPage;
