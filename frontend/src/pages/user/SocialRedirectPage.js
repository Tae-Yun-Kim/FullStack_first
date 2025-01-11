//socialRedirectPage

import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { socialLoginAsync } from '../../slices/authSlice';
import { getAccessToken, getMemberWithAccessToken } from '../../api/socialAuthApi';

const SocialRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const platform = searchParams.get('state'); // URL에서 state 값 가져오기
  const authCode = searchParams.get('code'); // URL에서 code 값 가져오기

  useEffect(() => {
    const handleSocialLogin = async () => {
      if (!platform || !authCode) {
        console.error('Missing platform or authorization code.');
        alert('로그인에 필요한 정보가 없습니다.');
        navigate('/user/login');
        return;
      }

      try {
        console.log(`[${platform}] Requesting Access Token with authCode: ${authCode}`);
        const accessToken = await getAccessToken(platform, authCode);
        console.log(`[${platform}] Access Token:`, accessToken);

        const memberInfo = await getMemberWithAccessToken(platform, accessToken);
        console.log(`[${platform}] Member Info:`, memberInfo);

        // Redux 및 LocalStorage에 상태 저장
        await dispatch(socialLoginAsync({ token: accessToken, user: memberInfo })).unwrap();
        localStorage.setItem('token', accessToken);
        localStorage.setItem('member', JSON.stringify({ token: accessToken, ...memberInfo }));

        // 성공 후 홈으로 이동
        navigate('/');
      } catch (error) {
        console.error(`Error during ${platform} login process:`, error);
        alert('소셜 로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        navigate('/user/login');
      }
    };

    handleSocialLogin();
  }, [platform, authCode, navigate, dispatch]);

  return (
    <div className="text-center mt-10">
      <h1>로그인 처리 중...</h1>
    </div>
  );
};

export default SocialRedirectPage;
