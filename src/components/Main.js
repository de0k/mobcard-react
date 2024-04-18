import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faHandHolding } from '@fortawesome/free-solid-svg-icons';
import logourl from "../logo1.png";
import Modal from 'react-modal';
import api from '../api'; // api 인스턴스 불러오기

function Main() {
    const { appName } = useAppContext();
    const { isLoggedIn, userEmail, logout } = useAppContext();
    const navigate = useNavigate();
    const [pw, setPw] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handleLogout = () => {
        logout(); // 로그아웃 처리
        navigate('/'); // 메인 페이지로 이동
    };

    const handlePasswordChange = (e) => {
        setPw(e.target.value);
    };

    const handleDeleteAccount = () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            alert("사용자 정보를 찾을 수 없습니다.");
            return;
        }

        api.post('/delete_account', { email: userEmail, pw })
            .then(response => {
                logout();
                setModalOpen(false);
                alert("계정이 삭제되었습니다.");
                navigate("/");
            })
            .catch(error => {
                alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
            });
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='HYUN login_frame'>

            <section className='box1'>
                <div className='topBox'>
                    <div className='iconBox'>
                        <FontAwesomeIcon className='icon icon1' icon={faAddressCard} />
                        <FontAwesomeIcon className='icon icon2' icon={faHandHolding} />
                    </div>
                    <p class="top_text">모바일 명함이 필요할 땐?</p>
                </div>
                <figure className='logo'><img src={logourl} alt='logo' /></figure>
                <>
                    {isLoggedIn ? (// 로그인
                        <>
                            <p className='login_text'>
                                <b>{userEmail}</b> 님, <br />
                                <span>{appName}에 방문해주신 것을 진심으로 환영합니다!</span>
                            </p>
                            <div className='btn_v2'>
                                <button className='link' onClick={handleLogout}>로그아웃</button>
                                <button className='link' onClick={handleOpenModal}>회원 탈퇴</button>
                            </div>
                            <Modal
                                isOpen={modalOpen}
                                onRequestClose={handleCloseModal}
                                contentLabel="비밀번호 확인"
                            >
                                <section className="signout_content">
                                    <div className='box1'>
                                        <h2>정말로 탈퇴하시겠습니까?</h2>
                                        <p>탈퇴된 계정은 다시 복구 할 수 없습니다.</p>
                                        <input type="password" value={pw} onChange={handlePasswordChange} placeholder="비밀번호를 입력하세요." />
                                    </div>
                                    <div className='btn_box'>
                                        <button className='outBtn' onClick={handleDeleteAccount}>회원 탈퇴</button>
                                        <button className='cancelBtn' onClick={handleCloseModal}>취소</button>
                                    </div>
                                </section>
                            </Modal>
                        </>
                    ) : ( // 비로그인
                        <>
                            <p className='title_text'>
                                <b>{appName}</b>으로 실시간 정보를 업데이트 하여 <br />
                                사람들에게 전달해주세요.
                            </p>
                            <div className='btn_v1'>
                                <Link to="/login" className="link auth-link">로그인</Link>
                                <Link to="/signup" className="link auth-link">회원가입</Link>
                            </div>
                        </>
                    )}
                </>

            </section>
        </div>
    );
}

export default Main;
