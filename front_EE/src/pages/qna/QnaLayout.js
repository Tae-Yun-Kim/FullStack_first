import React from 'react';
import SidebarPage from './SidebarPage'; // 사이드바 컴포넌트
import NavigationMenu from '../../components/menus/NavigationMenu';

const QnaLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 네비게이션 메뉴 */}
      <NavigationMenu />

      <div className="flex flex-1 max-w-screen-xl mx-auto w-full py-6 px-4">
        {/* 사이드바 */}
        <div className="w-1/5 pr-4"> {/* 사이드바를 20%로 설정 */}
          <SidebarPage />
        </div>

        {/* 메인 콘텐츠 */}
  <div className="w-3/4 bg-white shadow p-6 rounded-lg"> {/* 메인 콘텐츠를 75%로 설정 */}
    {children}
  </div>
</div>
    </div>
  );
};

export default QnaLayout; 