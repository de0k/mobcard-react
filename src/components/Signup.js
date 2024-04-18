import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logourl from "../logo1.png";
import { useAppContext } from '../AppContext';
import api from '../api'; // api 인스턴스 불러오기

function Signup() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleSignup = () => {
    // 이메일 형식 검사
    if (!validateEmail(email)) {
      alert("유효한 이메일 형식으로 작성해주세요.");
      return;
    }

    // 비밀번호 일치 여부 검사
    if (pw !== confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 모든 필드가 채워졌는지 검사
    if (!email || !pw || !confirmPw) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    // 회원가입 요청 전송
    api.post('/signup', { email, pw })
      .then(response => {
        alert('회원가입 성공!');
        login(email); 
        navigate('/');
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          alert('이미 존재하는 이메일입니다. 다시 입력해주세요.');
        } else {
          alert('회원가입 실패: ' + error.message);
        }
      });
  };

  return (
    <div className="HYUN auth-form">
      <div className='top_text_v1'>
        <p>회원가입</p>
      </div>
      <section className='box1'>
        <figure className='logo'><img src={logourl} alt='logo' /></figure>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="비밀번호 ( 6자리 이상 15자리 이하 )"
        />
        <input
          type="password"
          value={confirmPw}
          onChange={e => setConfirmPw(e.target.value)}
          placeholder="비밀번호 재입력"
        />
        <div className='btn_wrap'>
          <button className='login_btn' onClick={handleSignup}>신규 회원가입</button>
        </div>
      </section>
    </div>
  );
}

export default Signup;
