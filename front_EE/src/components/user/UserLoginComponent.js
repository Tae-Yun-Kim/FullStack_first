import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginPostAsync } from '../../slices/authSlice';
import ResultModal from '../common/ResultModal';
import { getSocialLoginLink } from '../../api/socialAuthApi'; // API 분리 적용

const initState = {
  email: '',
  password: '',
};

const UserLoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 입력란 변경 핸들러
  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  // 로그인 요청 핸들러
  const handleClickLogin = () => {
    dispatch(loginPostAsync(loginParam))
      .unwrap()
      .then((response) => {
        console.log('로그인 성공 응답:', response);

        // 토큰 확인 후 저장 및 페이지 이동
        if (response?.token) {
          console.log('토큰 저장:', response.token);
          localStorage.setItem('token', response.token);
          navigate(location.state?.from || '/');
        } else {
          console.warn('응답에 토큰이 없습니다.');
          setModalMessage('올바르지 않은 사용자 정보입니다.');
        }
      })
      .catch((error) => {
        console.error('로그인 실패:', error);
        setModalMessage(
          error.response?.data?.message ||
            '로그인 요청 중 문제가 발생했습니다. 다시 시도해주세요.'
        );
      });
  };

  // Enter 키 처리 핸들러
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!loginParam.password) {
        // 비밀번호가 비어있으면 경고 메시지 표시
        setModalMessage('비밀번호를 입력해주세요.');
      } else {
        // 비밀번호가 입력되었으면 로그인 요청 실행
        handleClickLogin();
      }
    }
  };

  const handleSocialLogin = (platform) => {
    const loginUrl = getSocialLoginLink(platform);
    window.location.href = loginUrl;
  };

  const handleSignupClick = () => {
    navigate('/user/signup', { state: { from: location.pathname } });
  };

  return (
    <>
      {/* 모달 창 */}
      {modalMessage && (
        <ResultModal
          title="알림"
          content={modalMessage}
          callbackFn={() => setModalMessage('')} // 모달 닫기 콜백
        />
      )}

      {/* 제목 */}
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        로그인
      </h1>

      {/* 아이디 입력 */}
      <input
        type="text"
        name="email"
        value={loginParam.email}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
        className="block w-full border border-gray-300 rounded-lg py-3 px-4 mb-4 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        placeholder="아이디를 입력해주세요"
      />

      {/* 비밀번호 입력 */}
      <input
        type="password"
        name="password"
        value={loginParam.password}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
        className="block w-full border border-gray-300 rounded-lg py-3 px-4 mb-6 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        placeholder="비밀번호를 입력해주세요"
      />

      {/* 아이디 찾기 & 비밀번호 찾기 */}
      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <Link to="/user/find-id" className="hover:underline">
          아이디 찾기
        </Link>
        <Link to="/user/password-reset" className="hover:underline">
          비밀번호 찾기
        </Link>
      </div>

      {/* 로그인 버튼 */}
      <button
        onClick={handleClickLogin}
        className="block w-full bg-gray-600 text-white font-bold py-3 rounded-lg hover:bg-gray-700 mb-4"
      >
        로그인
      </button>

      {/* 회원가입 버튼 */}
      <button
        onClick={handleSignupClick}
        className="block w-full border border-gray-600 text-gray-600 font-bold py-3 rounded-lg hover:bg-gray-200 mb-6"
      >
        회원가입
      </button>

      {/* 소셜 로그인 버튼 */}
      <div className="flex justify-center space-x-6">
        <button onClick={() => handleSocialLogin('kakao')}>
          <img
            src="/images/kakaologo.png"
            alt="카카오 로그인"
            className="w-12 h-12 object-contain"
          />
        </button>
        
        <button onClick={() => handleSocialLogin('google')}>
          <img
            src="/images/googlelogo.png"
            alt="구글 로그인"
            className="w-10 h-10 object-contain"
          />
        </button>
      </div>
    </>
  );
};

export default UserLoginComponent;
