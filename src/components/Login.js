import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logourl from "../logo1.png";
import { useAppContext } from '../AppContext';
import api from '../api'; // api 인스턴스 불러오기

function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleLogin = () => {
    // 이메일 형식 검사
    if (!validateEmail(email)) {
      alert("유효한 이메일 형식으로 작성해주세요.");
      return;
    }

    // 로그인 요청 전송
    api.post('/login', { email, pw })
      .then(response => {
        alert('로그인 성공!');
        
        login(email); 
        navigate('/'); // 로그인 성공 시 이동할 경로 지정
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        } else {
          alert('로그인 실패: ' + error.message);
        }
      });
  };

  return (
    <div className="HYUN auth-form">
      <div className='top_text_v1'>
        <p>로그인</p>
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
        <div className='btn_wrap'>
          <button className='login_btn' onClick={handleLogin}>로그인</button>
        </div>
        
      </section>
    </div>
  );
}

export default Login;
