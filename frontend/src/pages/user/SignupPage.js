import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupPostAsync } from '../../slices/authSlice';
import NavigationMenu from '../../components/menus/NavigationMenu';
import SignupComponent from '../../components/user/SignupComponent';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    nickname: '',
    phone: '',
    birthDate: '',
    adress: '',
    gender: '',
    agreeTerms: false,
    agreePrivacy: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSignup = async () => {
    try {
      await dispatch(signupPostAsync(signupData)).unwrap();
      alert('회원가입이 완료되었습니다!');
      navigate('/user/login');
    } catch (error) {
      alert('회원가입 실패! 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <NavigationMenu />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <SignupComponent
          step={step}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          handleSignup={handleSignup}
          signupData={signupData}
          setSignupData={setSignupData}
        />
      </div>
    </div>
  );
};

export default SignupPage;
